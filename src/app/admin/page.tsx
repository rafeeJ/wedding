import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { getProfileFromUser } from "@/utils/db/getProfileFromUser";
import { ApprovedUsersTable } from "@/features/admin/approved-users-table";
import { ApprovedUserForm } from "@/features/admin/approved-user-form";

export default async function Admin() {
  const supabase = createClient(cookies());
  const { data: user, error } = await getProfileFromUser({ supabase });

  if (!user || error) {
    return null;
  }

  if (
    user.email !== "rafeejenkins@gmail.com" &&
    user.email !== "ellielouisekeyworth@gmail.com"
  ) {
    return null;
  }

  return (
    <main>
      <h1 className={"mb-2"}>Approved Guests</h1>
      <section>
        <ApprovedUsersTable />
        <ApprovedUserForm />
      </section>
    </main>
  );
}
