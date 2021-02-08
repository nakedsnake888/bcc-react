import React from 'react';

function TableHeader({ columns }) {
  return (
    <thead>
      <tr>
        {columns.map((column) => (
          <th key={column.path || column.key}>{column.label}</th>
        ))}
      </tr>
    </thead>
  );
}

export default TableHeader;
