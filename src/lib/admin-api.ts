/** Build the server-only headers used for website-to-CMS requests. */
export function adminApiHeaders(email: string, requestHeaders?: Pick<Headers, 'get'>): Headers | null {
  const token = process.env.DUCKCLOUD_ADMIN_API_TOKEN || process.env.ADMIN_API_TOKEN;
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
