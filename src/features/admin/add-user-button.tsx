"use client";
import { useFormStatus } from "react-dom";

export const AddUserButton = () => {
  const { pending } = useFormStatus();

  return (
    <button type={"submit"} disabled={pending}>
      {pending ? "Adding user..." : "Add user"}
    </button>
  );
};
