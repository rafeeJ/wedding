import { Tables } from "@/types/supabase";

interface props {
  data: Tables<"approved_users">[];
}
export const GuestSummary = ({ data }: props) => {
  // process data

  const noOfDayGuests = data.filter((user) => user.allowed_day_invite).length;
  const noOfDayPlusOnes = data.filter(
    (user) => user.plus_one_allowed_day,
  ).length;

  return (
    <section>
      <h1 className={"text-xl font-bold"}>Guest Summary </h1>
      <table>
        <tr>
          <td>Invited Day Guests:</td>
          <td className={"text-right"}>{noOfDayGuests}</td>
        </tr>
        <tr>
          <td>Invited Day +1s:</td>
          <td className={"text-right"}>{noOfDayPlusOnes}</td>
        </tr>
        <tr>
          <td>Total Invited Day Guests:</td>
          <td className={"text-right"}>{noOfDayGuests + noOfDayPlusOnes}</td>
        </tr>
      </table>
    </section>
  );
};
