"use client";
import { useToggleWishList } from "@/hooks/useToggleWishList";
import { Product } from "@/interfaces/Product";
import {
  useCustomerWishList,
  useSetWishList,
} from "@/providers/CustomerProvider";
import Link from "next/link";
import React, { useState } from "react";
import CartOptionsModal from "@/components/cart/CartOptionsModal";
import { useSession } from "next-auth/react";
import { showErrorToast, showSuccessToast } from "@/utils/showToast";
import Image from "next/image";
import customerAction from "@/services/axios/actions/customer.action";
import { cn } from "@/lib/utils";

interface ItemCardProps {
  product: Product;
  viewMode?: "grid" | "list";
}

const ItemCard = ({ product, viewMode = "grid" }: ItemCardProps) => {
  const { data: session } = useSession();
  const wishList = useCustomerWishList();
  const setWishList = useSetWishList();

  const [modal, setModal] = useState<boolean>(false);

  const handleAddToCart = () => {
    if (session) setModal(!modal);
    else showErrorToast("You must login first to add to cart");
  };

  const handleToggleWishList = async (id: string) => {
    if (!session || !session.user) {
      showErrorToast("You must login first to use wish list");
      return;
    }
    try {
      const response: any = await customerAction.toggleWishlist({
        productId: id,
        customerId: session?.user.id,
      });

      setWishList(response?.wishList);
      showSuccessToast(
        response?.wishList.includes(id)
          ? "Added to wishlist"
          : "Removed from wishlist"
      );
    } catch (error) {
      console.error("Error toggling wishlist:", error);
      showErrorToast("Failed to update wishlist");
    }
  };

  const isInWishlist = wishList?.includes(product._id);

  if (viewMode === "list") {
    return (
      <div className="flex gap-6 w-full">
        <div className="relative w-48 h-48 flex-shrink-0">
          <Image
            src={
              // product.image[0] 
              "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"

            }
            alt={product.name}
            fill
            className="object-cover rounded-lg"
          />
          <button
            onClick={() => {
              handleToggleWishList(product._id);
            }}
            className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill={isInWishlist ? "currentColor" : "none"}
              stroke="currentColor"
              className="w-6 h-6 text-red-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </button>
        </div>
        <div className="flex-1">
          <Link href={`/product/${product._id}`}>
            <h3 className="text-xl font-semibold hover:text-primary transition-colors">
              {product.name}
            </h3>
          </Link>
          {/* <p className="text-gray-600 mt-2">{String(product.category)}</p> */}
          <p className="text-gray-500 mt-2 line-clamp-2">
            {product.description}
          </p>
          <div className="mt-4 flex items-center justify-between">
            <span className="text-2xl font-bold">${product.price}</span>
            <button
              onClick={handleAddToCart}
              className="btn btn-sm text-white bg-primary"
            >
              Add to Cart
            </button>
          </div>
        </div>
        {modal && (
          <CartOptionsModal
            product={product}
            modal={modal}
            setModal={setModal}
          />
        )}
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow group relative ">
      <div className="relative">
        <Link href={`/product/${product._id}`}>
          <div className="relative h-48">
            <Image
              src={
                // product.image[0] ||
                "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
              }
              alt={product.name}
              fill
              className="object-cover rounded-t-lg"
            />
          </div>
        </Link>

        <button
          onClick={() => handleToggleWishList(product._id)}
          className={cn(
            "absolute top-2 right-2 p-2 bg-white rounded-full shadow-md transition-colors opacity-0 group-hover:opacity-100 hover:bg-gray-100",
            isInWishlist && "opacity-100"
          )}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill={isInWishlist ? "currentColor" : "none"}
            stroke="currentColor"
            className="w-6 h-6 text-red-500"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
        </button>
      </div>
      <div className="p-4">
        <Link href={`/product/${product._id}`}>
          <h3 className="text-lg font-semibold hover:text-primary transition-colors">
            {product.name}
          </h3>
        </Link>
        {/* <p className="text-gray-600 mt-1">{String(product.category)}</p> */}
        <p className="text-gray-500 mt-2 line-clamp-2">{product.description}</p>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-xl font-bold">${product.price}</span>
          <button
            onClick={handleAddToCart}
            className="btn btn-sm text-white bg-primary"
          >
            Add to Cart
          </button>
        </div>
      </div>
      {modal && (
        <CartOptionsModal product={product} modal={modal} setModal={setModal} />
      )}
    </div>
  );
};

export default ItemCard;
