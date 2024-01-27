import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { cookies } from "next/headers";
import { LogoutButton } from "@/features/nav/logout-button";

export const LoginButton = async () => {
  const supabase = createClient(cookies());
  const { error } = await supabase.auth.getUser();

  if (!error) {
    return <LogoutButton />;
  } else {
    return <Link href={"/login"}>login</Link>;
  }
};
