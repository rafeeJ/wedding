"use server";

import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/actions";
import { getURL } from "@/utils/getUrl";
import { revalidatePath } from "next/cache";
import { getProfileFromUser } from "@/utils/db/getProfileFromUser";
import { redirect } from "next/navigation";

export const logIn = async (formData: FormData) => {
  const supabase = createClient(cookies());
  const email = formData.get("email") as string;

  const { data: approvedUser, error: approvedUserError } = await supabase
    .from("approved_users")
    .select("*")
    .eq("email", email);

  if (approvedUser?.length === 0 || approvedUserError) {
    return redirect(
      "/login?message=Please use the email that you provided to Ellie or Rafee",
    );
  }

  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: `${getURL()}auth/confirm`,
    },
  });
  if (error) {
    console.log(error);
    return redirect("/login?message=Something went wrong, please try again");
  }
};

export const verifyOtp = async (formData: FormData) => {
  const supabase = createClient(cookies());
  const otp = formData.get("totp") as string;

  const { error } = await supabase.auth.verifyOtp({
    token: otp,
    email: formData.get("email") as string,
    type: "email",
  });

  if (error) {
    return { message: error.message };
  }

  redirect("/");
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

  const attendingDay = formData.get("attendingDay");
  const attendingNight = formData.get("attendingEvening");
  const dietaryRequirements = formData.get("dietaryRequirements") as string;

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
      attending_day: attendingDay || false,
      attending_night: attendingNight || false,
      dietary_requirements: dietaryRequirements || "",
    },
  ]);

  if (insertError) {
    return {
      message: "Please select your options",
    };
  }

  revalidatePath("/rsvp");
};

export const plusOne = async (prev: any, formData: FormData) => {
  const supabase = createClient(cookies());
  const profile = await getProfileFromUser({ supabase });

  if (!profile) {
    return {
      message: "There was an error, please get in touch with Rafee or Ellie.",
    };
  }

  const user = profile;

  const { data: plusOne, error: plusOneError } = await supabase
    .from("plus_one")
    .select("*")
    .eq("user_id", user.id);

  if (plusOneError) {
    return {
      message: "There was an error, please get in touch with Rafee or Ellie.",
    };
  }

  if (plusOne.length > 0) {
    return { message: "You have already RSVP'd!" };
  }

  const firstName = formData.get("firstName") as string;
  const lastName = formData.get("lastName") as string;
  const attendingDay = formData.get("attendingDay");
  const attendingNight = formData.get("attendingEvening");
  const dietaryRequirements = formData.get("dietaryRequirements") as string;

  const { error: insertError } = await supabase.from("plus_one").insert([
    {
      user_id: user.id,
      first_name: firstName,
      last_name: lastName,
      attending_day: attendingDay || false,
      attending_night: attendingNight || false,
      dietary_requirements: dietaryRequirements || "",
    },
  ]);

  if (insertError) {
    console.log(insertError);
    return {
      message: "Please select your options",
    };
  }

  revalidatePath("/rsvp");
};

export const addApprovedUser = async (prev: any, formData: FormData) => {
  const supabase = createClient(cookies());

  const email = formData.get("email") as string;
  const first_name = formData.get("first_name") as string;
  const last_name = formData.get("last_name") as string;
  const allowed_day_invite = !!formData.get("allowed_day_invite");
  const allowed_night_invite = !!formData.get("allowed_night_invite");
  const allowed_plus_one = !!formData.get("allowed_plus_one");
  const plus_one_allowed_day = !!formData.get("plus_one_allowed_day");

  if (!allowed_day_invite && !allowed_night_invite) {
    return {
      message: "You must allow at least one invite type",
    };
  }

  const { error } = await supabase.from("approved_users").insert([
    {
      email,
      first_name,
      last_name,
      allowed_day_invite,
      allowed_night_invite,
      allowed_plus_one,
      plus_one_allowed_day,
    },
  ]);

  console.log("success");

  if (error) {
    console.log(error);
    return {
      message: "There was an error, please get in touch with Rafee or Ellie.",
    };
  }

  revalidatePath("/admin");
};

export const removeApprovedUser = async (id: number) => {
  const supabase = createClient(cookies());
  const { error } = await supabase.from("approved_users").delete().eq("id", id);
  if (error) {
    console.log(error);
  }

  revalidatePath("/admin");
};

export const updateApprovedUser = async (id: number, data: object) => {
  const supabase = createClient(cookies());

  const { error } = await supabase
    .from("approved_users")
    .update(data)
    .eq("id", id);

  if (error) {
    console.log(error);
  }

  revalidatePath("/admin");
};

export const selectFoodChoice = async (
  userId: number,
  foodChoice: number[],
) => {
  const supabase = createClient(cookies());
  const { error } = await supabase
    .from("rsvp")
    .update({ chosen_food_option: foodChoice })
    .eq("user_id", userId);

  revalidatePath("/rsvp");
};

export const selectPlusOneFoodChoice = async (
  userId: number,
  foodChoice: number[],
) => {
  const supabase = createClient(cookies());
  const { error } = await supabase
    .from("plus_one")
    .update({ chosen_food_option: foodChoice })
    .eq("user_id", userId);

  revalidatePath("/rsvp");
};

export const rejectPlusOneInvite = async (userId: number) => {
  const supabase = createClient(cookies());
  const { error } = await supabase
    .from("approved_users")
    .update({ allowed_plus_one: false });

  revalidatePath("/rsvp");
};
