import { PlusOneForm } from "@/features/rsvp/plus-one-form";
import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { getUserPlusOne } from "@/utils/db/getUserPlusOne";
import { FoodChoiceHandler } from "@/features/rsvp/food/food-choice-handler";
import { DisplayFoodChoice } from "@/features/rsvp/food/display-food-choice";
import { Fragment } from "react";

export const PlusOneHandler = async ({
  plus_one_allowed_day,
}: {
  plus_one_allowed_day: boolean;
}) => {
  const supabase = createClient(cookies());
  const plusOne = await getUserPlusOne({ supabase });

  if (!plusOne) {
    return (
      <section className={"border-t mt-2 pt-2"}>
        <h1>plus one details</h1>
        <PlusOneForm plus_one_allowed_day={plus_one_allowed_day} />
      </section>
    );
  }

  if (
    plus_one_allowed_day &&
    plusOne.attending_day &&
    !plusOne.chosen_food_option
  ) {
    return (
      <section>
        <div className={"h-px my-2"} />
        <h1>Thank you for responding,</h1>
        <FoodChoiceHandler plus_one={true} />
      </section>
    );
  }

  const { attending_night, attending_day } = plusOne;

  const attendingNight = attending_night && !attending_day;
  const showFoodOptions = attending_day && plusOne.chosen_food_option;

  return (
    <section className={"my-2"}>
      <div className={"h-px w-full bg-slate-400 opacity-50 my-3"} />
      <h3>
        We have the details for your plus one: {plusOne.first_name}{" "}
        {plusOne.last_name}
      </h3>
      {attendingNight && <p>Your plus one is attending the night event.</p>}
      {attending_day && (
        <p>Your plus one is attending the day event, please join us at 1pm.</p>
      )}
      {showFoodOptions && (
        <Fragment>
          <p>Their food options are as follow:</p>
          <DisplayFoodChoice chosen_food_option={plusOne.chosen_food_option} />
        </Fragment>
      )}
    </section>
  );
};
