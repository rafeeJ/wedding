import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Image from "next/image";

export const DressCode = () => {
  return (
    <section className={"mt-4"}>
      <h1 className={"font-bold text-xl underline"}>Dress Code</h1>
      <Accordion type="single" collapsible>
        <AccordionItem value="item-10">
          <AccordionTrigger>What is the dress code?</AccordionTrigger>
          <AccordionContent>
            Black-tie optional - which is wedding-speak for: a fusion between
            black-tie and formal fashion. You can wear a tuxedo or a
            floor-length evening gown if you want, but a blazer with chinos and
            smart shoes would be acceptable too. Similarly, a knee-length or
            midi cocktail dress would also be appropriate instead of a
            floor-length gown - but don‘t feel obligated to wear a dress if you
            don‘t want to.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-11">
          <AccordionTrigger>What colours should I wear?</AccordionTrigger>
          <AccordionContent>
            Our colour scheme is ‘autumnal’ - please see below for a swatch of
            some of the colours you could incorporate into your outfit - this
            includes black. Think: an olive tie, or a terracotta dress. Please
            don’t wear white - it’s reserved for Rafee.
            <Image
              src={"/swatch.jpeg"}
              alt={"swatch"}
              width={200}
              height={200}
            />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </section>
  );
};
