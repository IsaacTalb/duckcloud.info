const rawTeamDomain = process.env.CLOUDFLARE_ACCESS_TEAM_DOMAIN?.trim().replace(/\/+$/, '');
if (!rawTeamDomain) {
  console.error('CLOUDFLARE_ACCESS_TEAM_DOMAIN is not configured.');
  process.exitCode = 1;
} else {
  const teamDomain = /^https?:\/\//i.test(rawTeamDomain)
    ? rawTeamDomain
    : `https://${rawTeamDomain}`;
  const url = new URL(teamDomain);
  if (url.protocol !== 'https:' || !url.hostname.endsWith('.cloudflareaccess.com')) {
    console.error(
      'CLOUDFLARE_ACCESS_TEAM_DOMAIN must be an HTTPS cloudflareaccess.com team domain.'
    );
    process.exitCode = 1;
  } else {
    const response = await fetch(new URL('/cdn-cgi/access/certs', url));
    if (!response.ok) throw new Error(`Cloudflare Access JWKS returned HTTP ${response.status}`);
    const jwks = await response.json();
    if (!jwks || !Array.isArray(jwks.keys) || jwks.keys.length === 0) {
      throw new Error('Cloudflare Access JWKS response does not contain signing keys');
    }
    console.info('Cloudflare Access JWKS is reachable and contains signing keys.');
  }
}
