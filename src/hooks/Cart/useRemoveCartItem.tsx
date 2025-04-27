"use client";
import { del } from "@/utils/apiRequest";
import { cartEndpoint } from "@/services/axios/endpoints/cart.endpoint";
import { useCartDispatch } from "@/providers/CartProvider";
import { showErrorToast } from "@/utils/showToast";

export const useRemoveCartItem = () => {
  const dispatch = useCartDispatch();

  const removeCartItem = async (id: string) => {
    const url = `${process.env.NEXT_PUBLIC_SERVER}${cartEndpoint[
      "del-remove-cart-item"
    ](id)}`;

    try {
      const response = await del<any>(url);
      if (dispatch) {
        dispatch({
          type: "REMOVE_CART",
          id: id,
        });
      }
    } catch (error) {
      console.error("Error removing cart item:", error);
      showErrorToast("Failed to remove item from cart. Please try again.");
    }
  };

  return removeCartItem;
};
