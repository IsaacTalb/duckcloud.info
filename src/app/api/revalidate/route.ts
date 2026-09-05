import { revalidatePath, revalidateTag } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

const ALLOWED_EXACT = new Set(['/blog', '/sitemap.xml', '/feed.xml']);
const ALLOWED_PREFIXES = ['/blog/'];

export async function POST(request: NextRequest) {
  const expected = process.env.REVALIDATION_SECRET;
  if (!expected || request.headers.get('authorization') !== `Bearer ${expected}`) {
    return NextResponse.json({ success: false, error: { code: 'UNAUTHORIZED', message: 'Revalidation authorization is required.' } }, { status: 401 });
  }

  let body: { paths?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ success: false, error: { code: 'INVALID_JSON', message: 'Expected JSON.' } }, { status: 400 });
  }

  if (!Array.isArray(body.paths) || body.paths.length > 10 || body.paths.some((path) => typeof path !== 'string' || (!ALLOWED_EXACT.has(path) && !ALLOWED_PREFIXES.some((prefix) => path.startsWith(prefix))) || path.includes('..'))) {
    return NextResponse.json({ success: false, error: { code: 'INVALID_PATH', message: 'One or more revalidation paths are not allowed.' } }, { status: 422 });
  }

  for (const path of body.paths) revalidatePath(path);
  revalidateTag('cms', 'max');

  return NextResponse.json({ success: true, data: { revalidated: body.paths } });
}
