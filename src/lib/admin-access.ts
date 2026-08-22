import { createRemoteJWKSet, jwtVerify, type JWTPayload } from "jose";

export interface AuthenticatedAdminIdentity {
  email: string;
  source: "cloudflare-access" | "development";
}

export type AdminAccessResult =
  | { ok: true; identity: AuthenticatedAdminIdentity }
  | {
      ok: false;
      status: 401 | 403;
      message:
        | "Administrator access is required."
        | "Invalid administrator session."
        | "This account does not have administrator access.";
    };

const remoteKeySets = new Map<string, ReturnType<typeof createRemoteJWKSet>>();

function normalizeTeamDomain(value: string): string {
  return value.replace(/\/+$/, "");
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
  return typeof payload.email === "string" ? payload.email.trim().toLowerCase() : undefined;
}

/** Authenticate an admin exclusively from a verified Cloudflare Access assertion. */
export async function authenticateAdminAccess(
  headers: Pick<Headers, "get">,
): Promise<AdminAccessResult> {
  if (process.env.NODE_ENV === "development") {
    return {
      ok: true,
      identity: {
        email: process.env.DUCKCLOUD_ADMIN_ALLOWED_EMAIL?.trim().toLowerCase() || "development@localhost",
        source: "development",
      },
    };
  }

  const assertion = headers.get("cf-access-jwt-assertion");
  if (!assertion) {
    return { ok: false, status: 401, message: "Administrator access is required." };
  }

  const teamDomainValue = process.env.CLOUDFLARE_ACCESS_TEAM_DOMAIN;
  const audience = process.env.CLOUDFLARE_ACCESS_AUD;
  const allowedEmail = process.env.DUCKCLOUD_ADMIN_ALLOWED_EMAIL?.trim().toLowerCase();
  if (!teamDomainValue || !audience || !allowedEmail) {
    return { ok: false, status: 403, message: "Invalid administrator session." };
  }

  const issuer = normalizeTeamDomain(teamDomainValue);
  try {
    const { payload } = await jwtVerify(assertion, getRemoteKeySet(issuer), {
      issuer,
      audience,
    });
    const email = emailFromPayload(payload);
    if (!email || email !== allowedEmail) {
      return {
        ok: false,
        status: 403,
        message: "This account does not have administrator access.",
      };
    }
    return { ok: true, identity: { email, source: "cloudflare-access" } };
  } catch {
    // JWT contents and verification details must never be exposed to the caller.
    return { ok: false, status: 403, message: "Invalid administrator session." };
  }
}
