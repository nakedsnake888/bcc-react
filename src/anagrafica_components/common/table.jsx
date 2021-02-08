import React from "react";
import TableHeader from "./tableHeader";
import TableBody from "./tableBody";

function Table({ columns, data }) {
  return (
    <table className="table">
      <TableHeader columns={columns} />
      <TableBody columns={columns} data={data} />
    </table>
  );
}

export default Table;
