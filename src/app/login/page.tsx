"use client";
import { useFormState } from "react-dom";

export default function Login() {
  const logIn = async (prev: any, formData: FormData) => {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({
        email: formData.get("email"),
        accessCode: formData.get("accessCode"),
      }),
    });

    if (res.ok) {
      window.location.href = "/";
      return { message: "" };
    } else {
      const { message } = await res.json();
      return { message };
    }
  };

  const [state, formAction] = useFormState(logIn, {
    message: "",
  });

  return (
    <main>
      <h1>Login</h1>
      <form className={"grid gap-2 place-items-start"} action={formAction}>
        <input type={"email"} name={"email"} placeholder={"Email"} />
        <input
          type={"password"}
          name={"accessCode"}
          placeholder={"access code"}
        />
        <button type={"submit"}>Login</button>
      </form>
      {state.message && (
        <div className="text-sm text-center text-muted-foreground">
          {state.message}
        </div>
      )}
    </main>
  );
}
