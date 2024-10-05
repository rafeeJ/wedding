"use client";
import { useFormState } from "react-dom";
import { selectFoodChoice, selectPlusOneFoodChoice } from "@/app/actions";
import { getProfileFromUser } from "@/utils/db/getProfileFromUser";
import { createClient } from "@/utils/supabase/client";
import { Fragment } from "react";

interface props {
  foodOptions: food_option[] | null;
  plus_one?: boolean;
}

interface food_option {
  category: string;
  description: string;
  id: number;
  name: string;
}

export const FoodForm = ({ foodOptions, plus_one }: props) => {
  const supabase = createClient();

  const handleFoodChoice = async (prev: any, formData: FormData) => {
    const formOptions = Array.from(formData.entries());
    const options = formOptions.map(([key, value]) => {
      return parseInt(value as string);
    });

    if (options.length === 0) {
      return { message: "Please select a food option" };
    }

    const user = await getProfileFromUser({ supabase });
    if (!user) {
      return { message: "You are not logged in!" };
    }

    if (plus_one) {
      await selectPlusOneFoodChoice(user.id, options);
    } else {
      await selectFoodChoice(user.id, options);
    }

    return { message: "Thank you for selecting your food choice" };
  };

  const [state, formAction] = useFormState(handleFoodChoice, {
    message: "",
  });

  if (!foodOptions) {
    return <pre>loading...</pre>;
  }

  const groupedFoodOptions = foodOptions.reduce(
    (acc, foodOption: food_option) => {
      if (!acc[foodOption.category]) {
        acc[foodOption.category] = [];
      }

      acc[foodOption.category].push(foodOption);

      return acc;
    },
    {} as Record<string, food_option[]>,
  );

  const title = plus_one
    ? "Select a food choice for your plus one"
    : "Please select a food choice for yourself";

  return (
    <section className={"mt-2"}>
      <h1 className={"underline"}>{title}</h1>

      <form className={"w-full"} id={"food"} action={formAction}>
        <div className={"flex flex-col"}>
          {Object.entries(groupedFoodOptions).map(
            ([category, foodOptions], index) => (
              <Fragment key={index}>
                <fieldset
                  key={category}
                  className={"flex flex-col md:flex-row justify-center"}
                >
                  <legend className={"text-center text-xl"}>{category}</legend>
                  <div className={"flex flex-col md:flex-row"}>
                    {foodOptions.map((foodOption) => (
                      <label
                        key={foodOption.id}
                        style={{
                          float: "left",
                          padding: "0 1em",
                          textAlign: "center",
                        }}
                        className={"flex-grow basis-0"}
                      >
                        <h1 className={"underline text-slate-800"}>
                          {foodOption.name}
                        </h1>
                        <p className={"break-words text-xs italic"}>
                          {foodOption.description}
                        </p>
                        <input
                          id={`foodChoice-${category}-${foodOption.id}`}
                          name={`foodChoice-${category}`}
                          type={"radio"}
                          value={foodOption.id}
                          required
                        />
                      </label>
                    ))}
                  </div>
                </fieldset>
                <div
                  className={"h-px w-1/2 bg-slate-400 mx-auto my-4 opacity-25"}
                />
              </Fragment>
            ),
          )}
        </div>
      </form>
      <button type={"submit"} className={"underline col-span-2"} form={"food"}>
        submit
      </button>
    </section>
  );
};
