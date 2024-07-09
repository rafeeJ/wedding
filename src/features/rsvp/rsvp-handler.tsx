import { RsvpForm } from "@/features/rsvp/rsvp-form";

interface props {
  allowed_day_invite: boolean;
  allowed_night_invite: boolean;
  hasResponded: boolean;
}
export const RsvpHandler = ({
  hasResponded,
  allowed_night_invite,
  allowed_day_invite,
}: props) => {
  if (hasResponded) {
    return (
      <section>
        <h3>Thank you for responding</h3>
        <p>
          If you have a plus one, please ensure to fill out the form on this
          page too.
        </p>
        <p>if anything has changes, please let Ellie or Rafee know</p>
      </section>
    );
  }

  return (
    <RsvpForm
      allowed_day_invite={allowed_day_invite}
      allowed_night_invite={allowed_night_invite}
    />
  );
};
