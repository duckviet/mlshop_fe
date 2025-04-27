"use client";
import { useSetWishList } from "@/providers/CustomerProvider";
import { put } from "@/utils/apiRequest";
import { customersEndpoint } from "@/services/axios/endpoints/customer.endpoint";
import { showSuccessToast, showErrorToast } from "@/utils/showToast";
import customerAction from "@/services/axios/actions/customer.action";

export const useToggleWishList = () => {
  const setWishList = useSetWishList();

  const toggleWishList = async (productId: string, customerId: string) => {
    try {
      const response: any = customerAction.toggleWishlist({
        productId,
        customerId,
      });

      if (response) {
        setWishList(response?.wishList);
        showSuccessToast(
          response?.wishList.includes(productId)
            ? "Added to wishlist"
            : "Removed from wishlist"
        );
      }
    } catch (error) {
      console.error("Error toggling wishlist:", error);
      showErrorToast("Failed to update wishlist");
    }
  };

  return toggleWishList;
};
