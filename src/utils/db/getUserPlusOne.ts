import { SupabaseClient } from "@supabase/supabase-js";
import { getProfileFromUser } from "@/utils/db/getProfileFromUser";
import { Tables } from "@/types/supabase";

export const getUserPlusOne = async ({
  supabase,
}: {
  supabase: SupabaseClient;
}) => {
  const user = await getProfileFromUser({ supabase });
  if (!user) {
    return null;
  }

  const { data, error: plusOneError } = await supabase
    .from("plus_one")
    .select("*")
    .eq("user_id", user.id)
    .limit(1)
    .maybeSingle();

  if (plusOneError) {
    return null;
  }

  return data as Tables<"plus_one">;
};
