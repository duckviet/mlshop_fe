import React, { Suspense } from "react";
import Comment from "./Comment";
import { useReviews } from "@/providers/ReviewsProvider";

const CommentsList = () => {
  const reviews = useReviews();

  return (
    <div className="w-full">
      <div className="flex justify-between items-center  mb-10 w-full">
        <div>
          <p className="font-semibold text-lg ">Reviews</p>
          <p className="font-light text-sm">Show 5 from 255 reviews</p>
        </div>
        <div className="flex gap-3 items-center border-2 border-solid rounded-lg p-1">
          <p className="text-sm">Lastest</p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-3 h-3"
            viewBox="0 0 131 181"
            fill="none"
          >
            <rect
              width="83.6327"
              height="16"
              rx="6.5"
              transform="matrix(-0.774368 -0.632735 0.774369 -0.632735 64.7627 180.041)"
              fill="#1E3050"
            />
            <rect
              width="83.6326"
              height="16"
              rx="6.5"
              transform="matrix(0.774368 -0.632735 0.774368 0.632735 53 169.917)"
              fill="#1E3050"
            />
            <rect
              width="83.6327"
              height="16"
              rx="6.5"
              transform="matrix(0.774368 0.632735 -0.774368 0.632735 65.3896 0)"
              fill="#1E3050"
            />
            <rect
              width="83.6326"
              height="16"
              rx="6.5"
              transform="matrix(-0.774368 0.632735 -0.774368 -0.632735 77.1523 10.124)"
              fill="#1E3050"
            />
          </svg>
        </div>
      </div>

      <div>
        {reviews?.map((cm: any, index: any) => (
          <Comment key={index} {...cm} />
        ))}
      </div>
    </div>
  );
};

export default CommentsList;
