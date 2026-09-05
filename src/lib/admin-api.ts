/** Build the server-only headers used for website-to-CMS requests. */
export function adminApiHeaders(email: string, requestHeaders?: Pick<Headers, 'get'>): Headers | null {
  const token = process.env.DUCKCLOUD_ADMIN_API_TOKEN;
  if (!token) return null;

  const headers = new Headers();
  headers.set('authorization', `Bearer ${token}`);
  headers.set('x-duckcloud-admin-token', token);
  headers.set('x-admin-email', email);

  const contentType = requestHeaders?.get('content-type');
  const origin = requestHeaders?.get('origin');
  if (contentType) headers.set('content-type', contentType);
  if (origin) headers.set('origin', origin);

  // Required only when api.duckcloud.info is itself protected by Access.
  const clientId = process.env.CLOUDFLARE_ACCESS_CLIENT_ID;
  const clientSecret = process.env.CLOUDFLARE_ACCESS_CLIENT_SECRET;
  if (clientId && clientSecret) {
    headers.set('cf-access-client-id', clientId);
    headers.set('cf-access-client-secret', clientSecret);
  }
  return headers;
}

export interface CmsUpstreamIssue {
  code: 'CMS_UPSTREAM_UNAVAILABLE' | 'ADMIN_TOKEN_REJECTED';
  message: string;
}

/** Classify only response metadata; upstream bodies may contain sensitive Access diagnostics. */
export function cmsUpstreamIssue(status: number, contentType: string): CmsUpstreamIssue | null {
  if (status >= 300 && status < 400 || !contentType.toLowerCase().includes('application/json')) {
    return {
      code: 'CMS_UPSTREAM_UNAVAILABLE',
      message: 'The CMS API could not be reached.',
    };
  }
  if (status === 401) {
    return {
      code: 'ADMIN_TOKEN_REJECTED',
      message: 'The CMS API authentication failed.',
    };
  }
  return null;
}
