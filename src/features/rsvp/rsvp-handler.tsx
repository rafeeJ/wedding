import { RsvpForm } from "@/features/rsvp/rsvp-form";
import { getUserRSVP } from "@/utils/db/getUserRSVP";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { FoodChoiceHandler } from "@/features/rsvp/food/food-choice-handler";
import { getProfileFromUser } from "@/utils/db/getProfileFromUser";

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

  if (attending_day && !chosen_food_option) {
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
      {allowed_plus_one && (
        <p>
          We would love you to bring a plus one - would you kindly fill out the
          form on their behalf!
        </p>
      )}
      <p>If anything changes, please let Ellie or Rafee know ASAP</p>
    </section>
  );
};
