"use client";
import CartItemList from "@/components/cart/CartItemList";
import { useSession } from "next-auth/react";
import React, { Suspense } from "react";

const page = () => {
  const { data: session } = useSession();
  if (!session) return <>Loading...</>;
  return (
    <div className="flex justify-between  w-full p-5">
      {/* <FilterBar /> */}
      <Suspense fallback={<p>Loading feed...</p>}>
        <CartItemList id={session?.user?.id} />
      </Suspense>
    </div>
  );
};

export default page;
