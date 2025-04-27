// RecommendList.tsx

import React from "react";
import useApi from "@/hooks/useApi";
import ItemCard from "./ItemCard";
import { useQuery } from "@tanstack/react-query";
import productAction from "@/services/axios/actions/product.endpoint";

const RecommendList: React.FC<{ category: string }> = ({ category }) => {
  const { data } = useQuery({
    queryKey: ["get-product-by-category", category],
    queryFn: () => productAction.getByCategory(category),
    retry: false,
    refetchOnWindowFocus: false,
  });
  // if (loading) {
  //   // You can reuse your RecommendListSkeleton component here
  //   return <RecommendListSkeleton />;
  // }

  // if (error) {
  //   return <div>Error loading recommendations.</div>;
  // }

  return (
    <div className="h-full w-full">
      <p className="font-semibold text-lg">Recommend Item</p>
      <div className="grid h-full gap-4 grid-cols-3 lg:grid-cols-2 my-10">
        {data?.map((item: any) => (
          <ItemCard key={item._id} product={item} />
        ))}
      </div>
    </div>
  );
};

export default RecommendList;
