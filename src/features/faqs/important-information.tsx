import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const ImportantInformation = () => {
  return (
    <section>
      <h1 className={"font-bold text-xl underline"}>Important Information</h1>

      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>
            When should I arrive for the ceremony & reception?
          </AccordionTrigger>
          <AccordionContent>
            If you (or your plus one) are day guests, please arrive for 1pm.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-2">
          <AccordionTrigger>
            When should I arrive for the after-party?
          </AccordionTrigger>
          <AccordionContent>
            If you have not joined us for the ceremony & reception, please
            arrive for tbd.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-3">
          <AccordionTrigger>What are the timings of the day?</AccordionTrigger>
          <AccordionContent>Specific timings to follow.</AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-4">
          <AccordionTrigger>
            Where will wedding updates be posted?
          </AccordionTrigger>
          <AccordionContent>
            This website - rafeeandellie.com or via email.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-5">
          <AccordionTrigger>
            I have more questions, who can I contact?
          </AccordionTrigger>
          <AccordionContent>
            Please email wedding@rafeeandellie.com, or directly message Rafee or
            Ellie.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </section>
  );
};
