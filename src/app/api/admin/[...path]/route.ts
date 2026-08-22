import { NextRequest, NextResponse } from "next/server";
import { authenticateAdminAccess } from "@/lib/admin-access";

const handler = async (
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> },
) => {
  const authentication = await authenticateAdminAccess(request.headers);
  if (!authentication.ok) {
    return new NextResponse(authentication.message, { status: authentication.status });
  }

  // Prefer the website-specific name, but also support the Worker's secret name.
  // This makes a single environment-variable convention work on Cloudflare-hosted
  // Next deployments without weakening the Cloudflare Access check above.
  const token = process.env.DUCKCLOUD_ADMIN_API_TOKEN || process.env.ADMIN_API_TOKEN;
  if (!token) {
    return NextResponse.json(
      { success: false, error: { code: "ADMIN_NOT_CONFIGURED", message: "Admin API is not configured." } },
      { status: 503 },
    );
  }

  const base = process.env.NEXT_PUBLIC_DUCKCLOUD_API_URL || "https://api.duckcloud.info";
  const path = (await params).path.join("/");
  const headers = new Headers(request.headers);
  headers.set("authorization", `Bearer ${token}`);
  // A dedicated header survives Cloudflare Access configurations that consume
  // Authorization before forwarding a request to the API Worker.
  headers.set("x-duckcloud-admin-token", token);
  headers.set("x-admin-email", authentication.identity.email);
  headers.delete("host");
  headers.delete("cf-access-jwt-assertion");

  const response = await fetch(`${base}/v1/admin/${path}${request.nextUrl.search}`, {
    method: request.method,
    headers,
    body: ["GET", "HEAD"].includes(request.method) ? undefined : await request.arrayBuffer(),
    cache: "no-store",
  });
  if (response.status === 401) {
    return NextResponse.json(
      {
        success: false,
        error: {
          code: "ADMIN_TOKEN_REJECTED",
          message:
            "The CMS API token does not match the website token. Set the same secret value as DUCKCLOUD_ADMIN_API_TOKEN on the website and ADMIN_API_TOKEN on the API Worker, then redeploy both services.",
        },
      },
      { status: 502 },
    );
  }

  return new NextResponse(response.body, {
    status: response.status,
    headers: { "content-type": response.headers.get("content-type") || "application/json" },
  });
};

export const GET = handler;
export const POST = handler;
export const PATCH = handler;
export const DELETE = handler;
