import { NextResponse } from "next/server";
import { Storage, SignedPostPolicyV4Output } from "@google-cloud/storage";

const bucketName = process.env.BUCKET_NAME || "";

export async function GET(
  req: Request,
): Promise<NextResponse<SignedPostPolicyV4Output | string>> {
  const { searchParams } = new URL(req.url);
  const file = searchParams.get("file");

  if (!file) {
    return NextResponse.json("File query parameter is required", {
      status: 400,
    });
  }

  const storage = new Storage({
    projectId: process.env.PROJECT_ID,
    credentials: {
      client_email: process.env.CLIENT_EMAIL,
      private_key: process.env.PRIVATE_KEY,
    },
  });

  const bucket = storage.bucket(bucketName);
  const gcsFile = bucket.file(file);
  const options = {
    expires: Date.now() + 5 * 60 * 1000, // 5 minutes
    fields: { "x-goog-meta-source": "nextjs-project" },
  };

  try {
    const [response] = await gcsFile.generateSignedPostPolicyV4(options);
    return NextResponse.json(response);
  } catch (error) {
    console.error("Error generating signed post policy:", error);
    return NextResponse.json("somethign went wrong", { status: 500 });
  }
}
