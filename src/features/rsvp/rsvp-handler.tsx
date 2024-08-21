import { RsvpForm } from "@/features/rsvp/rsvp-form";
import { getUserRSVP } from "@/utils/db/getUserRSVP";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { FoodChoiceHandler } from "@/features/rsvp/food/food-choice-handler";
import { getProfileFromUser } from "@/utils/db/getProfileFromUser";
import { DisplayFoodChoice } from "@/features/rsvp/food/display-food-choice";

export const RsvpHandler = async () => {
  const supabase = createClient(cookies());
  const { data: rsvp } = await getUserRSVP({ supabase });
  const user = await getProfileFromUser({ supabase });

  const { allowed_day_invite, allowed_night_invite, allowed_plus_one } = user!;

  if (!rsvp) {
    return (
      <RsvpForm
        allowed_day_invite={allowed_day_invite}
        allowed_night_invite={allowed_night_invite}
      />
    );
  }

  const { attending_day, chosen_food_option } = rsvp;

  if (allowed_day_invite && attending_day && !chosen_food_option) {
    return (
      <section>
        <h1>Thank you for responding,</h1>

        <FoodChoiceHandler />
      </section>
    );
  }

  return (
    <section>
      <h3>Thank you for responding.</h3>
      <p>Your food options are as follow:</p>
      <DisplayFoodChoice chosen_food_option={chosen_food_option} />
    </section>
  );
};
