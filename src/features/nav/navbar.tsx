import Link from "next/link";
import { createClient } from "@/utils/supabase/client";
import { LoginButton } from "@/features/nav/login-button";

export const Navbar = () => {
  return (
    <nav className={"flex mb-5 gap-4 font-bold underline"}>
      <Link href={"/"}>home</Link>
      <Link href={"/info"}>info</Link>
      <Link href={"/rsvp"}>rsvp</Link>
      <div className={" flex-grow "} />
      <div>
        <LoginButton />
      </div>
    </nav>
  );
};
