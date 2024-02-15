"use client";
import { useFormState } from "react-dom";
import { logIn } from "@/app/actions";
import { SubmitEmailButton } from "@/features/nav/submit-email-button";

export default function Login() {
  const [state, formAction] = useFormState(logIn, {
    message: "",
  });
  return (
    <main>
      <form action={formAction} className={"grid gap-2 place-items-start"}>
        <input type={"email"} placeholder={"Email"} name={"email"} />
        <label htmlFor={"email"}>
          * please use the email that you provided to ellie or rafee
        </label>

        <SubmitEmailButton />
        {state.message && (
          <div className="text-sm text-center text-muted-foreground">
            {state.message}
          </div>
        )}
      </form>
    </main>
  );
}
