"use client";

import { useFormStatus } from "react-dom";

export const SubmitEmailButton = () => {
  const { pending } = useFormStatus();

  return (
    <button type={"submit"} disabled={pending}>
      {pending ? "Logging in..." : "Log in"}
    </button>
  );
};
