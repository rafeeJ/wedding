import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const FoodInformation = () => {
  return (
    <section className={"mt-4"}>
      <h1 className={"font-bold text-xl underline"}>Food & Drinks</h1>
      <Accordion type="single" collapsible>
        <AccordionItem value="item-12">
          <AccordionTrigger>What food will be served?</AccordionTrigger>
          <AccordionContent>
            For day guests, there will be a wedding breakfast (three-course
            meal) after the ceremony. We will be asking for your food choices
            with the invites, so please ensure to fill those out. For those
            joining us in the evening, there will be a BBQ buffet - with
            vegetarian and vegan options included.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-13">
          <AccordionTrigger>What drinks will be served?</AccordionTrigger>
          <AccordionContent>
            There will be a bar from which you can buy drinks from throughout
            the day. Day guests will receive a couple of drinks through day
            events. There will be no drinks provided at the after party, but
            there will be a bar.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-14">
          <AccordionTrigger>
            What if I have a dietary requirement?
          </AccordionTrigger>
          <AccordionContent>
            All the meat is halal. If the options don’t cover your dietary
            requirements, please let Rafee or Ellie know.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </section>
  );
};
