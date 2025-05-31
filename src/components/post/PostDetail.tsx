"use client";

import CommentsList from "@/components/ui/feedback/CommentsList";
import OptionBar from "@/components/product/OptionBar";
import RecommendList from "@/components/product/RecommendList";
import ReviewsSection from "@/components/ui/feedback/ReviewsSection";
import ReviewsProvider from "@/providers/ReviewsProvider";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface PostDetailProps {
  product: any;
  businesses: any;
  productId: string;
}

const PostDetail = ({ product, businesses, productId }: PostDetailProps) => {
  return (
    <div className="flex justify-center">
      <div className=" max-w-[1400px] min-w-[800px]">
        <div className="flex justify-between my-10 gap-10 ">
          <div className="w-1/2 flex flex-col gap-4">
            <Image
              src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
              alt="Product"
              height={384}
              width={500}
              className="w-full h-96 object-cover rounded-lg"
            />
            <div className="w-full flex gap-4">
              <Image
                src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                alt="Product"
                width={500}
                height={64}
                className="w-full h-16 object-cover rounded-lg"
              />

              <Image
                src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                alt="Product"
                width={500}
                height={64}
                className="w-full h-16 object-cover rounded-lg"
              />
              <Image
                src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                alt="Product"
                width={500}
                height={64}
                className="w-full h-16 object-cover rounded-lg"
              />
              <Image
                src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                alt="Product"
                width={500}
                height={64}
                className="w-full h-16 object-cover rounded-lg"
              />
            </div>

            <div>
              <Link
                href={`/businesses/${businesses?._id}`}
                className="flex w-fit gap-3"
              >
                <Image
                  width={64}
                  height={64}
                  src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                  alt="Product"
                  className="w-16 h-16 object-cover rounded-full border-4 border-white"
                />
                <div className="mt-1">
                  <p className="text-lg font-medium ">{businesses?.name}</p>
                  <p className="text-sm font-medium ">{businesses?.category}</p>
                </div>
              </Link>
            </div>
          </div>
          <div className="w-1/2">
            <h1 className="text-4xl font-bold mb-2">{product?.name}</h1>
            <p className="text-gray-600 mb-4">{product?.category}</p>
            <p className="text-gray-600 mb-4">{product?.description}</p>
            <h2 className="text-3xl font-semibold mb-10">
              ${product?.price}.00
            </h2>

            <OptionBar product={product} />
          </div>
        </div>

        <div className="flex flex-col lg:flex-row justify-between my-10 gap-10 ">
          <div className="w-full">
            <ReviewsProvider productId={productId}>
              <CommentsList />
              <ReviewsSection />
            </ReviewsProvider>
          </div>

          <div className="w-full ">
            <RecommendList category={product?.category} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetail;
