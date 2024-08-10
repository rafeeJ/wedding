"use client";
import { food_options } from ".prisma/client";
import { useFormState } from "react-dom";
import { selectFoodChoice, selectPlusOneFoodChoice } from "@/app/actions";
import { getProfileFromUser } from "@/utils/db/getProfileFromUser";
import { createClient } from "@/utils/supabase/client";

interface props {
  foodOptions: food_options[] | null;
  plus_one?: boolean;
}

export const FoodForm = ({ foodOptions, plus_one }: props) => {
  const supabase = createClient();

  const handleFoodChoice = async (prev: any, formData: FormData) => {
    const user = await getProfileFromUser({ supabase });
    if (!user) {
      return { message: "You are not logged in!" };
    }
    const foodChoice = formData.get("foodChoice") as string;

    if (plus_one) {
      await selectPlusOneFoodChoice(user.id, parseInt(foodChoice));
    } else {
      await selectFoodChoice(user.id, parseInt(foodChoice));
    }

    return { message: "Thank you for selecting your food choice" };
  };

  const [state, formAction] = useFormState(handleFoodChoice, {
    message: "",
  });

  if (!foodOptions) {
    return <pre>loading...</pre>;
  }

  return (
    <section>
      <form
        className={"grid gap-2 place-items-start grid-cols-3"}
        action={formAction}
      >
        <label htmlFor={"foodChoice"} className={"col-span-2 self-center"}>
          {plus_one
            ? "Please select your +1's wedding lunch choice"
            : "Please select your wedding lunch choice"}
        </label>
        <select
          id={"foodChoice"}
          name={"foodChoice"}
          className={"col-span-2"}
          required
        >
          {foodOptions.map((foodOption) => (
            <option key={foodOption.id} value={foodOption.id}>
              {foodOption.name}
            </option>
          ))}
        </select>
        <button type={"submit"} className={"underline col-span-2"}>
          submit
        </button>
      </form>
    </section>
  );
};
