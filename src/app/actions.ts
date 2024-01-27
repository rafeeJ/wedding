"use server";

import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/actions";

export const logIn = async (prev: any, formData: FormData) => {
  const supabase = createClient(cookies());
  const email = formData.get("email") as string;
  console.log(email);

  const { error } = await supabase.auth.signInWithOtp({
    email: formData.get("email") as string,
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
