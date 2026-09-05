import { NextRequest, NextResponse } from "next/server";
import type { AnalyticsPageViewEvent } from "@/types/analytics";

const IDENTIFIER = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const MAX_BODY_BYTES = 512;

const isPageView = (value: unknown): value is AnalyticsPageViewEvent => {
  if (!value || typeof value !== "object" || Array.isArray(value)) return false;
  const record = value as Record<string, unknown>;
  return Object.keys(record).length === 2
    && (record.kind === "blog" || record.kind === "tool")
    && typeof record.identifier === "string"
    && record.identifier.length <= 160
    && IDENTIFIER.test(record.identifier);
};

export async function POST(request: NextRequest) {
  const origin = request.headers.get("origin");
  if (origin && origin !== request.nextUrl.origin) {
    return NextResponse.json(
      { success: false, error: { code: "ORIGIN_REJECTED", message: "Cross-origin analytics requests are not accepted." } },
      { status: 403 },
    );
  }
  if (request.headers.get("sec-fetch-site") === "cross-site") {
    return NextResponse.json(
      { success: false, error: { code: "ORIGIN_REJECTED", message: "Cross-site analytics requests are not accepted." } },
      { status: 403 },
    );
  }
  const declared = Number(request.headers.get("content-length") || 0);
  if (declared > MAX_BODY_BYTES) {
    return NextResponse.json(
      { success: false, error: { code: "PAYLOAD_TOO_LARGE", message: "Analytics payload is too large." } },
      { status: 413 },
    );
  }
  const source = await request.text();
  if (new TextEncoder().encode(source).byteLength > MAX_BODY_BYTES) {
    return NextResponse.json(
      { success: false, error: { code: "PAYLOAD_TOO_LARGE", message: "Analytics payload is too large." } },
      { status: 413 },
    );
  }
  let event: unknown;
  try { event = JSON.parse(source); } catch {
    return NextResponse.json(
      { success: false, error: { code: "INVALID_JSON", message: "Expected JSON." } },
      { status: 400 },
    );
  }
  if (!isPageView(event)) {
    return NextResponse.json(
      { success: false, error: { code: "VALIDATION_ERROR", message: "Expected a blog or tool canonical identifier." } },
      { status: 422 },
    );
  }

  const base = process.env.NEXT_PUBLIC_DUCKCLOUD_API_URL || "https://api.duckcloud.info";
  let response: Response;
  try {
    response = await fetch(`${base}/v1/analytics/page-view`, {
      method: "POST",
      headers: { "content-type": "application/json", origin: request.nextUrl.origin },
      body: JSON.stringify(event),
      cache: "no-store",
      redirect: "manual",
    });
  } catch {
    return NextResponse.json(
      { success: false, error: { code: "ANALYTICS_UNAVAILABLE", message: "Analytics is temporarily unavailable." } },
      { status: 502 },
    );
  }

  const contentType = response.headers.get("content-type") || "";
  if (!contentType.toLowerCase().includes("application/json")) {
    return NextResponse.json(
      { success: false, error: { code: "ANALYTICS_UNAVAILABLE", message: "Analytics is temporarily unavailable." } },
      { status: 502 },
    );
  }
  return new NextResponse(response.body, {
    status: response.status,
    headers: { "content-type": "application/json", "cache-control": "no-store" },
  });
}
