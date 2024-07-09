import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const InviteInformation = () => {
  return (
    <section className={"mt-4"}>
      <h1 className={"font-bold text-xl underline"}>Invite Information</h1>

      <Accordion type="single" collapsible>
        <AccordionItem value="item-6">
          <AccordionTrigger>What does my invite mean?</AccordionTrigger>
          <AccordionContent>
            Your invite will tell you if you are a day or evening guest. Day
            guests will join us for the ceremony and reception, as well as the
            after party. Evening guests will join us for the after party.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-7">
          <AccordionTrigger>
            When do I need to respond to the RSVP by?
          </AccordionTrigger>
          <AccordionContent>Please respond by 31 August 2024.</AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-8">
          <AccordionTrigger>Am I allowed to bring a plus one?</AccordionTrigger>
          <AccordionContent>
            Your invite will specify whether you can bring a plus one, as well
            as which part of the day they are invited to.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-9">
          <AccordionTrigger>Are kids allowed?</AccordionTrigger>
          <AccordionContent>
            No. Whilst we would love to have your little ones, we don’t believe
            this is a child friendly event.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </section>
  );
};
