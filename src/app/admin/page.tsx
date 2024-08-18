import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { getProfileFromUser } from "@/utils/db/getProfileFromUser";
import { ApprovedUsersTable } from "@/features/admin/approved-users-table";
import { ApprovedUserForm } from "@/features/admin/approved-user-form";
import { redirect } from "next/navigation";

export default async function Admin() {
  const supabase = createClient(cookies());
  const user = await getProfileFromUser({ supabase });

  if (!user) {
    return null;
  }

  if (
    user.email !== "rafeejenkins@gmail.com" &&
    user.email !== "ellielouisekeyworth@gmail.com"
  ) {
    redirect("/");
  }

  return (
    <main>
      <h1 className={"mb-2"}>Approved Guests</h1>
      <section className={"flex gap-2 flex-col"}>
        <ApprovedUsersTable />
        <ApprovedUserForm />
      </section>
    </main>
  );
}
