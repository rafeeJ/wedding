"use server";

import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/actions";

export const logIn = async (prev: any, formData: FormData) => {
  const getURL = () => {
    let url =
      process?.env?.NEXT_PUBLIC_SITE_URL ?? // Set this to your site URL in production env.
      process?.env?.NEXT_PUBLIC_VERCEL_URL ?? // Automatically set by Vercel.
      "http://localhost:3000/";
    // Make sure to include `https://` when not localhost.
    url = url.includes("http") ? url : `https://${url}`;
    // Make sure to include a trailing `/`.
    url = url.charAt(url.length - 1) === "/" ? url : `${url}/`;
    return url;
  };

  const supabase = createClient(cookies());
  const email = formData.get("email") as string;
  console.log(email);

  const { error } = await supabase.auth.signInWithOtp({
    email: formData.get("email") as string,
    options: {
      emailRedirectTo: getURL(),
    },
  });
  if (error) {
    console.log(error);
    return { message: error.message };
  } else {
    return { message: "OTP sent!" };
  }
};

export const logOut = async () => {
  const supabase = createClient(cookies());
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.log(error);
    return { message: error.message };
  } else {
    return { message: "Logged out!" };
  }
};
