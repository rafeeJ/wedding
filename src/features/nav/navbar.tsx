import Link from "next/link";
import { createClient } from "@/utils/supabase/client";
import { LoginButton } from "@/features/nav/login-button";

export const Navbar = () => {
  return (
    <nav className={"flex mb-5 gap-4 font-bold underline"}>
      <Link href={"/"}>Home</Link>
      <Link href={"/faqs"}>FAQs</Link>
      <Link href={"/info"}>Info</Link>
      <Link href={"/share"}>Share</Link>
      <div className={" flex-grow "} />
      <div>
        <LoginButton />
      </div>
    </nav>
  );
};
