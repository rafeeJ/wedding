"use client";
import { useFormState } from "react-dom";
import { rsvp } from "@/app/actions";

interface props {
  allowed_day_invite: boolean;
  allowed_night_invite: boolean;
}
export const RsvpForm = ({
  allowed_day_invite,
  allowed_night_invite,
}: props) => {
  const [state, formAction] = useFormState(rsvp, {
    message: "",
  });

  return (
    <section>
      <form
        className={"grid gap-2 place-items-start grid-cols-3"}
        action={formAction}
      >
        {allowed_day_invite && (
          <>
            <label htmlFor={"attending"} className={"col-span-2 self-center"}>
              Will you be attending our day party?
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
        {allowed_night_invite && (
          <>
            <label htmlFor={"attending"} className={"col-span-2 self-center"}>
              Will you be attending our evening party?
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
                <label
                  htmlFor={"attendingEveningYes"}
                  className={"self-center"}
                >
                  Yes
                </label>
              </div>
              <div className={"flex gap-2"}>
                <input
                  id={"attendingEveningNo"}
                  type={"radio"}
                  name={"attendingEvening"}
                  className={"self-center"}
                  value={"No"}
                  defaultChecked
                />
                <label htmlFor={"attendingEveningNo"} className={"self-center"}>
                  No
                </label>
              </div>
            </div>
          </>
        )}
        <div className={"col-span-3"}>
          <label htmlFor={"dietaryRequirements"} className={"block mb-2"}>
            Do you have any dietary requirements?
          </label>
          <input
            id={"dietaryRequirements"}
            type={"text"}
            name={"dietaryRequirements"}
            className={"w-full p-2 border rounded"}
            placeholder={"Enter any dietary restrictions here"}
          />
        </div>
        <button type={"submit"} className={"underline"}>
          submit
        </button>
      </form>
      {state?.message && (
        <div className="text-sm text-center text-muted-foreground">
          {state.message}
        </div>
      )}
    </section>
  );
};
