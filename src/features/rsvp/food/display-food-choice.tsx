import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { getFoodOptions } from "@/utils/db/getFoodOptions";

interface props {
  chosen_food_option: number[] | null;
}

export const DisplayFoodChoice = async ({ chosen_food_option }: props) => {
  const supabase = createClient(cookies());
  const foodOptions = await getFoodOptions(supabase);

  if (!foodOptions) {
    return <pre>loading...</pre>;
  }

  const selectedFoodOptions = foodOptions.filter((foodOption) => {
    return chosen_food_option?.includes(foodOption.id);
  });

  return (
    <ul>
      {selectedFoodOptions.map((food, index) => (
        <li key={food.id} className={"list-decimal"}>
          {food.name}
        </li>
      ))}
    </ul>
  );
};
