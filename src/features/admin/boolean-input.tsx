import { Column, Row, Table } from "@tanstack/table-core";
import { Tables } from "@/types/supabase";
import { ChangeEvent, useEffect, useState } from "react";

interface props {
  table: any;
  row: Row<Tables<"approved_users">>;
  getValue: any;
  column: any;
}

export const BooleanInput = ({ table, row, getValue, column }: props) => {
  const initialValue = getValue();
  const meta = table.options.meta;
  const id = row.original.id;
  const columnName = column.id;
  const [checked, setChecked] = useState(!!initialValue);

  useEffect(() => {
    setChecked(initialValue);
  }, [initialValue]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.checked;
    setChecked(value);
    meta.updateBoolean(id, columnName, value);
  };

  return <input type="checkbox" checked={checked} onChange={handleChange} />;
};
