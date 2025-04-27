"use client";
import { useDeleteReviews } from "@/hooks/Reviews/useDeleteReviews";
import { usePostReviews } from "@/hooks/Reviews/usePostReviews";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useState } from "react";

const ReviewsSection = () => {
  const { id } = useParams();

  const [rating, setRating] = useState(3.5);
  const [ratingText, setRatingText] = useState("");
  const postReviews = usePostReviews();

  const handleRating = () => {
    postReviews(id as string, rating, ratingText);
    setRating(3.5);
    setRatingText("");
  };

  return (
    <div className="flex gap-4 items-center">
      <div className="min-w-14">
        <Image
          src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
          alt="Customer Avatar"
          width={56}
          height={56}
          className="w-14 h-14 rounded-full object-cover"
        />
      </div>
      <div className="flex flex-col gap-1 w-full">
        <div className="rating rating-sm rating-half">
          {[...Array(5)].map((_, i) => (
            <React.Fragment key={i}>
              <input
                type="radio"
                name="rating"
                value={i + 0.5}
                className="mask mask-star-2 mask-half-1"
                checked={rating === i + 0.5}
                onChange={(e: any) => setRating(Number(e.target.value))}
              />
              <input
                type="radio"
                name="rating"
                value={i + 1}
                className="mask mask-star-2 mask-half-2"
                checked={rating === i + 1}
                onChange={(e: any) => setRating(Number(e.target.value))}
              />
            </React.Fragment>
          ))}
        </div>
        <input
          type="text"
          className="border border-solid bg-base-100 w-full rounded-md p-2"
          placeholder="Leave a reviews"
          value={ratingText}
          onChange={(e: any) => setRatingText(e.target.value)}
        />
      </div>
      <button onClick={handleRating} className=" mt-2 pt-3">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          className="w-7 h-7"
        >
          <path d="M498.1 5.6c10.1 7 15.4 19.1 13.5 31.2l-64 416c-1.5 9.7-7.4 18.2-16 23s-18.9 5.4-28 1.6L284 427.7l-68.5 74.1c-8.9 9.7-22.9 12.9-35.2 8.1S160 493.2 160 480v-83.6c0-4 1.5-7.8 4.2-10.8L331.8 202.8c5.8-6.3 5.6-16-.4-22s-15.7-6.4-22-.7L106 360.8 17.7 316.6C7.1 311.3 .3 300.7 0 288.9s5.9-22.8 16.1-28.7l448-256c10.7-6.1 23.9-5.5 34 1.4z" />
        </svg>
      </button>
    </div>
  );
};

export default ReviewsSection;
