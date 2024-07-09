import { createClient } from "@/utils/supabase/server";
import { Table } from "@/features/admin/table";
import { cookies } from "next/headers";
import { GuestSummary } from "@/features/admin/guest-summary";
import { NightGuestSummary } from "@/features/admin/night-guest-summary";

export const ApprovedUsersTable = async () => {
  const supabase = createClient(cookies());

  const { data, error } = await supabase
    .from("approved_users")
    .select("*")
    .order("id", { ascending: true });

  if (error) {
    return <div>error</div>;
  }

  return (
    <section className={"flex flex-col gap-2"}>
      <Table data={data} />
      <div className={"flex flex-row justify-between"}>
        <GuestSummary data={data} />
        <NightGuestSummary data={data} />
      </div>
    </section>
  );
};
