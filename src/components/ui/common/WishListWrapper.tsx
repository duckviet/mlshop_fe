"use client";
import React, { useMemo, useState } from "react";
import useApi from "@/hooks/useApi";
import { productEndpoint } from "@/services/axios/endpoints/product.endpoint";
import PaginationControl from "../navigation/PaginationControl";
import ItemCard from "@/components/product/ItemCard";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import productAction from "@/services/axios/actions/product.endpoint";
import { useCustomerWishList } from "@/providers/CustomerProvider";

const MAX_LENGTH_COL = 9;

const WishListWrapper = () => {
  // Use useMemo to memoize ids
  const wishList = useCustomerWishList();

  const { data } = useQuery({
    queryKey: ["get-wish-list", wishList],
    queryFn: async () =>
      toast.promise(productAction.getByIds(wishList), {
        error: "Đã có lỗi xảy ra",
      }),
    refetchOnWindowFocus: false,
    retry: false,
  });
  const [page, setPage] = useState<number>(1);

  return (
    <div className="flex gap-10">
      <div className="bg-white max-h-screen min-w-48 w-full max-w-64 drop-shadow-lg p-5 rounded-lg">
        <div className="bg-base-200 hover:cursor-pointer rounded-xl p-2 flex justify-between items-center min-w-32">
          Product
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 320 512"
            className="w-4 h-4"
          >
            <path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z" />
          </svg>
        </div>
        <div className="hover:cursor-pointer rounded-xl p-2 flex justify-between items-center min-w-32">
          Businesses
        </div>
      </div>
      <div>
        <div className="flex justify-between items-center w-full mb-5">
          <h1 className="font-semibold text-2xl">
            Your wish list: {data?.length} items
          </h1>
        </div>

        <div className="grid items-center justify-center sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-10">
          {data?.map((item: any, index: number) => {
            if (
              index >= MAX_LENGTH_COL * (page - 1) &&
              index < MAX_LENGTH_COL * page
            ) {
              return <ItemCard key={item._id} product={item} />;
            } else {
              return null;
            }
          })}
        </div>
        <PaginationControl
          totalItems={data?.length ? data?.length : 0}
          currentPage={page}
          setPage={setPage}
        />
      </div>
    </div>
  );
};

export default WishListWrapper;
