// CustomerProvider.tsx
"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import customerAction from "@/services/axios/actions/customer.action";

interface CustomerContextType {
  wishList: string[];
  setWishList: (wishList: string[]) => void;
  isLoading: boolean;
}

const CustomerContext = createContext<CustomerContextType | undefined>(
  undefined
);

export const useCustomerWishList = () => {
  const context = useContext(CustomerContext);
  if (!context) {
    throw new Error(
      "useCustomerWishList must be used within a CustomerProvider"
    );
  }
  return context.wishList;
};

export const useSetWishList = () => {
  const context = useContext(CustomerContext);
  if (!context) {
    throw new Error("useSetWishList must be used within a CustomerProvider");
  }
  return context.setWishList;
};

export const useCustomerLoading = () => {
  const context = useContext(CustomerContext);
  if (!context) {
    throw new Error(
      "useCustomerLoading must be used within a CustomerProvider"
    );
  }
  return context.isLoading;
};

const CustomerProvider = ({ children }: { children: React.ReactNode }) => {
  const { data: session } = useSession();
  console.log(session);
  const [wishList, setWishList] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCustomerData = async () => {
      if (!session?.user?.id) {
        setIsLoading(false);
        return;
      }

      try {
        const response = await customerAction.getMe(session.user.token);
        console.log(response);
        if (response) {
          setWishList(response.wishList || []);
        }
      } catch (error) {
        console.error("Error fetching customer data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCustomerData();
  }, [session?.user?.id]);

  const value = {
    wishList,
    setWishList,
    isLoading,
  };

  return (
    <CustomerContext.Provider value={value}>
      {children}
    </CustomerContext.Provider>
  );
};

export default CustomerProvider;
