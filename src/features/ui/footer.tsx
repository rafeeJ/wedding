import Image from "next/image";
export const Footer = () => {
  return (
    <footer className={"flex w-full flex-col justify-center items-center"}>
      <Image
        src={"/flower_3_nobg.png"}
        alt={"flower"}
        width={150}
        height={100}
        className={"overflow-clip"}
        priority
      />
      <p className={"text-xs"}>Rafee And Ellie - 25th October 2024</p>
    </footer>
  );
};
