"use client";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { cookies } from "next/headers";

export const LogoutButton = async () => {
  const supabase = createClient();

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) console.log("Error logging out:", error.message);
    window.location.href = "/";
  };

  return <button onClick={signOut}>logout</button>;
};
