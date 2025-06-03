// RecommendList.tsx

import React, { useState } from "react";
import RecommendItem from "./RecommendItem";
import { useQuery } from "@tanstack/react-query";
import productAction from "@/services/axios/actions/product.endpoint";
import { getCurrentEvents } from "@/utils/eventTracking";
import axios from "axios";
import { EVENT_TYPES, trackEvent } from "@/utils/eventTracking";

type Props = {
  category?: string;
};

const RecommendList: React.FC<Props> = ({ category }) => {
  const [displayCount, setDisplayCount] = useState(5);

  const { data, isLoading, error } = useQuery({
    queryKey: ["get-by-category", category],
    queryFn: async () => {
      if (!category) return [];
      const response = await productAction.getByCategory(category);
      return response;
    },
    retry: false,
    refetchOnWindowFocus: false,
  });
  const sessionData = getCurrentEvents();
  useQuery({
    queryKey: ["get-recommendations", sessionData],
    queryFn: async () => {
      await axios.post(
        "http://192.168.28.39:8000/recommendations",
        {
          session_id: Number(sessionData.session_id),
          current_events: sessionData.current_events.map((e) => ({
            ...e,
            aid: Math.floor(Math.random() * (20000 - 10000 + 1)) + 10000,
          })),
          top_k: 5,
        },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
    },
  });

  const handleLoadMore = () => {
    setDisplayCount((prev) => prev + 4);
  };

  if (isLoading) {
    return <div>Loading recommendations...</div>;
  }

  if (error) {
    return <div>Error loading recommendations.</div>;
  }

  const displayedItems = data?.slice(0, displayCount) || [];

  return (
    <div className="w-full">
      <div className="grid grid-cols-2 gap-6">
        {displayedItems.map((item: any, index: number) => (
          <div
            key={item._id}
            className="w-full flex justify-center animate-fadeIn"
            style={{
              animationDelay: `${index * 0.1}s`,
              opacity: 0,
              animation: "fadeIn 0.5s ease-out forwards",
            }}
          >
            <RecommendItem product={item} />
          </div>
        ))}
        {data && displayCount < data.length && (
          <div className="h-full flex justify-center flex-col">
            <button
              onClick={handleLoadMore}
              className="px-6 py-2 bg-gray-300 h-full text-white rounded-lg hover:bg-gray-700 transition-all duration-300 transform hover:scale-105"
            >
              Xem thêm
            </button>
          </div>
        )}
      </div>
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default RecommendList;
