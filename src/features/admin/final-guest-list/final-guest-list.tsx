import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { FinalGuestTable } from "@/features/admin/final-guest-list/final-guest-table";

export const FinalGuestList = async () => {
  const supabase = createClient(cookies());
  const { data, error } = await supabase
    .from("approved_users")
    .select("*,plus_one(*),rsvp(*)")
    .order("id", { ascending: true });

  if (error) {
    return <div>{JSON.stringify(error)}</div>;
  }

  const formattedData = data
    .map((user) => {
      const plusOne = user.plus_one[0];
      const rsvp = user.rsvp[0];

      return {
        first_name: user.first_name,
        last_name: user.last_name,
        allowed_day_invite: user.allowed_day_invite,
        allowed_night_invite: user.allowed_night_invite,
        allowed_plus_one: user.allowed_plus_one,
        plus_one_allowed_day: user.plus_one_allowed_day,
        chosen_food_option: rsvp?.chosen_food_option && {
          starter: rsvp?.chosen_food_option?.[0] ?? "",
          main: rsvp?.chosen_food_option?.[1] ?? "",
          dessert: rsvp?.chosen_food_option?.[2] ?? "",
        },
        attending_day: rsvp?.attending_day,
        attending_night: rsvp?.attending_night,
        dietary_requirements: rsvp?.dietary_requirements ?? "",
        plusOne: {
          first_name: plusOne?.first_name,
          last_name: plusOne?.last_name,
          attending_day: plusOne?.attending_day,
          attending_night: plusOne?.attending_night,
          chosen_food_option: plusOne?.chosen_food_option && {
            starter: plusOne?.chosen_food_option?.[0],
            main: plusOne?.chosen_food_option?.[1],
            dessert: plusOne?.chosen_food_option?.[2],
          },
          dietary_requirements: plusOne?.dietary_requirements ?? "",
        },
      };
    })
    .filter((user) => user.attending_day || user.attending_night);

  return (
    <section className={"flex flex-col gap-2"}>
      <FinalGuestTable data={formattedData} />
    </section>
  );
};
