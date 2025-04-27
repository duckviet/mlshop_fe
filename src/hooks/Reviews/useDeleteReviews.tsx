"use client";
import { useCallback } from "react";
import { toast } from "react-toastify";
import { useReviewsDispatch } from "@/providers/ReviewsProvider";
import reviewsAction from "@/services/axios/actions/reviews.action";

export const useDeleteReviews = () => {
  const dispatch = useReviewsDispatch();

  const deleteReview = useCallback(
    async (id: string): Promise<void> => {
      if (!dispatch) return;

      // chain the dispatch into the promise so toast.promise only sees a Promise<void>
      const p = reviewsAction.deleteReview(id).then(() => {
        dispatch({ type: "DELETE_MY_REVIEWS", id });
      });

      await toast.promise(p, {
        pending: "Đang xóa bình luận...",
        success: "Xóa bình luận thành công",
        error: "Đã xảy ra lỗi, xin thử lại sau",
      });
    },
    [dispatch]
  );

  return deleteReview;
};
