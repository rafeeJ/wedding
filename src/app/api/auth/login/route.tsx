import { NextRequest, NextResponse } from "next/server";
import { cookies, headers } from "next/headers";
import { sign, verify } from "jsonwebtoken";
import prisma from "../../../../db";

export async function POST(request: NextRequest, response: NextResponse) {
  try {
    // get the email and accessCode from the request body
    const data = await request.json();
    const { email, accessCode } = data;

    // check if the email and accessCode are valid
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    const validAccessCode = await prisma.accessCode.findUnique({
      where: {
        code: accessCode,
      },
    });

    if (!user || !validAccessCode) {
      return NextResponse.json({}, { status: 401 });
    }

    // generate a JWT token
    const token = sign({ userId: user.id }, process.env.JWT_SECRET!, {
      expiresIn: "7d",
    });

    // set the cookie
    const options = {
      name: "weddingSession",
      value: token,
      maxAge: 60 * 60 * 24 * 7,
      httpOnly: true,
      secure: true,
    };

    cookies().set(options);

    return NextResponse.json({}, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({}, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const session = cookies().get("weddingSession")?.value || "";

    //Validate if the cookie exist in the request
    if (!session) {
      return NextResponse.json({ isLogged: false }, { status: 401 });
    }

    // use jwt to validate the session cookie
    const decodedClaims = verify(session, process.env.JWT_SECRET!);

    if (!decodedClaims) {
      return NextResponse.json({ isLogged: false }, { status: 401 });
    }

    return NextResponse.json({ isLogged: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json({}, { status: 500 });
  }
}
