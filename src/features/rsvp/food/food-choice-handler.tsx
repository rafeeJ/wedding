import { getFoodOptions } from "@/utils/db/getFoodOptions";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { FoodForm } from "@/features/rsvp/food/food-form";

export const FoodChoiceHandler = async () => {
  const supabase = createClient(cookies());

  const foodOptions = await getFoodOptions(supabase);

  return <FoodForm foodOptions={foodOptions} />;
};
