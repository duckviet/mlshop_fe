"use client";
import { post } from "@/utils/apiRequest";
import { cartEndpoint } from "@/services/axios/endpoints/cart.endpoint";
import { useCartDispatch } from "@/providers/CartProvider";
import { showErrorToast } from "@/utils/showToast";

export const useAddToCart = () => {
  const dispatch = useCartDispatch();

  const addToCart = async (productId: string, quantity: number) => {
    const url = `${process.env.NEXT_PUBLIC_SERVER}${cartEndpoint.create}`;

    try {
      const response = await post<any>(url, {
        productId,
        quantity,
      });

      if (dispatch) {
        dispatch({
          type: "ADDTO_CART",
          cart: response.data,
        });
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      showErrorToast("Failed to add item to cart. Please try again.");
    }
  };

  return addToCart;
};
