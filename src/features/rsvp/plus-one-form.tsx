"use client";
import { useFormState } from "react-dom";
import { plusOne, rejectPlusOneInvite } from "@/app/actions";
import { createClient } from "@/utils/supabase/client";
import { getProfileFromUser } from "@/utils/db/getProfileFromUser";

export const PlusOneForm = ({
  plus_one_allowed_day,
}: {
  plus_one_allowed_day: boolean;
}) => {
  const rejectPlusOne = async () => {
    const y = confirm("Are you sure you want to reject your plus one?");
    if (!y) {
      return;
    }

    const supabase = createClient();
    const user = await getProfileFromUser({ supabase });
    if (!user) {
      return { message: "You are not logged in!" };
    }

    await rejectPlusOneInvite(user.id);
  };

  const [state, formAction] = useFormState(plusOne, {
    message: "",
  });

  return (
    <section className={"mt-2"}>
      <h1>please enter the details for your plus one:</h1>
      {!plus_one_allowed_day && (
        <h2 className={"underline"}>
          plus one is only allowed for the evening party
        </h2>
      )}
      <form className={"grid gap-2 place-items-start"} action={formAction}>
        <div className={"flex gap-2"}>
          <input
            type={"text"}
            placeholder={"First Name"}
            name={"firstName"}
            required
          />
          <input
            type={"text"}
            placeholder={"Last Name"}
            name={"lastName"}
            required
          />
        </div>
        <div className={"grid gap-2 place-items-start grid-cols-3 col-span-3"}>
          {plus_one_allowed_day && (
            <>
              <label htmlFor={"attending"} className={"col-span-2 self-center"}>
                will your plus one be attending our day party?
              </label>
              <div className={"self-center"}>
                <div className={"flex gap-2"}>
                  <input
                    id={"attendingDayYes"}
                    type={"radio"}
                    name={"attendingDay"}
                    className={"self-center"}
                    value={"yes"}
                  />
                  <label htmlFor={"attendingDayYes"} className={"self-center"}>
                    Yes
                  </label>
                </div>
                <div className={"flex gap-2"}>
                  <input
                    id={"attendingDayNo"}
                    type={"radio"}
                    name={"attendingDay"}
                    className={"self-center"}
                    value={"No"}
                    defaultChecked
                  />
                  <label htmlFor={"attendingDayNo"} className={"self-center"}>
                    No
                  </label>
                </div>
              </div>
            </>
          )}
          <label htmlFor={"attending"} className={"col-span-2 self-center"}>
            will your plus one be attending our evening party?
          </label>
          <div className={"self-center"}>
            <div className={"flex gap-2"}>
              <input
                id={"attendingEveningYes"}
                type={"radio"}
                name={"attendingEvening"}
                className={"self-center"}
                value={"yes"}
              />
              <label htmlFor={"attendingEveningYes"} className={"self-center"}>
                Yes
              </label>
            </div>
            <div className={"flex gap-2"}>
              <input
                id={"attendingEveningNo"}
                type={"radio"}
                name={"attendingEvening"}
                className={"self-center"}
                value={"no"}
                defaultChecked
              />
              <label htmlFor={"attendingEveningNo"} className={"self-center"}>
                No
              </label>
            </div>
          </div>
        </div>
        <div className={"col-span-3"}>
          <label htmlFor={"dietaryRequirements"} className={"block mb-2"}>
            Does the plus one have any dietary requirements?
          </label>
          <input
            id={"dietaryRequirements"}
            type={"text"}
            name={"dietaryRequirements"}
            className={"w-full p-2 border rounded"}
            placeholder={"Enter any dietary restrictions here"}
          />
        </div>

        <div className={"flex gap-8"}>
          <button type={"submit"} className={"underline"}>
            submit
          </button>

          <button className={"text-red-500 underline"} onClick={rejectPlusOne}>
            I am not bringing a plus one
          </button>
        </div>
      </form>
      {state?.message && (
        <div className="text-sm text-center text-muted-foreground">
          {state.message}
        </div>
      )}
    </section>
  );
};
