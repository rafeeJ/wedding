import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const PhotoInformation = () => {
  return (
    <section className={"mt-4"}>
      <h1 className={"font-bold text-xl underline"}>Photos and Videos</h1>
      <Accordion type="single" collapsible>
        <AccordionItem value="item-12">
          <AccordionTrigger>
            Am I allowed to take photos/videos during the ceremony?
          </AccordionTrigger>
          <AccordionContent>
            No. We appreciate that you may want to take photos of Rafee, but we
            have hired a professional photographer to do just this - we don’t
            want people getting in the way whilst she works her magic.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-13">
          <AccordionTrigger>
            Am I allowed to take photos/videos during the reception &
            after-party?
          </AccordionTrigger>
          <AccordionContent>
            Yes! Please take as many as you would like. We will also open up a
            way for you to share photos with us after.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-14">
          <AccordionTrigger>Can I post on social media?</AccordionTrigger>
          <AccordionContent>Sure!</AccordionContent>
        </AccordionItem>
      </Accordion>
    </section>
  );
};
