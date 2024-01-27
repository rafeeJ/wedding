"use server";

import { getBaseUrl } from "@/getBaseUrl";
import { redirect } from "next/navigation";

export const logIn = async (prev: any, formData: FormData) => {
  const response = await fetch(`${getBaseUrl()}/api/auth/login`, {
    method: "POST",
    body: JSON.stringify({
      email: formData.get("email"),
      accessCode: formData.get("accessCode"),
    }),
  });

  if (!response.ok) {
    return { message: "error" };
  }

  // get the cookie from the response

  redirect("/");
};
