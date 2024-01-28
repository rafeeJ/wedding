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
            <label htmlFor={"attending"}>
              Will you be attending our day party?
            </label>
            <label htmlFor={"attending"} className={"self-center"}>
              (2pm - 7pm)
            </label>

            <input
              type={"checkbox"}
              name={"attendingDay"}
              className={"self-center"}
            />
          </>
        )}
        {allowed_night_invite && (
          <>
            <label htmlFor={"attending"}>
              Will you be attending our evening party?
            </label>
            <label htmlFor={"attending"} className={"self-center"}>
              (7pm - 12am)
            </label>
            <input
              type={"checkbox"}
              name={"attendingEvening"}
              className={"self-center"}
            />
          </>
        )}
        <button type={"submit"}>Submit</button>
      </form>
      {state?.message && (
        <div className="text-sm text-center text-muted-foreground">
          {state.message}
        </div>
      )}
    </section>
  );
};
