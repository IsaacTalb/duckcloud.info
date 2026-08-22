import { createRemoteJWKSet, jwtVerify, type JWTPayload } from 'jose';

export interface AuthenticatedAdminIdentity {
  email: string;
  source: 'cloudflare-access' | 'development';
}

export type AdminAccessResult =
  | { ok: true; identity: AuthenticatedAdminIdentity }
  | {
      ok: false;
      status: 401 | 403;
      message:
        | 'Administrator access is required.'
        | 'Invalid administrator session.'
        | 'This account does not have administrator access.';
    };

type VerificationCategory =
  | 'MISSING_CONFIG'
  | 'JWKS_FETCH_FAILED'
  | 'ISSUER_MISMATCH'
  | 'AUDIENCE_MISMATCH'
  | 'TOKEN_EXPIRED'
  | 'SIGNATURE_INVALID'
  | 'VERIFICATION_FAILED';

class AccessConfigurationError extends Error {
  override name = 'AccessConfigurationError';
}

const remoteKeySets = new Map<string, ReturnType<typeof createRemoteJWKSet>>();

function normalizeTeamDomain(value: string): string {
  const trimmed = value.trim().replace(/\/+$/, '');
  const normalized = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
  const url = new URL(normalized);

  if (process.env.NODE_ENV !== 'test' && url.protocol !== 'https:') {
    throw new AccessConfigurationError('Cloudflare Access team domain must use HTTPS');
  }
  if (process.env.NODE_ENV === 'production' && !url.hostname.endsWith('.cloudflareaccess.com')) {
    throw new AccessConfigurationError(
      'Cloudflare Access team domain must be a cloudflareaccess.com team domain'
    );
  }
  if (url.pathname !== '/' || url.search || url.hash) {
    throw new AccessConfigurationError(
      'Cloudflare Access team domain must not contain a path, query, or fragment'
    );
  }
  return url.origin;
}

function getRemoteKeySet(teamDomain: string) {
  const certsUrl = `${teamDomain}/cdn-cgi/access/certs`;
  let keySet = remoteKeySets.get(certsUrl);
  if (!keySet) {
    keySet = createRemoteJWKSet(new URL(certsUrl));
    remoteKeySets.set(certsUrl, keySet);
  }
  return keySet;
}

function emailFromPayload(payload: JWTPayload): string | undefined {
  return typeof payload.email === 'string' ? payload.email.trim().toLowerCase() : undefined;
}

function errorDetails(error: unknown): { name: string; message: string; code?: string } {
  const record =
    typeof error === 'object' && error !== null ? (error as Record<string, unknown>) : undefined;
  return {
    name: error instanceof Error ? error.name : 'UnknownError',
    message: error instanceof Error ? error.message : String(error),
    code: record?.code === undefined ? undefined : String(record.code),
  };
}

function verificationCategory(error: unknown): VerificationCategory {
  if (error instanceof AccessConfigurationError) return 'MISSING_CONFIG';
  const details = errorDetails(error);
  const claim =
    typeof error === 'object' && error !== null && 'claim' in error
      ? String((error as { claim?: unknown }).claim ?? '')
      : '';
  if (details.code === 'ERR_JWT_EXPIRED') return 'TOKEN_EXPIRED';
  if (details.code === 'ERR_JWS_SIGNATURE_VERIFICATION_FAILED') return 'SIGNATURE_INVALID';
  if (details.code?.startsWith('ERR_JWKS_') || details.code === 'ERR_JWK_INVALID') {
    return 'JWKS_FETCH_FAILED';
  }
  if (details.name === 'TypeError' && /fetch|network|connect/i.test(details.message)) {
    return 'JWKS_FETCH_FAILED';
  }
  if (details.code === 'ERR_JWT_CLAIM_VALIDATION_FAILED' && claim === 'iss') {
    return 'ISSUER_MISMATCH';
  }
  if (details.code === 'ERR_JWT_CLAIM_VALIDATION_FAILED' && claim === 'aud') {
    return 'AUDIENCE_MISMATCH';
  }
  return 'VERIFICATION_FAILED';
}

function logConfig(category: VerificationCategory) {
  console.error('Cloudflare Access configuration failed', {
    category,
    hasTeamDomain: Boolean(process.env.CLOUDFLARE_ACCESS_TEAM_DOMAIN?.trim()),
    hasAudience: Boolean(process.env.CLOUDFLARE_ACCESS_AUD?.trim()),
    hasAllowedEmail: Boolean(process.env.DUCKCLOUD_ADMIN_ALLOWED_EMAIL?.trim()),
  });
}

/** Authenticate an admin exclusively from a verified Cloudflare Access assertion. */
export async function authenticateAdminAccess(
  headers: Pick<Headers, 'get'>
): Promise<AdminAccessResult> {
  if (process.env.NODE_ENV === 'development') {
    return {
      ok: true,
      identity: {
        email:
          process.env.DUCKCLOUD_ADMIN_ALLOWED_EMAIL?.trim().toLowerCase() ||
          'development@localhost',
        source: 'development',
      },
    };
  }

  const assertion = headers.get('cf-access-jwt-assertion');
  if (!assertion) {
    return { ok: false, status: 401, message: 'Administrator access is required.' };
  }

  const teamDomainValue = process.env.CLOUDFLARE_ACCESS_TEAM_DOMAIN?.trim();
  const audiences = (process.env.CLOUDFLARE_ACCESS_AUD ?? '')
    .split(',')
    .map((value) => value.trim())
    .filter(Boolean);
  const allowedEmail = process.env.DUCKCLOUD_ADMIN_ALLOWED_EMAIL?.trim().toLowerCase();
  if (!teamDomainValue || audiences.length === 0 || !allowedEmail) {
    logConfig('MISSING_CONFIG');
    return { ok: false, status: 403, message: 'Invalid administrator session.' };
  }

  try {
    const issuer = normalizeTeamDomain(teamDomainValue);
    const { payload } = await jwtVerify(assertion, getRemoteKeySet(issuer), {
      issuer,
      audience: audiences,
    });
    const email = emailFromPayload(payload);
    if (!email || email !== allowedEmail) {
      console.error('Cloudflare Access authorization failed', { category: 'EMAIL_MISMATCH' });
      return {
        ok: false,
        status: 403,
        message: 'This account does not have administrator access.',
      };
    }
    return { ok: true, identity: { email, source: 'cloudflare-access' } };
  } catch (error) {
    // Log only error metadata; never log the assertion, payload, email, cookies, or secrets.
    console.error('Cloudflare Access verification failed', {
      category: verificationCategory(error),
      ...errorDetails(error),
    });
    return { ok: false, status: 403, message: 'Invalid administrator session.' };
  }
}
