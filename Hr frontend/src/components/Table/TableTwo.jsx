import React from 'react';

function TableTwo({ headers, rows, actions }) {
  return (
    <table className="table-auto w-full border-collapse border border-gray-200">
      <thead>
        <tr className="bg-custom-blue text-center">
          {headers.map((header, index) => (
            <th
              key={index}
              className="border border-gray-300 px-4 py-2 text-center"
            >
              {header}
            </th>
          ))}
          {actions && (
            <th className="border border-gray-300 px-4 py-2 text-center">
              Action
            </th>
          )}
        </tr>
      </thead>
      <tbody>
        {rows.length > 0 ? (
          rows.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className={`${
                rowIndex % 2 === 0
                  ? "bg-custom-blue-2"
                  : "bg-custom-blue-3"
              } hover:bg-gray-100`}
            >
              {Object.values(row).map((value, cellIndex) => (
                <td
                  key={cellIndex}
                  className="border border-gray-300 px-4 py-2"
                >
                  {value}
                </td>
              ))}
              {actions && (
                <td className="border border-gray-300 px-4 py-2 text-center space-x-2 ">
                  <div className="flex justify-center space-x-2 ">
                    {actions(row)}
                  </div>
                </td>
              )}
            </tr>
          ))
        ) : (
          <tr>
            <td
              className="border border-gray-300 px-4 py-2 text-center"
              colSpan={headers.length + (actions ? 1 : 0)}
            >
              No Data Found
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}

export default TableTwo;
