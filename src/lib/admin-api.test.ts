import assert from 'node:assert/strict';
import { afterEach, test } from 'node:test';
import { adminApiHeaders } from './admin-api.ts';

const names = [
  'DUCKCLOUD_ADMIN_API_TOKEN',
  'ADMIN_API_TOKEN',
  'CLOUDFLARE_ACCESS_CLIENT_ID',
  'CLOUDFLARE_ACCESS_CLIENT_SECRET',
] as const;

afterEach(() => names.forEach((name) => delete process.env[name]));

test('returns null without a CMS token', () => {
  assert.equal(adminApiHeaders('admin@example.com'), null);
});

test('builds CMS and optional Access service-token headers', () => {
  process.env.DUCKCLOUD_ADMIN_API_TOKEN = 'cms-secret';
  process.env.CLOUDFLARE_ACCESS_CLIENT_ID = 'service-id';
  process.env.CLOUDFLARE_ACCESS_CLIENT_SECRET = 'service-secret';
  const incoming = new Headers({
    'content-type': 'application/json',
    cookie: 'must-not-forward',
    origin: 'https://www.duckcloud.info',
  });

  const headers = adminApiHeaders('admin@example.com', incoming)!;
  assert.equal(headers.get('authorization'), 'Bearer cms-secret');
  assert.equal(headers.get('cf-access-client-id'), 'service-id');
  assert.equal(headers.get('cf-access-client-secret'), 'service-secret');
  assert.equal(headers.get('content-type'), 'application/json');
  assert.equal(headers.get('origin'), 'https://www.duckcloud.info');
  assert.equal(headers.get('cookie'), null);
});
