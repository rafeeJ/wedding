import { SupabaseClient } from "@supabase/supabase-js";

export const getAllInfo = async ({
  supabase,
}: {
  supabase: SupabaseClient;
}) => {
  const { data: user, error: userError } = await supabase.auth.getUser();

  if (userError || !user.user) {
    return null;
  }

  const { data: approvedUser, error: approvedUserError } = await supabase
    .from("approved_users")
    .select("*")
    .eq("email", user.user.email)
    .maybeSingle();

  if (approvedUserError || !approvedUser) {
    return null;
  }

  const { data: foodOptions, error: foodOptionsError } = await supabase
    .from("food_options")
    .select("*");

  if (foodOptionsError || !foodOptions) {
    return null;
  }

  const foodOptionsMap = foodOptions.reduce((acc, option) => {
    acc[option.id] = option.name;
    return acc;
  }, {});

  const { data: allData, error } = await supabase
    .from("approved_users")
    .select("*,plus_one(*),rsvp(*)")
    .filter("email", "eq", user.user.email)
    .order("id", { ascending: true })
    .maybeSingle();

  if (error || !allData) {
    return null;
  }

  const mapFoodChoice = (choice: any) => foodOptionsMap[choice] || choice;

  const formattedData = {
    ...allData,
    rsvp: allData.rsvp.map((rsvp: any) => ({
      ...rsvp,
      chosen_food_option: rsvp.chosen_food_option?.map(mapFoodChoice),
    })),
    plus_one: allData.plus_one.map((plusOne: any) => ({
      ...plusOne,
      chosen_food_option: plusOne.chosen_food_option?.map(mapFoodChoice),
    })),
  };

  const importantData = {
    firstName: formattedData.first_name,
    lastName: formattedData.last_name,
    attendingDay: formattedData.rsvp[0]?.attending_day,
    attendingNight: formattedData.rsvp[0]?.attending_night,
    ...(formattedData.rsvp[0]?.chosen_food_option?.length > 0 && {
      food: {
        starter: formattedData.rsvp[0].chosen_food_option[0],
        main: formattedData.rsvp[0].chosen_food_option[1],
        dessert: formattedData.rsvp[0].chosen_food_option[2],
      },
    }),
    ...(formattedData.plus_one?.length > 0 && {
      plusOne: {
        firstName: formattedData.plus_one[0].first_name,
        lastName: formattedData.plus_one[0].last_name,
        attendingDay: formattedData.plus_one[0].attending_day,
        attendingNight: formattedData.plus_one[0].attending_night,
        ...(formattedData.plus_one[0].chosen_food_option?.length > 0 && {
          food: {
            starter: formattedData.plus_one[0].chosen_food_option[0],
            main: formattedData.plus_one[0].chosen_food_option[1],
            dessert: formattedData.plus_one[0].chosen_food_option[2],
          },
        }),
      },
    }),
  };

  return importantData;
};
