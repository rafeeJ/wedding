import { Tables } from "@/types/supabase";
import { createColumnHelper } from "@tanstack/table-core";
import { DeleteUser } from "@/features/admin/delete-user";
import { BooleanInput } from "@/features/admin/boolean-input";

export type formattedFinalGuestData = {
  first_name: string;
  last_name: string;
  allowed_day_invite: boolean;
  allowed_night_invite: boolean;
  allowed_plus_one: boolean;
  plus_one_allowed_day: boolean;
  chosen_food_option?: {
    starter?: number;
    main?: number;
    dessert?: number;
  } | null;
  attending_day?: boolean;
  attending_night?: boolean;
  dietary_requirements?: string;
  plusOne?: {
    first_name?: string;
    last_name?: string;
    attending_day?: boolean;
    attending_night?: boolean;
    chosen_food_option?: {
      starter?: number;
      main?: number;
      dessert?: number;
    } | null;
    dietary_requirements?: string;
  };
};

const columnHelper = createColumnHelper<formattedFinalGuestData>(); //Pass User type as the generic TData type

export const columns = [
  columnHelper.group({
    id: "user_info",
    header: "User Info",
    footer: (props) => props.column.id,
    columns: [
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
    ],
  }),
  columnHelper.group({
    header: "RSVP",
    columns: [
      columnHelper.accessor("attending_day", {
        header: "Attending Day",
        cell: ({ row }) => {
          if (!row.original.allowed_day_invite) {
            return <p className={"text-center"}>n/a</p>;
          }
          return row.original.attending_day ? "☀️" : "❌";
        },
      }),
      columnHelper.accessor("attending_night", {
        header: "Attending Night",
        cell: ({ row }) => {
          return row.original.attending_night ? "🌙" : "❌";
        },
      }),
      columnHelper.accessor("chosen_food_option", {
        header: "Food Choice",
        cell: ({ row }) => {
          if (row.original.allowed_day_invite) {
            if (row.original.chosen_food_option === null) {
              return "🤷‍♂️";
            }
            return JSON.stringify(row.original.chosen_food_option, null, 2);
          }
          return "n/a";
        },
      }),
      columnHelper.accessor("dietary_requirements", {
        header: "Dietary Requirements",
        cell: ({ row }) => row.original.dietary_requirements,
      }),
    ],
  }),
  columnHelper.group({
    header: "Plus One RSVP",
    columns: [
      columnHelper.accessor("plusOne.first_name", {
        header: "First",
        cell: ({ row }) => row.original.plusOne?.first_name,
      }),
      columnHelper.accessor("plusOne.last_name", {
        header: "Last",
        cell: ({ row }) => row.original.plusOne?.last_name,
      }),

      columnHelper.accessor("plusOne.attending_day", {
        header: "Attending Day",
        cell: ({ row }) => {
          if (
            row.original.allowed_plus_one &&
            row.original.plus_one_allowed_day
          ) {
            if (row.original.plusOne?.attending_day === undefined) {
              return "🤷‍♂️";
            }

            return row.original.plusOne?.attending_day ? "☀️" : "❌";
          }
          return <p className={"text-center"}>n/a</p>;
        },
      }),
      columnHelper.accessor("plusOne.attending_night", {
        header: "Attending Night",
        cell: ({ row }) => {
          if (!row.original.allowed_plus_one) {
            return "n/a";
          }

          if (row.original.plusOne?.attending_night === undefined) {
            return "🤷‍♂️";
          }

          return row.original.plusOne?.attending_night ? "🌙" : "❌";
        },
      }),
      columnHelper.accessor("plusOne.chosen_food_option", {
        header: "Food Choice",
        cell: ({ row }) => {
          if (row.original.allowed_plus_one) {
            if (row.original.plusOne?.chosen_food_option === null) {
              return "🤷‍♂️";
            }
            return JSON.stringify(
              row.original.plusOne?.chosen_food_option,
              null,
              2,
            );
          }
          return;
        },
      }),
      columnHelper.accessor("plusOne.dietary_requirements", {
        header: "Dietary Requirements",
        cell: ({ row }) =>
          row.original.plusOne?.dietary_requirements?.substring(0, 30) || "",
      }),
    ],
  }),
];
