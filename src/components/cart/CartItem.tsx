"use client";

import { useRemoveCartItem } from "@/hooks/Cart/useRemoveCartItem";
import useApi from "@/hooks/useApi";
import { Cart } from "@/interfaces/Cart";
import { productEndpoint } from "@/services/axios/endpoints/product.endpoint";
import { showErrorToast, showSuccessToast } from "@/utils/showToast";
import Link from "next/link";
import React, { useState } from "react";
import CheckOutModal from "./CheckOutModal";
import Image from "next/image";

const CartItem: React.FC<{ cart: Cart }> = ({ cart }) => {
  const { data, loading, error, refetch } = useApi<any>(
    `${process.env.NEXT_PUBLIC_SERVER}${productEndpoint["get-by-id"](
      cart.productId
    )}`,
    "GET"
  );
  const removeCartItem = useRemoveCartItem();

  const handleRemove = async () => {
    await removeCartItem(cart._id);
    showSuccessToast("Remove succsessful");
  };

  const handleCheckOut = () => {};
  const [checkoutModal, setCheckOutModal] = useState<boolean>(false);
  return (
    <div
      key={cart._id}
      className="flex justify-between items-center p-4 bg-white border border-gray-200 rounded-lg shadow-sm"
    >
      <div className="w-1/2">
        <div className="flex w-full h-full gap-5">
          <Image
            src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
            alt="Product"
            width={500}
            height={96}
            className="w-full max-w-[100px] h-24 object-cover  rounded-md"
          />
          <div className="flex flex-col justify-between">
            <Link href={`/Detail/${data?._id}`}>
              <h4 className="text-lg font-semibold text-gray-700">
                {data?.name}
              </h4>
              <h4 className="text-sm font-light text-gray-700">
                {data?.category}
              </h4>
            </Link>

            <Link
              href={`/businesses/${data?.businessesId}`}
              className="font-light text-xs"
            >
              by{" "}
              <h4 className="font-sm text-sm hover:underline hover:cursor-pointer">
                {data?.businessesId}
              </h4>
            </Link>
          </div>
        </div>
      </div>

      <div className="flex justify-between w-1/2 items-center">
        <div className="text-sm text-gray-500  flex flex-col gap-2 justify-between">
          <p>
            Size:{" "}
            <div className="badge badge-outline   font-semibold">
              {cart.size || "N/A"}
            </div>
            {/* <span className="font-semibold">{cart.size || "N/A"}</span> */}
          </p>
          <p>
            Color:{" "}
            <div className="badge badge-outline   font-semibold">
              {cart.color || "N/A"}
            </div>
            {/* <span className="font-semibold">{cart.color || "N/A"}</span> */}
          </p>
          <p>
            Material:{" "}
            <div className="badge badge-outline   font-semibold">
              {cart.material || "N/A"}
            </div>
            {/* <span className="font-semibold">{cart.material || "N/A"}</span> */}
          </p>
        </div>

        <div className="text-right">
          <p className="text-lg font-semibold text-gray-700">
            ${Number(cart.price).toFixed(2)}
          </p>
          <p className="text-sm text-gray-500">Quantity: {cart.quantity}</p>
        </div>
        <div className="flex flex-col gap-4">
          <button
            onClick={() => setCheckOutModal(!checkoutModal)}
            className="btn btn-sm bg-white ml-4 text-black border-green-500 hover:bg-green-500 hover:text-white transition"
          >
            Checkout
          </button>
          <button
            onClick={handleRemove}
            className="btn btn-sm bg-white ml-4 text-black border-red-500 hover:bg-red-500 hover:text-white transition"
          >
            Remove
          </button>
        </div>
      </div>
      {checkoutModal && (
        <CheckOutModal
          isOpen={checkoutModal}
          cart={cart}
          onClose={() => setCheckOutModal(!checkoutModal)}
        />
      )}
    </div>
  );
};

export default CartItem;
