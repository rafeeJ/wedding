import { createClient } from "@/utils/supabase/client";
import { SupabaseClient } from "@supabase/supabase-js";

export const getFoodOptions = async (supabase: SupabaseClient) => {
  const { data } = await supabase.from("food_options").select("*");

  return data;
};
