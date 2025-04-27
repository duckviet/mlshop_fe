// /Wishlist/page.tsx
"use client";
import WishListWrapper from "@/components/ui/common/WishListWrapper";
import React, { Suspense } from "react";

const page = () => {
  return (
    <div className="flex justify-between gap-5 w-full mt-5">
      <Suspense fallback={<p>Loading feed...</p>}>
        <WishListWrapper />
      </Suspense>
    </div>
  );
};

export default page;
