import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
const systemPathInclude = (pathname: string) => {
  return (pathname.startsWith("/kmutnb-portal") ||
    pathname.startsWith("/management")) as boolean;
};
const systemPathMatcher = ["/kmutnb-portal/:path*", "/management/:path*"];

const management_roleInclude = (role: any) => {
  return role == "staff" || role == "admin";
};

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  const { pathname } = req.nextUrl;

  // ตรวจสอบว่า request มาจาก /api และไม่ใช่ /api/doc , /api/auth
  //apiAuth(req);

  // ตรวจสอบการเข้าสู่ระบบสำหรับหน้า protected
  if (!token && systemPathInclude(pathname)) {
    return NextResponse.redirect(new URL("/log-in", req.url));
  }

  if (token && pathname == "/log-in") {
    return NextResponse.redirect(new URL("/kmutnb-portal", req.url));
  }

  if (
    token &&
    !management_roleInclude(token?.management_role) &&
    pathname.startsWith("/management")
  ) {
    return NextResponse.redirect(
      new URL("/kmutnb-portal/access-denied", req.url)
    );
  }

  if (
    token &&
    token?.management_role == "staff" &&
    pathname.startsWith("/management/staff")
  ) {
    return NextResponse.redirect(
      new URL("/kmutnb-portal/access-denied", req.url)
    );
  }

  // อนุญาตให้ request ผ่าน
  return NextResponse.next();
}

export const config = {
  matcher: ["/api/:path*", systemPathMatcher], // กำหนด path ที่ต้องการใช้ middleware
};

function apiAuth(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // ตรวจสอบว่า request มาจาก /api และไม่ใช่ /api/doc
  if (
    pathname.startsWith("/api") &&
    !pathname.startsWith("/api/doc") &&
    !pathname.startsWith("/api/auth")
  ) {
    const authHeader = req.headers.get("authorization");
    const bearerToken = authHeader?.split(" ")[1];

    if (!bearerToken || bearerToken !== process.env.BEARER_TOKEN) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }
}
