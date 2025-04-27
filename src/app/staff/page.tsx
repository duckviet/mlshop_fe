import ProductTable from "@/components/staff-components/ProductTable";
import React from "react";

const page = () => {
  return (
    <div>
      <div className="flex flex-col gap-5">
        <p className="font-semibold text-2xl">Report</p>
      </div>
      <div className="flex flex-col gap-5">
        <p className="font-semibold text-2xl">Product table</p>
        <ProductTable />
      </div>
    </div>
  );
};

export default page;
