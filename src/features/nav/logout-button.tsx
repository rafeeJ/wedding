"use client";
import { createClient } from "@/utils/supabase/client";
import { Button } from "@/components/ui/button";

export const LogoutButton = async () => {
  const supabase = createClient();

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) console.log("Error logging out:", error.message);
    window.location.href = "/";
  };

  return (
    <button onClick={signOut} className={"underline"}>
      Log out
    </button>
  );
};
