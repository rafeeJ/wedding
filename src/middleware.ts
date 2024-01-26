import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest, response: NextResponse) {
  return NextResponse.next();
}

export const config = {
  matcher: ["/info", "/rsvp"],
};
