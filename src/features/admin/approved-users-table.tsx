import { createClient } from "@/utils/supabase/server";
import { Table } from "@/features/admin/table";
import { cookies } from "next/headers";

export const ApprovedUsersTable = async () => {
  const supabase = createClient(cookies());

  const { data, error } = await supabase
    .from("approved_users")
    .select("*")
    .order("id", { ascending: true });

  if (error) {
    return <div>error</div>;
  }

  return <Table data={data} />;
};
