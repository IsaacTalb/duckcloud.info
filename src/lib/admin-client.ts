export type AdminRecord = Record<string, unknown>;
export type AdminData = AdminRecord & {
  results?: AdminRecord[];
  settings?: Record<string, string | number | boolean | null>;
  total?: number;
  page?: number;
  limit?: number;
  recent_articles?: AdminRecord[];
  recent_media?: AdminRecord[];
};

export class AdminApiError extends Error {
  constructor(
    message: string,
    readonly code = 'REQUEST_FAILED',
    readonly status = 0
  ) {
    super(message);
    this.name = 'AdminApiError';
  }
}

export async function adminRequest(path: string, init?: RequestInit): Promise<AdminData> {
  let response: Response;
  try {
    response = await fetch(`/api/admin/${path}`, { cache: 'no-store', ...init });
  } catch {
    throw new AdminApiError('The CMS service could not be reached.', 'CMS_UPSTREAM_UNAVAILABLE');
  }

  const contentType = response.headers.get('content-type') || '';
  const payload = contentType.includes('application/json') ? await response.json() : null;
  if (!response.ok || !payload?.success) {
    throw new AdminApiError(
      payload?.error?.message || 'The CMS returned an unexpected response.',
      payload?.error?.code || (response.status === 404 ? 'NOT_FOUND' : 'REQUEST_FAILED'),
      response.status
    );
  }
  return payload.data as AdminData;
}

export function adminErrorCopy(error: unknown) {
  const issue =
    error instanceof AdminApiError
      ? error
      : new AdminApiError('The request could not be completed.');
  if (issue.code === 'ADMIN_TOKEN_REJECTED' || issue.status === 401) {
    return {
      eyebrow: 'Authentication failed',
      title: 'The website could not authenticate with the CMS API.',
      detail:
        'The server-to-server credential was rejected. An administrator must verify the deployment secrets.',
    };
  }
  if (issue.code === 'CMS_UPSTREAM_UNAVAILABLE' || issue.status === 502) {
    return {
      eyebrow: 'Service unavailable',
      title: 'The CMS API is temporarily unreachable.',
      detail:
        'The upstream service did not return a valid JSON response. Try again after a short wait.',
    };
  }
  if (issue.code === 'NOT_FOUND' || issue.status === 404) {
    return {
      eyebrow: 'Feature unavailable',
      title: 'This CMS endpoint is not available yet.',
      detail: issue.message || 'The frontend and API deployment may be out of sync.',
    };
  }
  return {
    eyebrow: 'Request failed',
    title: 'The request could not be completed.',
    detail: issue.message,
  };
}

export const jsonRequest = (method: string, body: unknown): RequestInit => ({
  method,
  headers: { 'content-type': 'application/json' },
  body: JSON.stringify(body),
});

export const formatDate = (value: unknown) =>
  value
    ? new Date(String(value)).toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' })
    : '—';
