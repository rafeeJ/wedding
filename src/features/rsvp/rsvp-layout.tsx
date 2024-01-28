import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { PrismaClient } from "@prisma/client";
import { getUserRSVP } from "@/utils/db/getUserRSVP";
import { RsvpHandler } from "@/app/rsvp/rsvp-handler";
import { PlusOneHandler } from "@/app/rsvp/plus-one-handler";
import { getProfileFromUser } from "@/utils/db/getProfileFromUser";

export const RsvpLayout = async () => {
  const supabase = createClient(cookies());
  const { data: user, error } = await getProfileFromUser({ supabase });

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

  const hasResponded = !!rsvp;

  return (
    <main>
      <h1 className={"mb-2"}>hello, {first_name}</h1>
      <RsvpHandler
        hasResponded={hasResponded}
        allowed_night_invite={allowed_night_invite}
        allowed_day_invite={allowed_day_invite}
      />
      {allowed_plus_one && hasResponded && (
        <PlusOneHandler plus_one_allowed_day={plus_one_allowed_day} />
      )}
    </main>
  );
};
