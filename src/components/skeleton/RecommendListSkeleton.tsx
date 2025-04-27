import React from "react";

const RecommendListSkeleton: React.FC = () => {
  return (
    <div className="h-full w-full">
      <p className="font-semibold text-lg">Recommend Item</p>
      <div className="grid h-full gap-4 grid-cols-3 lg:grid-cols-2 my-10">
        {/* Skeleton placeholders to represent loading items */}
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="animate-pulse flex flex-col space-y-4 p-4 border rounded-md shadow-sm bg-gray-100"
          >
            <div className="h-32 bg-gray-300 rounded-md"></div>
            <div className="h-4 bg-gray-300 rounded w-3/4"></div>
            <div className="h-4 bg-gray-300 rounded w-1/2"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecommendListSkeleton;
