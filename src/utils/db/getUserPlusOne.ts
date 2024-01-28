import { SupabaseClient } from "@supabase/supabase-js";
import { getProfileFromUser } from "@/utils/db/getProfileFromUser";

export const getUserPlusOne = async ({
  supabase,
}: {
  supabase: SupabaseClient;
}) => {
  const { data, error } = await getProfileFromUser({ supabase });
  if (error) {
    return { data: null, error };
  }

  const { data: plusOne, error: plusOneError } = await supabase
    .from("plus_one")
    .select("*")
    .eq("user_id", data.id);

  if (plusOneError) {
    console.log(plusOneError);
    return { data: null, error: plusOneError };
  }

  return { data: plusOne[0], error: null };
};
