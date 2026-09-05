import assert from 'node:assert/strict';
import { afterEach, test } from 'node:test';
import { adminApiHeaders, cmsUpstreamIssue } from './admin-api.ts';

const names = [
  'DUCKCLOUD_ADMIN_API_TOKEN',
  'ADMIN_API_TOKEN',
  'CLOUDFLARE_ACCESS_CLIENT_ID',
  'CLOUDFLARE_ACCESS_CLIENT_SECRET',
] as const;

afterEach(() => names.forEach((name) => delete process.env[name]));

test('returns null without a CMS token', () => {
  process.env.ADMIN_API_TOKEN = 'wrong-service-secret';
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
  assert.equal(headers.get('x-duckcloud-admin-token'), 'cms-secret');
  assert.equal(headers.get('cf-access-client-id'), 'service-id');
  assert.equal(headers.get('cf-access-client-secret'), 'service-secret');
  assert.equal(headers.get('content-type'), 'application/json');
  assert.equal(headers.get('origin'), 'https://www.duckcloud.info');
  assert.equal(headers.get('cookie'), null);
});

test('requires both Access service-token values before forwarding either', () => {
  process.env.DUCKCLOUD_ADMIN_API_TOKEN = 'cms-secret';
  process.env.CLOUDFLARE_ACCESS_CLIENT_ID = 'service-id';

  const headers = adminApiHeaders('admin@example.com')!;
  assert.equal(headers.get('cf-access-client-id'), null);
  assert.equal(headers.get('cf-access-client-secret'), null);
});

test('returns controlled diagnostics from upstream response metadata', () => {
  assert.deepEqual(cmsUpstreamIssue(0, ''), {
    code: 'CMS_UPSTREAM_UNAVAILABLE',
    message: 'The CMS API could not be reached.',
  });
  assert.deepEqual(cmsUpstreamIssue(302, 'text/html'), {
    code: 'CMS_UPSTREAM_UNAVAILABLE',
    message: 'The CMS API could not be reached.',
  });
  assert.deepEqual(cmsUpstreamIssue(401, 'application/json'), {
    code: 'ADMIN_TOKEN_REJECTED',
    message: 'The CMS API authentication failed.',
  });
  assert.equal(cmsUpstreamIssue(403, 'application/json; charset=utf-8'), null);
});
