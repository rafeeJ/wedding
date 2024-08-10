import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { getUserRSVP } from "@/utils/db/getUserRSVP";
import { RsvpHandler } from "@/features/rsvp/rsvp-handler";
import { PlusOneHandler } from "@/features/rsvp/plus-one-handler";
import { getProfileFromUser } from "@/utils/db/getProfileFromUser";
import { FoodChoiceHandler } from "@/features/rsvp/food/food-choice-handler";

export const RsvpLayout = async () => {
  const supabase = createClient(cookies());
  const { user, error } = await getProfileFromUser({ supabase });

  if (!user || error) {
    return null;
  }

  const { data: rsvp } = await getUserRSVP({ supabase });

  const {
    first_name,
    allowed_plus_one,
    allowed_day_invite,
    allowed_night_invite,
    plus_one_allowed_day,
  } = user;

  const hasRSVPd = !!rsvp;

  return (
    <main>
      <h1 className={"mb-2"}>Hello, {first_name}</h1>
      <RsvpHandler
        hasResponded={hasRSVPd}
        allowed_night_invite={allowed_night_invite}
        allowed_day_invite={allowed_day_invite}
      />
      {allowed_plus_one && hasRSVPd && (
        <PlusOneHandler plus_one_allowed_day={plus_one_allowed_day} />
      )}
      <div className={"w-full h-px bg-slate-400 opacity-20 mx-2 my-2"} />
      <FoodChoiceHandler />
    </main>
  );
};
