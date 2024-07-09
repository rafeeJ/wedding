import { ImportantInformation } from "@/features/faqs/important-information";
import { VenueInformation } from "@/features/faqs/venue-information";
import { InviteInformation } from "@/features/faqs/invite-information";
import { DressCode } from "@/features/faqs/dress-code";
import { FoodInformation } from "@/features/faqs/food-information";
import { PhotoInformation } from "@/features/faqs/photo-information";

export default function Info() {
  return (
    <main>
      <ImportantInformation />
      <VenueInformation />
      <InviteInformation />
      <DressCode />
      <FoodInformation />
      <PhotoInformation />
    </main>
  );
}
