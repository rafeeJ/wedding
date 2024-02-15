"use client";

import { useFormState } from "react-dom";
import { addApprovedUser } from "@/app/actions";
import { useRef } from "react";

export const ApprovedUserForm = () => {
  const ref = useRef<HTMLFormElement>(null);

  const [state, formAction] = useFormState(addApprovedUser, {
    message: "",
  });

  return (
    <form
      ref={ref}
      className={"grid gap-2 place-items-start mt-2"}
      action={async (e) => {
        await formAction(e);
        ref.current?.reset();
      }}
    >
      <h1 className={"font-bold"}>Add a new guest</h1>

      <div>
        <label htmlFor="first_name">First Name</label>
        <input type="text" id="first_name" name={"first_name"} required />
      </div>
      <div>
        <label htmlFor="last_name">Last Name</label>
        <input type="text" id="last_name" name={"last_name"} required />
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <input type="email" id="email" name={"email"} required />
      </div>
      <div>
        <label htmlFor="allowed_day_invite">Allowed Day Invite</label>
        <input
          type="checkbox"
          id="allowed_day_invite"
          name={"allowed_day_invite"}
        />
      </div>
      <div>
        <label htmlFor="allowed_night_invite">Allowed Night Invite</label>
        <input
          type="checkbox"
          id="allowed_night_invite"
          name={"allowed_night_invite"}
          defaultChecked={true}
        />
      </div>
      <div>
        <label htmlFor="allowed_plus_one">Allowed Plus One</label>
        <input
          type="checkbox"
          id="allowed_plus_one"
          name={"allowed_plus_one"}
        />
      </div>
      <div>
        <label htmlFor="plus_one_allowed_day">Plus One Allowed Day</label>
        <input
          type="checkbox"
          id="plus_one_allowed_day"
          name={"plus_one_allowed_day"}
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};
