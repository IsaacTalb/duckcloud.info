import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { authenticateAdminAccess } from "@/lib/admin-access";
import { adminApiHeaders, cmsUpstreamIssue } from "@/lib/admin-api";

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
  let response: Response;
  try {
    response = await fetch(`${base}/v1/admin/${path}${request.nextUrl.search}`, {
      method: request.method,
      headers,
      body: ["GET", "HEAD"].includes(request.method) ? undefined : await request.arrayBuffer(),
      cache: "no-store",
      redirect: "manual",
    });
  } catch (error) {
    console.error("CMS upstream request failed", {
      category: "CMS_UPSTREAM_UNAVAILABLE",
      errorName: error instanceof Error ? error.name : "UnknownError",
    });
    return NextResponse.json(
      {
        success: false,
        error: cmsUpstreamIssue(0, "")!,
      },
      { status: 502 },
    );
  }
  const contentType = response.headers.get("content-type") || "";
  const upstreamIssue = cmsUpstreamIssue(response.status, contentType);
  if (upstreamIssue) {
    // Log response metadata only. Access HTML and upstream headers can contain sensitive details.
    console.error("CMS upstream request failed", {
      category: upstreamIssue.code,
      status: response.status,
      isJson: contentType.toLowerCase().includes("application/json"),
    });
    return NextResponse.json(
      {
        success: false,
        error: upstreamIssue,
      },
      { status: 502 },
    );
  }

  if (response.ok && !["GET", "HEAD"].includes(request.method)) {
    revalidateTag("cms", "max");
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
