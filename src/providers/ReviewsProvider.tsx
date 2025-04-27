// ReviewsProvider.tsx
"use client";

import React, { createContext, useContext, useReducer, useEffect } from "react";
import useApi from "@/hooks/useApi";
import { reviewsEndpoint } from "@/services/axios/endpoints/reviews.endpoint";
import { Reviews } from "@/interfaces/Review";
import { useQuery } from "@tanstack/react-query";
import reviewsAction from "@/services/axios/actions/reviews.action";

const ReviewsContext = createContext<Reviews[] | null>(null);
const ReviewsDispatchContext =
  createContext<React.Dispatch<ReviewsAction> | null>(null);

type ReviewsProviderProps = {
  children: React.ReactNode;
  productId: string;
};

const ReviewsProvider = ({ children, productId }: ReviewsProviderProps) => {
  const { data } = useQuery({
    queryKey: ["get-reviews-by-product-id", productId],
    queryFn: () => reviewsAction.getByProductId(productId),
    refetchOnWindowFocus: true,
    retry: false,
  });
  const [state, dispatch] = useReducer(ReviewsReducer, []);

  useEffect(() => {
    if (data) {
      dispatch({ type: "GET_REVIEWS", Reviews: data });
    }
  }, [data]);

  return (
    <div>
      <ReviewsContext.Provider value={state}>
        <ReviewsDispatchContext.Provider value={dispatch}>
          {children}
        </ReviewsDispatchContext.Provider>
      </ReviewsContext.Provider>
    </div>
  );
};

export function useReviews() {
  const context = useContext(ReviewsContext);
  if (context === null) {
    console.log("useReviews must be used within a ReviewsProvider");
  }
  return context;
}

export function useReviewsDispatch() {
  const context = useContext(ReviewsDispatchContext);
  if (context === null) {
    console.log("useReviewsDispatch must be used within a ReviewsProvider");
  }
  return context;
}

const ReviewsReducer = (
  state: Reviews[] | null,
  action: ReviewsAction
): Reviews[] | null => {
  switch (action.type) {
    case "GET_REVIEWS":
      return action.Reviews;
    case "DELETE_MY_REVIEWS":
      if (state) return state.filter((rvs) => rvs._id !== action.id);
      return state;
    case "POST_A_REVIEWS":
      if (state) return [...state, action.reviews];
      return state;
    default:
      throw new Error(`Unhandled action type: `);
  }
};

type ReviewsAction =
  | { type: "GET_REVIEWS"; Reviews: Reviews[] }
  | { type: "DELETE_MY_REVIEWS"; id: string }
  | { type: "POST_A_REVIEWS"; reviews: Reviews };

export default ReviewsProvider;
