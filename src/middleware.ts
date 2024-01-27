import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest, response: NextResponse) {
  const session = request.cookies.get("weddingSession");

  //Return to /login if don't have a session
  if (!session) {
    return NextResponse.redirect(
      new URL(`/login?redirect=${request.nextUrl.pathname}`, request.url),
    );
  }

  //Call the authentication endpoint
  const responseAPI = await fetch(`${request.nextUrl.origin}/api/auth/login`, {
    headers: {
      Cookie: `weddingSession=${session?.value}`,
    },
  });

  //Return to /login if token is not authorized
  if (responseAPI.status !== 200) {
    return NextResponse.redirect(
      new URL(`/login?redirect=${request.nextUrl.pathname}`, request.url),
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/info", "/rsvp"],
};
