interface props {
  row: any;
  table: any;
}
export const DeleteUser = ({ row, table }: props) => {
  const meta = table.options.meta;
  const id = row.original.id;

  const removeRow = () => {
    meta?.removeRow(id);
  };

  return <button onClick={removeRow}>x</button>;
};
