import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const VenueInformation = () => {
  return (
    <section className={"mt-4"}>
      <h1 className={"font-bold text-xl underline"}>Venue Information</h1>

      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>Where is the venue?</AccordionTrigger>
          <AccordionContent>
            Castlefield Rooms 18-20 Castle St, Manchester M3 4LZ
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-2">
          <AccordionTrigger>How do I get there?</AccordionTrigger>
          <AccordionContent>
            The venue is accessible via car, Metrolink or train. The nearest
            Metrolink stop to the venue is Deansgate-Castlefield. The nearest
            train station is Deansgate. Both stations are a 5-10 minute walk to
            the venue.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-3">
          <AccordionTrigger>Is there parking?</AccordionTrigger>
          <AccordionContent>
            There are limited parking spaces at the venue. Please let us know if
            you will be driving to the venue, and how many spaces your party
            requires. Spaces will be allocated on a first come first served
            basis.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-4">
          <AccordionTrigger>Is the event indoors or outdoors?</AccordionTrigger>
          <AccordionContent>
            The entire event will be hosted indoors. We may ask you to join us
            outside for photos after the ceremony. Please bring an umbrella just
            in case!
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-5">
          <AccordionTrigger>Where can I stay overnight?</AccordionTrigger>
          <AccordionContent>
            There are plenty of hotels in Manchester, with a lot in walking
            distance of the venue. We recommend using Booking.com to find a
            place to stay.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </section>
  );
};
