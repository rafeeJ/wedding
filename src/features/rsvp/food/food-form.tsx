"use client";
import { food_options } from ".prisma/client";

interface props {
  foodOptions: food_options[] | null;
}

export const FoodForm = ({ foodOptions }: props) => {
  if (!foodOptions) {
    return <pre>loading...</pre>;
  }

  return (
    <section>
      <form className={"grid gap-2 place-items-start grid-cols-3"}>
        <label htmlFor={"foodChoice"} className={"col-span-2 self-center"}>
          What would you like to eat?
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
      </form>
    </section>
  );
};
