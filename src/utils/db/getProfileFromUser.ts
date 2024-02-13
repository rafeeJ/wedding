import { SupabaseClient } from "@supabase/supabase-js";

export const getProfileFromUser = async ({
  supabase,
}: {
  supabase: SupabaseClient;
}) => {
  const { error, data } = await supabase.auth.getUser();
  if (error) {
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
  return { data: user, error: null };
};
