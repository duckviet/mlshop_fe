"use client";

import OptionBar from "@/components/product/OptionBar";
import RecommendList from "@/components/product/RecommendList";
import CommentsList from "@/components/ui/feedback/CommentsList";
import ReviewsSection from "@/components/ui/feedback/ReviewsSection";
import ReviewsProvider from "@/providers/ReviewsProvider";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/interfaces/Product";

interface ProductDetailProps {
  product: Product;
  business: any; // Replace with proper business type
}

export default function ProductDetail({
  product,
  business,
}: ProductDetailProps) {
  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 my-10">
        {/* Left Column: Images and Business Info */}
        <div className="flex flex-col gap-6">
          {/* Main Image */}
          <div className="relative w-full h-96 rounded-xl overflow-hidden shadow-lg">
            <Image
              src={
                "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80"
              }
              alt={product.name}
              fill
              className="object-cover transition-transform duration-300 hover:scale-105"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </div>

          {/* Thumbnail Gallery */}
          <div className="grid grid-cols-4 gap-4">
            {/* {product.image?.slice(1, 5).map((img: string, index: number) => (
             */}
            {[
              "https://images.unsplash.com/photo-1572536147248-ac59a8abfa4b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8aGVhZHBob25lc3xlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80",
              "https://images.unsplash.com/photo-1583394838336-acd977736f90?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGhlYWRwaG9uZXN8ZW58MHx8MHx8fDA%3D&w=1000&q=80",
              "https://images.unsplash.com/photo-1599669454699-248893623440?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGhlYWRwaG9uZXN8ZW58MHx8MHx8fDA%3D&w=1000&q=80",
            ].map((img: string, index: number) => (
              <div
                key={index}
                className="relative w-full h-16 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                <Image
                  src={
                    img ||
                    "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                  }
                  alt={`${product.name} ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="25vw"
                />
              </div>
            ))}
          </div>

          {/* Business Info */}
          <Link
            href={`/businesses/${business?._id}`}
            className="flex items-center gap-4 p-4 bg-white  rounded-xl shadow-sm hover:bg-opacity-80 transition-colors"
          >
            <div className="relative w-16 h-16 rounded-full overflow-hidden border-4 border-white shadow-md">
              <Image
                src={
                  business?.image ||
                  "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                }
                alt={business?.name || "Business"}
                fill
                className="object-cover"
              />
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-800">
                {business?.name || "Unknown Business"}
              </p>
              <p className="text-sm text-gray-600">
                {String(business?.category) || "Category"}
              </p>
            </div>
          </Link>
        </div>

        {/* Right Column: Product Details */}
        <div className="flex flex-col gap-6">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
            {product.name}
          </h1>
          <p className="text-gray-600 text-sm uppercase tracking-wide">
            {String(product.category)}
          </p>
          <p className="text-gray-700 leading-relaxed">{product.description}</p>
          <h2 className="text-2xl md:text-3xl font-semibold text-teal-600">
            ${product.price.toFixed(2)}
          </h2>

          <div className="mt-4">
            <OptionBar product={product} />
          </div>
        </div>
      </div>

      {/* Reviews and Recommendations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 my-10">
        {/* Reviews Section */}
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Reviews</h3>
          <ReviewsProvider productId={product._id}>
            <CommentsList />
            <ReviewsSection />
          </ReviewsProvider>
        </div>

        {/* Recommended Products */}
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Recommended Products
          </h3>
          <RecommendList category={String(product.category)} />
        </div>
      </div>
    </div>
  );
}
