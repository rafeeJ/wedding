"use client";
import { useFormState } from "react-dom";
import { logIn } from "@/app/actions";
import { createClient } from "@/utils/supabase/client";
import { redirect } from "next/navigation";

export default function Logout() {
  const supabase = createClient();

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) console.log("Error logging out:", error.message);
    redirect("/");
  };

  return (
    <main>
      <button onClick={signOut}>Logout</button>
    </main>
  );
}
