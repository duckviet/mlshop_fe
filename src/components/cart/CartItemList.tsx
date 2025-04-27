"use client";

import React from "react";
import CartItem from "./CartItem";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { Cart } from "@/interfaces/Cart";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";
import cartAction from "@/services/axios/actions/cart.action";

type Props = {
  id: string;
};

const CartItemList: React.FC<Props> = ({ id }: Props) => {
  const { data: carts } = useQuery({
    queryKey: ["get-carts", id],
    queryFn: async () =>
      toast.promise(cartAction.getByCustomerId(id || ""), {
        error: "Đã có lỗi xảy ra",
      }),
    refetchOnWindowFocus: false,
    retry: false,
  });

  const totalPrice = carts?.reduce(
    (total: number, c: Cart) => total + Number(c.price) * c.quantity,
    0
  );

  const fetchCart = async (page: number): Promise<Cart[]> => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return carts?.slice((page - 1) * 4, page * 4);
  };

  const { data, fetchNextPage, isFetchingNextPage, hasNextPage } =
    useInfiniteQuery({
      queryKey: ["cart"],
      queryFn: ({ pageParam = 1 }) => fetchCart(pageParam),
      getNextPageParam: (lastPage, allPages) => {
        const loadedItems = allPages.flat().length;
        return loadedItems < carts?.length ? allPages.length + 1 : null;
      },
      initialPageParam: 1,
      enabled: carts?.length > 0,
    });

  return (
    <div className="flex flex-col w-full max-w-4xl mx-auto">
      <div className="flex justify-between items-center w-full mb-6">
        <h2 className="text-3xl font-bold text-gray-800">Shopping Cart</h2>
        <button className="btn btn-primary text-lg font-semibold">
          Total: ${totalPrice}
        </button>
      </div>
      <div className="space-y-4">
        {data?.pages.map((page, pageIndex) => (
          <React.Fragment key={pageIndex}>
            {page.map((c: Cart) => (
              <CartItem key={c._id} cart={c} />
            ))}
          </React.Fragment>
        ))}
        {hasNextPage && (
          <button
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
            className="btn btn-ghost w-full"
          >
            {isFetchingNextPage ? "Loading more..." : "Load more"}
          </button>
        )}
      </div>
    </div>
  );
};

export default CartItemList;
