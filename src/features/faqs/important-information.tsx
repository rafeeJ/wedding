import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";

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
          <AccordionContent>Please arrive for 7:30pm</AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-3">
          <AccordionTrigger>What are the timings of the day?</AccordionTrigger>
          <AccordionContent>
            You can view the timings on the{" "}
            <Link className={"underline"} href={"/info"}>
              info page
            </Link>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-4">
          <AccordionTrigger>Should I bring a gift?</AccordionTrigger>
          <AccordionContent>
            Your presence at our wedding is enough, so please do not feel as
            though you need to provide a gift! <br /> However, if you would like
            to give a gift: a donation towards our honeymoon or a sentimental,
            homemade gift would be amazing.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-5">
          <AccordionTrigger>
            Where will wedding updates be posted?
          </AccordionTrigger>
          <AccordionContent>
            This website - rafeeandellie.com or via email.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-6">
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
