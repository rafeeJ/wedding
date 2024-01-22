import Link from "next/link";

export const Navbar = () => {
  return (
    <nav className={"flex mb-5"}>
      <Link href={"/"}>home</Link>
    </nav>
  );
};
