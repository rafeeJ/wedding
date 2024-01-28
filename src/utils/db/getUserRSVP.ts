import { SupabaseClient } from "@supabase/supabase-js";

export const getUserRSVP = async ({
  supabase,
}: {
  supabase: SupabaseClient;
}) => {
  const { data, error } = await supabase.auth.getUser();

  if (error || !data.user) {
    return { data: null, error: "Not authorised" };
  }

  const { data: approvedUser, error: approvedUserError } = await supabase
    .from("approved_users")
    .select("*")
    .eq("email", data.user.email);

  if (approvedUser?.length === 0 || approvedUserError) {
    return { data: null, error: "Not authorised" };
  }

  const user = approvedUser[0];

  const { data: rsvp, error: rsvpError } = await supabase
    .from("rsvp")
    .select("*")
    .eq("user_id", user.id);

  if (!rsvp) {
    return { data: null, error: "No RSVP found" };
  }

  return { data: rsvp[0], error: null };
};
