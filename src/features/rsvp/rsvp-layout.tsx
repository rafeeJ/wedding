import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { PrismaClient } from "@prisma/client";
import { PlusOneForm } from "@/app/rsvp/plus-one-form";
import { RsvpForm } from "@/app/rsvp/rsvp-form";
import { getUserRSVP } from "@/utils/db/getUserRSVP";
import { RsvpHandler } from "@/app/rsvp/rsvp-handler";

export const RsvpLayout = async () => {
  const supabase = createClient(cookies());
  const { data, error } = await supabase.auth.getUser();

  if (error) {
    console.error(error);
    return null;
  }

  const prisma = new PrismaClient();

  const user = await prisma.approved_users.findUnique({
    where: {
      email: data.user?.email,
    },
  });

  if (!user) {
    return null;
  }

  const rsvp = await getUserRSVP({ supabase });

  const {
    first_name,
    allowed_plus_one,
    allowed_day_invite,
    allowed_night_invite,
  } = user;

  return (
    <main>
      <h1 className={"mb-2"}>hello, {first_name}</h1>
      <RsvpHandler
        hasResponded={!!rsvp.data}
        allowed_night_invite={allowed_night_invite}
        allowed_day_invite={allowed_day_invite}
      />
      <div className={"h-px bg-gray-200 my-2"} />
      {!allowed_plus_one && <h3>you can bring a plus one</h3>}
      {!allowed_plus_one && <PlusOneForm />}
    </main>
  );
};
