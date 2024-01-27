import Link from "next/link";
import { createClient } from "@/utils/supabase/client";
import { LoginButton } from "@/features/nav/login-button";

export const Navbar = () => {
  return (
    <nav className={"flex mb-5 gap-4"}>
      <Link href={"/"}>home</Link>
      <Link href={"/rsvp"}>rsvp</Link>
      <Link href={"/info"}>info</Link>
      <div className={" flex-grow "} />
      <div>
        <LoginButton />
      </div>
    </nav>
  );
};
