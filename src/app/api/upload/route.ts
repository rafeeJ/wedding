import { NextResponse } from "next/server";
import { Storage, SignedPostPolicyV4Output } from "@google-cloud/storage";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { getProfileFromUser } from "@/utils/db/getProfileFromUser";

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

  const token = req.headers.get("Authorization")?.split(" ")[1];
  if (!token) {
    return NextResponse.json("Unauthorized", { status: 401 });
  }
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser(token);

  if (error || !user) {
    return NextResponse.json("Unauthorized", { status: 401 });
  }

  const userProfile = await getProfileFromUser({ supabase });
  const folderName = `${userProfile?.first_name}-${userProfile?.last_name}-${userProfile?.id}`;

  const storage = new Storage({
    projectId: process.env.PROJECT_ID,
    credentials: {
      client_email: process.env.CLIENT_EMAIL,
      private_key: process.env.PRIVATE_KEY,
    },
  });

  const bucket = storage.bucket(bucketName);
  const gcsFile = bucket.file(`${folderName}/${file}`);
  const options = {
    expires: Date.now() + 5 * 60 * 1000, // 5 minutes
    fields: { "x-goog-meta-source": "nextjs-project" },
  };

  try {
    const [response] = await gcsFile.generateSignedPostPolicyV4(options);
    return NextResponse.json(response);
  } catch (error) {
    console.error("Error generating signed post policy:", error);
    return NextResponse.json("Something went wrong", { status: 500 });
  }
}
