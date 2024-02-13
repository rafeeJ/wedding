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
        <div className={"grid gap-2 place-items-start grid-cols-3"}>
          {plus_one_allowed_day && (
            <>
              <label htmlFor={"attending"} className={"col-span-2 self-center"}>
                will your plus one be attending our day party? <br />
                (2pm - 7pm)
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
            will your plus one be attending our evening party? <br />
            (7pm - 12am)
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
