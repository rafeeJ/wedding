"use server";

import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/actions";
import { getURL } from "@/utils/getUrl";
import { revalidatePath } from "next/cache";

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
    email,
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

export const rsvp = async (prev: any, formData: FormData) => {
  const supabase = createClient(cookies());
  const { error, data } = await supabase.auth.getUser();
  if (error) {
    return { message: "you are not logged in!" };
  }

  const { data: approvedUser, error: approvedUserError } = await supabase
    .from("approved_users")
    .select("*")
    .eq("email", data.user.email);

  if (approvedUser?.length === 0 || approvedUserError) {
    return {
      message: "There was an error, please get in touch with Rafee or Ellie.",
    };
  }

  const user = approvedUser[0];

  const attendingDay = formData.get("attendingDay") as string;
  const attendingNight = formData.get("attendingEvening") as string;

  const { data: rsvp, error: rsvpError } = await supabase
    .from("rsvp")
    .select("*")
    .eq("user_id", user.id);

  if (!rsvp) {
    return {
      message: "There was an error, please get in touch with Rafee or Ellie.",
    };
  }

  if (rsvp.length > 0 || rsvpError) {
    return { message: "You have already RSVP'd!" };
  }

  const { error: insertError } = await supabase.from("rsvp").insert([
    {
      user_id: user.id,
      attending_day: attendingDay,
      attending_night: attendingNight,
    },
  ]);

  if (insertError) {
    return {
      message: "Please select your options",
    };
  }

  revalidatePath("/rsvp");
};
