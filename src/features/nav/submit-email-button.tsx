"use client";

import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

export const SubmitEmailButton = () => {
  const { pending } = useFormStatus();

  if (pending) {
    return (
      <Button
        variant={"link"}
        type={"submit"}
        disabled={true}
        className={"underline px-0"}
      >
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        Logging in...
      </Button>
    );
  }

  return (
    <Button variant={"link"} type={"submit"} className={"underline px-0"}>
      Log in
    </Button>
  );
};
