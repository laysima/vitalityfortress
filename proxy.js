import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

// Optimistic auth check only: reads the signed cookie, never the database.
// Real authorization happens in lib/dal.js next to the data.

const MEMBER_PREFIXES = ["/dashboard", "/workouts", "/programs", "/exercises", "/classes", "/progress"];
const AUTH_PAGES = ["/login"];

async function hasSession(request) {
  const token = request.cookies.get("pg_session")?.value;
  const secret = process.env.SESSION_SECRET;
  if (!token || !secret) return false;
  try {
    await jwtVerify(token, new TextEncoder().encode(secret), { algorithms: ["HS256"] });
    return true;
  } catch {
    return false;
  }
}

export default async function proxy(request) {
  const { pathname, search } = request.nextUrl;
  const isMember = MEMBER_PREFIXES.some((p) => pathname === p || pathname.startsWith(`${p}/`));
  const isAuthPage = AUTH_PAGES.includes(pathname);
  if (!isMember && !isAuthPage) return NextResponse.next();

  const signedIn = await hasSession(request);

  if (isMember && !signedIn) {
    const url = new URL("/login", request.nextUrl);
    url.searchParams.set("next", `${pathname}${search}`);
    return NextResponse.redirect(url);
  }
  if (isAuthPage && signedIn) {
    return NextResponse.redirect(new URL("/dashboard", request.nextUrl));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|images|favicon.ico).*)"],
};
