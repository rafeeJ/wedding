import { getFoodOptions } from "@/utils/db/getFoodOptions";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { FoodForm } from "@/features/rsvp/food/food-form";

interface props {
  plus_one?: boolean;
}
export const FoodChoiceHandler = async ({ plus_one = false }: props) => {
  const supabase = createClient(cookies());

  const foodOptions = await getFoodOptions(supabase);

  return <FoodForm foodOptions={foodOptions} plus_one={plus_one} />;
};
