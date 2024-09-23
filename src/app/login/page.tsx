"use client";
import { logIn, verifyOtp } from "@/app/actions";
import { SubmitEmailButton } from "@/features/nav/submit-email-button";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Login({
  searchParams,
}: {
  searchParams: { message: string; showOtp: boolean };
}) {
  const [otpSent, setOtpSent] = useState(false);
  const [email, setEmail] = useState("");

  const handleEmailSubmit = async (formData: FormData) => {
    const email = formData.get("email") as string;
    setEmail(email);
    try {
      await logIn(formData);
      setOtpSent(true);
    } catch (error) {
      console.log(error);
    }
  };

  const handleOtpSubmit = async (formData: FormData) => {
    formData.append("email", email);
    try {
      await verifyOtp(formData);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main>
      <h1 className={"text-xl mb-4"}>Log in to see wedding information</h1>
      {!otpSent ? (
        <form
          action={handleEmailSubmit}
          className={"grid gap-2 place-items-start"}
        >
          <Label htmlFor="email">Email</Label>
          <Input
            type={"email"}
            placeholder={"wedding@rafeeandellie.com"}
            name={"email"}
            required
            autoComplete={"on"}
            className={"w-3/4 md:w-96"}
          />

          <SubmitEmailButton />
          {searchParams.message && <p>{searchParams.message}</p>}
        </form>
      ) : (
        <form
          action={handleOtpSubmit}
          className={"grid gap-2 place-items-start"}
        >
          <p>
            Check your emails and enter the 6-digit code into the box below.
          </p>
          <label htmlFor="totp">
            <Label className="text-foreground">Your OTP</Label>
            <Input
              autoComplete={"one-time-code"}
              type="text"
              name="totp"
              id="totp"
              required
              placeholder="123456"
              className={"w-3/4 md:w-96"}
            />
          </label>
          <SubmitEmailButton />
          {searchParams.message && <p>{searchParams.message}</p>}
        </form>
      )}
    </main>
  );
}
