"use client";
import { useEffect, useRef, useCallback, useState } from "react";
import { useInfiniteQuery, InfiniteData, QueryKey } from "@tanstack/react-query";
import ItemCard from "@/components/product/ItemCard";
import { Product } from "@/interfaces/Product";
import productAction from "@/services/axios/actions/product.endpoint";

// Giả sử số lượng item mỗi lần fetch (limit)
const ITEMS_PER_PAGE = 9;
const AUTO_LOADS_PER_CYCLE = 3; // Mỗi chu kỳ có 3 lần load tự động

// Giả sử cấu trúc response từ productAction.getByPagination
interface PaginatedProductsResponse {
  data: Product[];
  meta: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
  };
}

export default function ProductsPage() {
  const [autoLoadCount, setAutoLoadCount] = useState(0); // Đếm số lần load tự động trong chu kỳ hiện tại
  const [cycleCount, setCycleCount] = useState(0); // Đếm số chu kỳ đã hoàn thành

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isFetchingNextPage,
    isError,
    error,
  } = useInfiniteQuery<PaginatedProductsResponse, Error, InfiniteData<PaginatedProductsResponse, number>, QueryKey, number>({
    queryKey: ["products-paginated"],
    queryFn: ({ pageParam = 1 }) =>
      productAction.getByPagination(pageParam, ITEMS_PER_PAGE),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const currentPage = lastPage.meta.currentPage;
      const totalPages = lastPage.meta.totalPages;
      if (currentPage < totalPages) {
        return currentPage + 1;
      }
      return undefined;
    },
  });

  // Sử dụng Intersection Observer để trigger fetchNextPage
  const observer = useRef<IntersectionObserver>();
  const lastElementRef = useCallback(
    (node: HTMLDivElement | null) => {
      // Dừng observer nếu đang load, đang fetch, hoặc đã đủ 3 lần load trong chu kỳ
      if (isLoading || isFetchingNextPage || autoLoadCount >= AUTO_LOADS_PER_CYCLE) return;
      if (observer.current) observer.current.disconnect(); // Ngắt observer cũ

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          setTimeout(() => {
            fetchNextPage();
            setAutoLoadCount((prev) => prev + 1); // Tăng số lần load tự động
          }, 500);
        }
      });

      if (node) observer.current.observe(node); // Theo dõi phần tử cuối cùng mới
    },
    [isLoading, isFetchingNextPage, hasNextPage, fetchNextPage, autoLoadCount]
  );

  // Xử lý trạng thái loading và error
  if (isLoading) {
    return (
      <div className="w-full flex items-center justify-center py-8">
        <div className="loading loading-spinner loading-lg"></div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="container mx-auto px-4 py-8 text-center text-red-500">
        <p>Error loading products: {error?.message || "Unknown error"}</p>
      </div>
    );
  }

  // Gom data từ tất cả các trang đã fetch
  const allProducts = data?.pages.flatMap((page) => page.data) ?? [];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {allProducts.map((product, index) => {
          // Nếu là phần tử cuối cùng và chưa đủ 3 lần load, gán ref cho Intersection Observer
          if (allProducts.length === index + 1 && autoLoadCount < AUTO_LOADS_PER_CYCLE) {
            return (
              <div ref={lastElementRef} key={product._id}>
                <ItemCard product={product} viewMode="grid" />
              </div>
            );
          } else {
            return (
              <ItemCard
                key={product._id}
                product={product}
                viewMode="grid"
              />
            );
          }
        })}
      </div>

      {/* Hiển thị loading indicator khi đang fetch trang tiếp theo */}
      {isFetchingNextPage && (
        <div className="w-full flex items-center justify-center py-8">
          <div className="loading loading-spinner loading-md"></div>
        </div>
      )}

      {/* Nút "Load More" khi đã load đủ 3 lần trong chu kỳ và còn trang để fetch */}
      {!isFetchingNextPage && autoLoadCount >= AUTO_LOADS_PER_CYCLE && hasNextPage && (
        <div className="w-full flex justify-center py-8">
          <button
            onClick={() => {
              fetchNextPage();
              setAutoLoadCount(0); // Reset autoLoadCount để bắt đầu chu kỳ mới
              setCycleCount((prev) => prev + 1); // Tăng số chu kỳ
            }}
            className="btn btn-primary"
            disabled={isFetchingNextPage}
          >
            Load More
          </button>
        </div>
      )}

      {/* Thông báo khi không còn sản phẩm nào nữa */}
      {!hasNextPage && !isFetchingNextPage && allProducts.length > 0 && (
        <p className="text-center my-4 text-gray-500">
          No more products to load.
        </p>
      )}

      {/* Trường hợp không có sản phẩm nào ngay từ đầu */}
      {!hasNextPage && !isFetchingNextPage && allProducts.length === 0 && (
        <p className="text-center my-4 text-gray-500">
          No products found.
        </p>
      )}
    </div>
  );
}