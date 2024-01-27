"use server";

import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/actions";
import { getURL } from "@/utils/getUrl";

export const logIn = async (prev: any, formData: FormData) => {
  const supabase = createClient(cookies());
  const email = formData.get("email") as string;

  const { data: approvedUser, error: approvedUserError } = await supabase
    .from("approved_users")
    .select("*")
    .eq("email", email);

  if (approvedUser?.length === 0 || approvedUserError) {
    return {
      message: "There was an error, please get in touch with Rafee or Ellie.",
    };
  }

  const { error } = await supabase.auth.signInWithOtp({
    email: formData.get("email") as string,
    options: {
      emailRedirectTo: `${getURL()}auth/confirm`,
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
