import React from "react";

const ProductTable = () => {
  return (
    <div className="p-10 rounded-lg border-solid border-2">
      <div className="overflow-x-auto ">
        <table className="table">
          <thead>
            <tr>
              <th></th>
              <th>Airport Code</th>
              <th>Airport Name</th>
              <th>City</th>
              <th>Country</th>
              <th>Description</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr className={""}>
              <th>
                <label>
                  <span>{"index"}</span>
                </label>
              </th>
              <td>
                <div className="flex items-center gap-3">
                  <div>
                    <div className="font-bold">{"airportCode"}</div>
                  </div>
                </div>
              </td>
              <td>
                <span className="text-sm">{"airportName"}</span>
              </td>
              <td>
                <span className="text-sm">{"city"}</span>
              </td>
              <td>
                <span className="font-semibold">{"country"}</span>
              </td>
              <td>
                <span className="font-medium">{"description"}</span>
              </td>
              <td>
                <button>HI</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductTable;
