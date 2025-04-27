"use client";
import { useProduct, useProductDispatch } from "@/providers/ProductProvider";
import React, { useState } from "react";
import ItemCard from "@/components/product/ItemCard";
import PaginationControl from "../ui/navigation/PaginationControl";

const MAX_LENGTH_COL = 9;

const ListItem = () => {
  const product = useProduct();
  const dispatch = useProductDispatch();
  const [page, setPage] = useState<number>(1);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const handleSort = (
    sortBy: "price_asc" | "price_desc" | "rating_asc" | "rating_desc"
  ) => {
    if (dispatch) {
      dispatch({
        type: "SORT_PRODUCT",
        sortBy,
      });
    }
  };

  if (!product) {
    return (
      <div className="w-full flex items-center justify-center min-h-[400px]">
        <div className="loading loading-spinner loading-lg"></div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="mb-5 flex justify-between items-center gap-5">
        <div className="flex items-center gap-4">
          <div className="flex gap-2">
            <button
              className={`p-2 rounded-lg ${
                viewMode === "grid" ? "bg-primary text-white" : "bg-gray-100"
              }`}
              onClick={() => setViewMode("grid")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
            </button>
            <button
              className={`p-2 rounded-lg ${
                viewMode === "list" ? "bg-primary text-white" : "bg-gray-100"
              }`}
              onClick={() => setViewMode("list")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
          <div className="badge badge-ghost badge-lg font-semibold">
            {product.length} Products
          </div>
        </div>
        <div className="flex gap-4">
          <select
            className="select select-bordered w-full max-w-xs"
            onChange={(e) => handleSort(e.target.value as any)}
          >
            <option value="">Sort by</option>
            <option value="price_asc">Price: Low to High</option>
            <option value="price_desc">Price: High to Low</option>
            <option value="rating_asc">Rating: Low to High</option>
            <option value="rating_desc">Rating: High to Low</option>
          </select>
        </div>
      </div>

      <div
        className={`${
          viewMode === "grid"
            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            : "flex flex-col gap-4"
        }`}
      >
        {product.map((item: any, index: number) => {
          if (
            index >= MAX_LENGTH_COL * (page - 1) &&
            index < MAX_LENGTH_COL * page
          ) {
            return (
              <div
                key={item._id}
                className={
                  viewMode === "list"
                    ? "flex gap-4 bg-white p-4 rounded-lg shadow-sm"
                    : ""
                }
              >
                <ItemCard key={item._id} product={item} viewMode={viewMode} />
              </div>
            );
          } else {
            return null;
          }
        })}
      </div>
      <PaginationControl
        totalItems={product.length}
        currentPage={page}
        setPage={setPage}
      />
    </div>
  );
};

export default ListItem;
