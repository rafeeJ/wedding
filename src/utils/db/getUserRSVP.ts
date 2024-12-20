import { SupabaseClient } from "@supabase/supabase-js";
import { Tables } from "@/types/supabase";

export const getUserRSVP = async ({
  supabase,
}: {
  supabase: SupabaseClient;
}) => {
  const { data, error } = await supabase.auth.getUser();

  if (error || !data.user) {
    return null;
  }

  const { data: approvedUser, error: approvedUserError } = await supabase
    .from("approved_users")
    .select("*")
    .eq("email", data.user.email);

  if (approvedUser?.length === 0 || approvedUserError) {
    return null;
  }

  const user = approvedUser[0];

  const { data: rsvp, error: rsvpError } = await supabase
    .from("rsvp")
    .select("*")
    .eq("user_id", user.id);

  if (!rsvp) return null;

  const rsvpData: Tables<"rsvp"> = rsvp[0];

  return rsvpData;
};
