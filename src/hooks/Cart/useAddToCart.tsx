"use client";
import { post } from "@/utils/apiRequest";
import { cartEndpoint } from "@/services/axios/endpoints/cart.endpoint";
import { useCartDispatch } from "@/providers/CartProvider";
import { showErrorToast } from "@/utils/showToast";
import cartAction from "@/services/axios/actions/cart.action";

export const useAddToCart = () => {
  const dispatch = useCartDispatch();

  const addToCart = async (data: any) => {
    try {
      const response = await cartAction.addCart(data);
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
