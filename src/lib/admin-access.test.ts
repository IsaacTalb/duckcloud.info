import assert from 'node:assert/strict';
import { createServer, type Server } from 'node:http';
import { after, before, beforeEach, test } from 'node:test';
import { exportJWK, generateKeyPair, SignJWT } from 'jose';
import { authenticateAdminAccess } from './admin-access.ts';

let server: Server;
let teamDomain: string;
let privateKey: CryptoKey;
let otherPrivateKey: CryptoKey;
const keyId = 'test-key';

before(async () => {
  const keys = await generateKeyPair('RS256', { extractable: true });
  privateKey = keys.privateKey;
  otherPrivateKey = (await generateKeyPair('RS256')).privateKey;
  const publicJwk = await exportJWK(keys.publicKey);
  server = createServer((_request, response) => {
    response.setHeader('content-type', 'application/json');
    response.end(
      JSON.stringify({ keys: [{ ...publicJwk, alg: 'RS256', kid: keyId, use: 'sig' }] })
    );
  });
  await new Promise<void>((resolve) => server.listen(0, '127.0.0.1', resolve));
  const address = server.address();
  if (!address || typeof address === 'string') throw new Error('Test JWKS server did not start');
  teamDomain = `http://127.0.0.1:${address.port}`;
});

after(
  () =>
    new Promise<void>((resolve, reject) =>
      server.close((error) => (error ? reject(error) : resolve()))
    )
);

beforeEach(() => {
  setNodeEnvironment('test');
  process.env.CLOUDFLARE_ACCESS_TEAM_DOMAIN = teamDomain;
  process.env.CLOUDFLARE_ACCESS_AUD = 'expected-audience';
  process.env.DUCKCLOUD_ADMIN_ALLOWED_EMAIL = 'admin@example.com';
});

function setNodeEnvironment(value: string) {
  (process.env as Record<string, string | undefined>).NODE_ENV = value;
}

function headers(assertion?: string, unverifiedEmail?: string): Headers {
  const result = new Headers();
  if (assertion) result.set('cf-access-jwt-assertion', assertion);
  if (unverifiedEmail) result.set('cf-access-authenticated-user-email', unverifiedEmail);
  return result;
}

async function token(
  overrides: {
    issuer?: string;
    audience?: string | string[];
    email?: string;
    expirationTime?: number;
  } = {}
) {
  return new SignJWT({ email: overrides.email ?? 'admin@example.com' })
    .setProtectedHeader({ alg: 'RS256', kid: keyId })
    .setIssuer(overrides.issuer ?? teamDomain)
    .setAudience(overrides.audience ?? 'expected-audience')
    .setIssuedAt()
    .setExpirationTime(overrides.expirationTime ?? Math.floor(Date.now() / 1000) + 60)
    .sign(privateKey);
}

test('a missing JWT is rejected', async () => {
  assert.deepEqual(await authenticateAdminAccess(headers()), {
    ok: false,
    status: 401,
    message: 'Administrator access is required.',
  });
});

for (const [name, variable] of [
  ['team domain', 'CLOUDFLARE_ACCESS_TEAM_DOMAIN'],
  ['audience', 'CLOUDFLARE_ACCESS_AUD'],
  ['allowed email', 'DUCKCLOUD_ADMIN_ALLOWED_EMAIL'],
] as const) {
  test(`missing ${name} configuration is rejected`, async () => {
    delete process.env[variable];
    const result = await authenticateAdminAccess(headers('configured-looking-assertion'));
    assert.deepEqual(result, { ok: false, status: 403, message: 'Invalid administrator session.' });
  });
}

test('an invalid JWT is rejected without leaking verification errors', async () => {
  const result = await authenticateAdminAccess(headers('not-a-jwt'));
  assert.deepEqual(result, { ok: false, status: 403, message: 'Invalid administrator session.' });
});

test('a JWT with the wrong issuer is rejected', async () => {
  const result = await authenticateAdminAccess(
    headers(await token({ issuer: 'https://wrong.example' }))
  );
  assert.equal(result.ok, false);
  if (!result.ok) assert.equal(result.message, 'Invalid administrator session.');
});

test('a JWT with the wrong audience is rejected', async () => {
  const result = await authenticateAdminAccess(
    headers(await token({ audience: 'wrong-audience' }))
  );
  assert.equal(result.ok, false);
  if (!result.ok) assert.equal(result.message, 'Invalid administrator session.');
});

test('an audience array containing an expected audience is accepted', async () => {
  process.env.CLOUDFLARE_ACCESS_AUD = 'other-application, expected-audience ';
  const result = await authenticateAdminAccess(
    headers(await token({ audience: ['token-secondary-audience', 'expected-audience'] }))
  );
  assert.equal(result.ok, true);
});

test('an expired JWT is rejected', async () => {
  const result = await authenticateAdminAccess(
    headers(await token({ expirationTime: Math.floor(Date.now() / 1000) - 1 }))
  );
  assert.equal(result.ok, false);
  if (!result.ok) assert.equal(result.message, 'Invalid administrator session.');
});

test('a JWT with an invalid signature is rejected', async () => {
  const assertion = await new SignJWT({ email: 'admin@example.com' })
    .setProtectedHeader({ alg: 'RS256', kid: keyId })
    .setIssuer(teamDomain)
    .setAudience('expected-audience')
    .setExpirationTime(Math.floor(Date.now() / 1000) + 60)
    .sign(otherPrivateKey);
  const result = await authenticateAdminAccess(headers(assertion));
  assert.equal(result.ok, false);
  if (!result.ok) assert.equal(result.message, 'Invalid administrator session.');
});

test('a valid JWT for the wrong email is forbidden', async () => {
  const result = await authenticateAdminAccess(
    headers(await token({ email: 'other@example.com' }))
  );
  assert.deepEqual(result, {
    ok: false,
    status: 403,
    message: 'This account does not have administrator access.',
  });
});

test('a valid JWT authenticates the normalized allowed email', async () => {
  process.env.DUCKCLOUD_ADMIN_ALLOWED_EMAIL = 'ADMIN@EXAMPLE.COM';
  const result = await authenticateAdminAccess(
    headers(await token({ email: 'Admin@Example.com' }))
  );
  assert.deepEqual(result, {
    ok: true,
    identity: { email: 'admin@example.com', source: 'cloudflare-access' },
  });
});

test('a team domain without a scheme is normalized to HTTPS', async () => {
  process.env.CLOUDFLARE_ACCESS_TEAM_DOMAIN = 'example.cloudflareaccess.com/';
  const result = await authenticateAdminAccess(headers('not-a-jwt'));
  assert.equal(result.ok, false);
  if (!result.ok) assert.equal(result.message, 'Invalid administrator session.');
});

test('production never trusts the legacy email header as a bypass', async () => {
  const result = await authenticateAdminAccess(headers(undefined, 'admin@example.com'));
  assert.equal(result.ok, false);
  if (!result.ok) assert.equal(result.status, 401);
});

test('the no-JWT bypass works only in development', async () => {
  setNodeEnvironment('development');
  const development = await authenticateAdminAccess(headers());
  assert.equal(development.ok, true);

  setNodeEnvironment('test');
  const nonDevelopment = await authenticateAdminAccess(headers());
  assert.equal(nonDevelopment.ok, false);
  if (!nonDevelopment.ok) assert.equal(nonDevelopment.status, 401);
});

test('production cannot enable a bypass with a custom environment variable', async () => {
  setNodeEnvironment('production');
  process.env.BYPASS_AUTH = 'true';
  const result = await authenticateAdminAccess(headers());
  assert.equal(result.ok, false);
  if (!result.ok) assert.equal(result.status, 401);
  delete process.env.BYPASS_AUTH;
});
