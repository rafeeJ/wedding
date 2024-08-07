"use client";
import { useEffect, useState } from "react";
import { FOUR_MONTHS_BEFORE_WEDDING } from "@/utils/constants";
import { Duration, intervalToDuration, isBefore } from "date-fns";
import { LoaderIcon } from "lucide-react";

export const RsvpCountdown = () => {
  const [countdown, setCountdown] = useState("");
  const [countdownEnded, setCountdownEnded] = useState(false);

  const formatCountdown = (duration: Duration) => {
    if (duration.months && duration.months > 0) {
      return `${duration.months} month${duration.months > 1 ? "s" : ""} left`;
    }

    if (duration.days && duration.days > 0) {
      return `${duration.days} day${duration.days > 1 ? "s" : ""} left`;
    }

    if (duration.hours && duration.hours > 0) {
      return `${duration.hours} hour${duration.hours > 1 ? "s" : ""}, ${
        duration.minutes
        // @ts-ignore
      } minute${duration.minutes > 1 ? "s" : ""} left`;
    }

    return "Calculating time left...";
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const duration = intervalToDuration({
        start: now,
        end: FOUR_MONTHS_BEFORE_WEDDING,
      });

      const hasEventEnded = isBefore(FOUR_MONTHS_BEFORE_WEDDING, now);

      if (hasEventEnded) {
        setCountdownEnded(true);
        clearInterval(interval);
      } else {
        setCountdown(formatCountdown(duration));
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [FOUR_MONTHS_BEFORE_WEDDING]);

  if (!countdown) {
    return <LoaderIcon className={"animate-spin"} />;
  }

  return (
    <p>
      <span>{countdown}</span> until RSVP opens.
    </p>
  );
};
