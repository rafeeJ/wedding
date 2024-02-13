import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { useRef } from "react";

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
    <table className={"table-auto border-collapse border border-slate-500"}>
      <thead>
        <tr>
          <th className={"border border-slate-600"}>id</th>
          <th className={"border border-slate-600"}>first name</th>
          <th className={"border border-slate-600"}>last name</th>
          <th className={"border border-slate-600"}>day guest?</th>
          <th className={"border border-slate-600"}>night guest?</th>
          <th className={"border border-slate-600"}>plus one?</th>
          <th className={"border border-slate-600"}>plus one day?</th>
          <th className={"border border-slate-600"}>email</th>
        </tr>
      </thead>
      <tbody>
        {data.map((user) => (
          <tr key={user.id}>
            <td className={"border border-slate-700"}>{user.id}</td>
            <td className={"border border-slate-700"}>{user.first_name}</td>
            <td className={"border border-slate-700"}>{user.last_name}</td>
            <td className={"border border-slate-700"}>
              {user.allowed_day_invite ? "y" : "n"}
            </td>
            <td className={"border border-slate-700"}>
              {user.allowed_night_invite ? "y" : "n"}
            </td>
            <td className={"border border-slate-700"}>
              {user.allowed_plus_one ? "y" : "n"}
            </td>
            <td className={"border border-slate-700"}>
              {user.plus_one_allowed_day ? "y" : "n"}
            </td>
            <td className={"border border-slate-700"}>{user.email}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
