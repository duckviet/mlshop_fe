"use client";
import ItemCard from "@/components/product/ItemCard";
import useApi from "@/hooks/useApi";
import businessesAction from "@/services/axios/actions/businesses.action";
import productAction from "@/services/axios/actions/product.endpoint";
import { businessesEndpoint } from "@/services/axios/endpoints/businesses.endpoint";
import { productEndpoint } from "@/services/axios/endpoints/product.endpoint";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useParams } from "next/navigation";
import React from "react";
import BusinessProfile from "../_components/BusinessProfile";
import CategoryFilter from "../_components/CategoryFilter";

const Page = () => {
  const { id } = useParams();

  const { data: information } = useQuery({
    queryKey: ["get-business-information", id],
    queryFn: () => businessesAction.getById(id as string),
    refetchOnWindowFocus: false,
    retry: false,
  });
  const { data: products } = useQuery({
    queryKey: ["get-business-productions", id],
    queryFn: () => productAction.getByBusinessesId(id as string),
    refetchOnWindowFocus: false,
    retry: false,
  });

  return (
    <div className="container mx-auto px-4 py-8 space-y-4">
      {/* Business Profile Header */}
      <BusinessProfile information={information} products={products} />

      {/* Category Filter */}
      <CategoryFilter
        categories={products?.map((p: any) => p.category) || [""]}
        selectedCategory={""}
        onSelectCategory={() => {}}
      />

      {/* Products Grid */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products?.map((product: any) => (
          <ItemCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Page;
