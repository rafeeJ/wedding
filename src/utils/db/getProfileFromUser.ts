import { SupabaseClient } from "@supabase/supabase-js";
import { Tables } from "@/types/supabase";

export const getProfileFromUser = async ({
  supabase,
}: {
  supabase: SupabaseClient;
}) => {
  const { error, data } = await supabase.auth.getUser();
  if (error) {
    return null;
  }

  const { data: approvedUser, error: approvedUserError } = await supabase
    .from("approved_users")
    .select("*")
    .eq("email", data.user.email);

  if (approvedUser?.length === 0 || approvedUserError) {
    return null;
  }

  const user: Tables<"approved_users"> = approvedUser[0];
  return user;
};
