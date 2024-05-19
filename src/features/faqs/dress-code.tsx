import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const DressCode = () => {
  return (
    <section className={"mt-4"}>
      <h1 className={"font-bold text-xl underline"}>Dress Code</h1>
      <Accordion type="single" collapsible>
        <AccordionItem value="item-10">
          <AccordionTrigger>What is the dress code?</AccordionTrigger>
          <AccordionContent>Please dress formally.</AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-11">
          <AccordionTrigger>What colours should I wear?</AccordionTrigger>
          <AccordionContent>
            Our colour scheme is ‘autumnal’ - please see below for a swatch of
            some of the colours you could incorporate into your outfit. Please
            don’t wear white - it’s reserved for Rafee. Think: an olive tie, or
            a terracotta dress.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </section>
  );
};
