"use client";
import { food_options } from ".prisma/client";
import { useFormState } from "react-dom";
import { selectFoodChoice } from "@/app/actions";
import { getProfileFromUser } from "@/utils/db/getProfileFromUser";
import { createClient } from "@/utils/supabase/client";

interface props {
  foodOptions: food_options[] | null;
}

export const FoodForm = ({ foodOptions }: props) => {
  const supabase = createClient();

  const handleFoodChoice = async (prev: any, formData: FormData) => {
    const user = await getProfileFromUser({ supabase });
    if (!user) {
      return { message: "You are not logged in!" };
    }
    const foodChoice = formData.get("foodChoice") as string;
    await selectFoodChoice(user.id, parseInt(foodChoice));
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
          Please select your wedding lunch choice
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
