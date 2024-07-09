import { Tables } from "@/types/supabase";

interface props {
  data: Tables<"approved_users">[];
}
export const NightGuestSummary = ({ data }: props) => {
  const noOfNightGuests = data.filter(
    (guest) => guest.allowed_night_invite,
  ).length;
  const noOfNightPlusOnes = data.filter(
    (guest) => guest.allowed_plus_one,
  ).length;

  return (
    <section>
      <h1 className={"text-xl font-bold"}>Night Guest Summary</h1>
      <table>
        <tbody>
          <tr>
            <td>Invited Night Guests:</td>
            <td className={"text-right"}>{noOfNightGuests}</td>
          </tr>
          <tr>
            <td>Invited Night +1s:</td>
            <td className={"text-right"}>{noOfNightPlusOnes}</td>
          </tr>
          <tr>
            <td>Total Invited Night Guests:</td>
            <td className={"text-right"}>
              {noOfNightGuests + noOfNightPlusOnes}
            </td>
          </tr>
        </tbody>
      </table>
    </section>
  );
};
