"use client";
import { useFormState } from "react-dom";
import { logIn } from "@/app/actions";
import { useFormStatus } from "react-dom";

export default function Login() {
  const [state, formAction] = useFormState(logIn, {
    message: "",
  });
  const { pending } = useFormStatus();
  return (
    <main>
      <form action={formAction} className={"grid gap-2 place-items-start"}>
        <input type={"email"} placeholder={"Email"} name={"email"} />
        <label htmlFor={"email"}>
          * please use the email that you provided to ellie or rafee
        </label>

        <button type={"submit"} disabled={pending}>
          {pending ? "Logging in..." : "Log in"}
        </button>
        {state.message && (
          <div className="text-sm text-center text-muted-foreground">
            {state.message}
          </div>
        )}
      </form>
    </main>
  );
}
