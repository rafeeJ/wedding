import { RsvpForm } from "@/app/rsvp/rsvp-form";

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
        <h3>thank you for responding</h3>
        <p>if anything has changes, please let ellie or rafee know</p>
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
