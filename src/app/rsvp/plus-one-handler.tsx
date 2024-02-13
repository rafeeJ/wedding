import { PlusOneForm } from "@/app/rsvp/plus-one-form";
import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { getUserPlusOne } from "@/utils/db/getUserPlusOne";

export const PlusOneHandler = async ({
  plus_one_allowed_day,
}: {
  plus_one_allowed_day: boolean;
}) => {
  const supabase = createClient(cookies());
  const { data } = await getUserPlusOne({ supabase });

  if (data) {
    return (
      <section>
        <h3>
          we have the details for your plus one: {data.first_name}{" "}
          {data.last_name}
        </h3>
      </section>
    );
  }

  return (
    <section className={"border-t mt-2 pt-2"}>
      <h1>plus one details</h1>
      <PlusOneForm plus_one_allowed_day={plus_one_allowed_day} />
    </section>
  );
};
