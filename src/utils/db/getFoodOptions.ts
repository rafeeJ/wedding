import { SupabaseClient } from "@supabase/supabase-js";
import { Tables } from "@/types/supabase";

export const getFoodOptions = async (supabase: SupabaseClient) => {
  const { data } = await supabase.from("food_options").select("*");

  return data as Tables<"food_options">[] | null;
};
