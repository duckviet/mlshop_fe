"use client";
import React, { useCallback } from "react";
import { useReviewsDispatch } from "@/providers/ReviewsProvider";
import { reviewsEndpoint } from "@/services/axios/endpoints/reviews.endpoint";
import { useSession } from "next-auth/react";
import { Reviews } from "@/interfaces/Review";
import { showErrorToast } from "@/utils/showToast";
import { post } from "@/utils/apiRequest";
import { toast } from "react-toastify";
import reviewsAction from "@/services/axios/actions/reviews.action";

export const usePostReviews = () => {
  const dispatch = useReviewsDispatch();
  const { data: session } = useSession();

  return useCallback(
    async (reviewsableId: string, rating: number, content: string) => {
      if (!session?.user?.id) {
        showErrorToast("Please login to post a review");
        return;
      }
      const data = await toast.promise(
        reviewsAction.postReview({
          reviewsableId: reviewsableId,
          reviewsableType: "Product",
          customerId: session.user.id,
          rating: rating,
          content: content,
        }),
        {
          error: "Đã xảy ra lỗi",
        }
      );

      if (dispatch) {
        dispatch({
          type: "POST_A_REVIEWS",
          reviews: data as Reviews,
        });
      }
    },
    [dispatch, session?.user?.id]
  );
};
