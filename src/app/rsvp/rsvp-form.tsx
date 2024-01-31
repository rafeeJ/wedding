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
              will you be attending our day party?{" "}
              <br className={"block md:hidden"} />
              (2pm - 7pm)
            </label>
            <div className={"self-center"}>
              <div className={"flex gap-2"}>
                <input
                  type={"radio"}
                  name={"attendingDay"}
                  className={"self-center"}
                  value={"yes"}
                />
                <label htmlFor={"attending"} className={"self-center"}>
                  Yes
                </label>
              </div>
              <div className={"flex gap-2"}>
                <input
                  type={"radio"}
                  name={"attendingDay"}
                  className={"self-center"}
                  value={"No"}
                  defaultChecked
                />
                <label htmlFor={"attending"} className={"self-center"}>
                  No
                </label>
              </div>
            </div>
          </>
        )}
        {allowed_night_invite && (
          <>
            <label htmlFor={"attending"} className={"col-span-2 self-center"}>
              will you be attending our evening party?{" "}
              <br className={"block md:hidden"} />
              (7pm - 12am)
            </label>
            <div className={"self-center"}>
              <div className={"flex gap-2"}>
                <input
                  type={"radio"}
                  name={"attendingEvening"}
                  className={"self-center"}
                  value={"yes"}
                />
                <label htmlFor={"attending"} className={"self-center"}>
                  Yes
                </label>
              </div>
              <div className={"flex gap-2"}>
                <input
                  type={"radio"}
                  name={"attendingEvening"}
                  className={"self-center"}
                  value={"No"}
                  defaultChecked
                />
                <label htmlFor={"attending"} className={"self-center"}>
                  No
                </label>
              </div>
            </div>
          </>
        )}
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
