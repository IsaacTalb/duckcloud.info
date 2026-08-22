import { NextRequest, NextResponse } from "next/server";
import { authenticateAdminAccess } from "@/lib/admin-access";

export async function proxy(request: NextRequest) {
  const authentication = await authenticateAdminAccess(request.headers);
  if (!authentication.ok) {
    return new NextResponse(authentication.message, { status: authentication.status });
  }
  return NextResponse.next();
}

export const config = { matcher: ["/admin/:path*", "/api/admin/:path*"] };
