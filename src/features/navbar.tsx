import Link from "next/link";

export const Navbar = () => {
  return (
    <nav className={"flex mb-5 gap-4"}>
      <Link href={"/"}>home</Link>
      <Link href={"/rsvp"}>rsvp</Link>
      <Link href={"/info"}>info</Link>
    </nav>
  );
};
