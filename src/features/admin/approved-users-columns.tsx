import { Tables } from "@/types/supabase";
import { createColumnHelper } from "@tanstack/table-core";
import { DeleteUser } from "@/features/admin/delete-user";
import { BooleanInput } from "@/features/admin/boolean-input";

type ApprovedUser = Tables<"approved_users">;
type RSVP = Tables<"rsvp">;
export type JoinedTable = ApprovedUser & {
  rsvp: RSVP[];
};

const columnHelper = createColumnHelper<JoinedTable>(); //Pass User type as the generic TData type

export const columns = [
  columnHelper.group({
    id: "user_info",
    header: "User Info",
    footer: (props) => props.column.id,
    columns: [
      columnHelper.accessor("id", {
        header: "ID",
        cell: ({ row }) => row.original.id,
        footer: "ID",
      }),
      columnHelper.accessor("first_name", {
        header: "First",
        cell: ({ row }) => row.original.first_name,
        footer: "First",
      }),
      columnHelper.accessor("last_name", {
        header: "Last",
        cell: ({ row }) => row.original.last_name,
        footer: "Last",
      }),
      columnHelper.accessor("email", {
        header: "Email",
        cell: ({ row }) => row.original.email,
      }),
    ],
  }),
  columnHelper.group({
    header: "attendance",
    columns: [
      columnHelper.accessor("allowed_day_invite", {
        header: "Day",
        cell: BooleanInput,
      }),
      columnHelper.accessor("allowed_night_invite", {
        header: "Night",
        cell: BooleanInput,
      }),
    ],
  }),
  columnHelper.group({
    header: "Plus One Info",
    columns: [
      columnHelper.accessor("allowed_plus_one", {
        header: "Allowed",
        cell: BooleanInput,
      }),
      columnHelper.accessor("plus_one_allowed_day", {
        header: "Day",
        cell: BooleanInput,
      }),
    ],
  }),
  columnHelper.display({
    id: "delete",
    cell: DeleteUser,
  }),
  columnHelper.group({
    header: "RSVP",
    columns: [
      columnHelper.display({
        id: "attendingDay",
        header: "Attending Day",
        cell: ({ row }) => {
          if (!row.original.allowed_day_invite) {
            return <p className={"text-center"}>n/a</p>;
          }
          if (row.original.rsvp.length === 0) {
            return <p className={"text-center"}>⏳</p>;
          }
          return row.original.rsvp.map((rsvp) => {
            return (
              <div key={rsvp.id}>
                <p className={"text-center"}>
                  {rsvp.attending_day ? "☀️" : "❌"}
                </p>
              </div>
            );
          });
        },
      }),
      columnHelper.display({
        id: "attendingNight",
        header: "Attending Night",
        cell: ({ row }) => {
          if (row.original.rsvp.length === 0) {
            return <p className={"text-center"}>⏳</p>;
          }
          return row.original.rsvp.map((rsvp) => {
            return (
              <div key={rsvp.id}>
                <p className={"text-center"}>
                  {rsvp.attending_night ? "🌙" : "❌"}
                </p>
              </div>
            );
          });
        },
      }),
    ],
  }),
];
