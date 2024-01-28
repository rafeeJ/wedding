"use client";
import { useFormState } from "react-dom";
import { plusOne } from "@/app/actions";

export const PlusOneForm = ({
  plus_one_allowed_day,
}: {
  plus_one_allowed_day: boolean;
}) => {
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
        <input type={"text"} placeholder={"First Name"} name={"firstName"} />
        <input type={"text"} placeholder={"Last Name"} name={"lastName"} />
        <div className={"grid gap-2 place-items-start grid-cols-3"}>
          {plus_one_allowed_day && (
            <>
              <label htmlFor={"attending"}>
                Will your plus one be attending our day party?
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
          <label htmlFor={"attending"}>
            Will your plus one be attending our evening party?
          </label>
          <label htmlFor={"attending"} className={"self-center"}>
            (7pm - 12am)
          </label>
          <input
            type={"checkbox"}
            name={"attendingEvening"}
            className={"self-center"}
          />
        </div>
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
