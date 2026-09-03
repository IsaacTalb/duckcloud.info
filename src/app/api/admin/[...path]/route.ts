import { NextRequest, NextResponse } from "next/server";
import { authenticateAdminAccess } from "@/lib/admin-access";
import { adminApiHeaders } from "@/lib/admin-api";

const handler = async (
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> },
) => {
  const authentication = await authenticateAdminAccess(request.headers);
  if (!authentication.ok) {
    return new NextResponse(authentication.message, { status: authentication.status });
  }

  const headers = adminApiHeaders(authentication.identity.email, request.headers);
  if (!headers) {
    return NextResponse.json(
      { success: false, error: { code: "ADMIN_NOT_CONFIGURED", message: "Admin API is not configured." } },
      { status: 503 },
    );
  }

  const base = process.env.NEXT_PUBLIC_DUCKCLOUD_API_URL || "https://api.duckcloud.info";
  const path = (await params).path.join("/");
  const response = await fetch(`${base}/v1/admin/${path}${request.nextUrl.search}`, {
    method: request.method,
    headers,
    body: ["GET", "HEAD"].includes(request.method) ? undefined : await request.arrayBuffer(),
    cache: "no-store",
    redirect: "manual",
  });
  const contentType = response.headers.get("content-type") || "";
  const isJson = contentType.toLowerCase().includes("application/json");
  if (!isJson || (response.status >= 300 && response.status < 400)) {
    return NextResponse.json(
      {
        success: false,
        error: {
          code: "CMS_UPSTREAM_ACCESS_BLOCKED",
          message:
            "Cloudflare Access blocked the website-to-API request. Add a Cloudflare Access service token to the API application and configure CLOUDFLARE_ACCESS_CLIENT_ID and CLOUDFLARE_ACCESS_CLIENT_SECRET on the website, or remove the API hostname from Access and rely on its CMS token protection.",
        },
      },
      { status: 502 },
    );
  }
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
