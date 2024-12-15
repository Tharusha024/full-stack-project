import React, { useState } from 'react';
import TableTwo from '../../Table/TableTwo';

function OrganizationList({ name, onEdit, onDelete }) {
  const [departments, setDepartments] = useState([
    {departmentName: "Human Resources" } 
  ]);

  const headers = ["Custom Department Name", "Actions"];

  const handleActions = (row) => (
    <div className="flex space-x-2">
      <button
        className="text-blue-500"
        title="Edit"
        onClick={() => onEdit(row)}
      >
        Edit
      </button>
      <button
        className="text-red-500"
        title="Delete"
        onClick={() => onDelete(row)}
      >
        Delete
      </button>
    </div>
  );

  return (
    <div className="w-[700px] bg-white px-3 py-3">
      <p className="text-lg font-average font-bold">Add {name}</p>
      <hr className="bg-blue-600 border-0 h-[2px] my-2" />
      <TableTwo headers={headers} rows={departments} actions={handleActions} />
    </div>
  );
}

export default OrganizationList;
