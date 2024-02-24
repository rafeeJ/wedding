import { RsvpLayout } from "@/features/rsvp/rsvp-layout";
import { isAfter } from "date-fns";
import { RsvpCountdown } from "@/features/rsvp/rsvp-countdown";
import { DATE_OF_WEDDING, SIX_MONTHS_BEFORE_WEDDING } from "@/utils/constants";
export default function RSVP() {
  const today = new Date();
  const isAtLeastSixMonthsBeforeWedding = isAfter(
    today,
    SIX_MONTHS_BEFORE_WEDDING,
  );

  if (!isAtLeastSixMonthsBeforeWedding) {
    return <RsvpCountdown />;
  }

  return <RsvpLayout />;
}
