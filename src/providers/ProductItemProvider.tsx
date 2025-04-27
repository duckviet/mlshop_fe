"use client";
import { Product } from "@/interfaces/Product";
import React, {
  createContext,
  useContext,
  ReactNode,
  useReducer,
  ReactElement,
} from "react";

import { productEndpoint } from "@/services/axios/endpoints/product.endpoint";

const ProductItemContext = createContext<Product | null>(null);
const ProductItemDispatchContext =
  createContext<React.Dispatch<ProductItemAction> | null>(null);

type ProductItemProviderProps = {
  children: ReactNode;
  Product: Product;
};

export const ProductItemProvider = ({
  children,
  Product,
}: ProductItemProviderProps): ReactElement => {
  const initialState: Product = Product;
  const [state, dispatch] = useReducer(ProductReducer, initialState);

  //   const url = `${process.env.NEXT_PUBLIC_SERVER}${productEndpoint["get-by-id"](id)}`;
  //   const { data: seats, refetch } = useApi<Product>(url, "GET");

  return (
    <ProductItemContext.Provider value={state}>
      <ProductItemDispatchContext.Provider value={dispatch}>
        {children}
      </ProductItemDispatchContext.Provider>
    </ProductItemContext.Provider>
  );
};

export function useProductItem() {
  const context = useContext(ProductItemContext);
  if (context === null) {
    throw new Error("useProductItem must be used within a ProductItemProvider");
  }
  return context;
}

export function useProductItemDispatch() {
  const context = useContext(ProductItemDispatchContext);
  if (context === null) {
    throw new Error(
      "useProductItemDispatch must be used within a ProductItemProvider"
    );
  }
  return context;
}

const ProductReducer = (state: Product, action: ProductItemAction): Product => {
  switch (action.type) {
    case "UPDATE_STATUS":
    case "UPDATE_DESCRIPTION":
    default:
      throw new Error(`Unhandled action type`);
  }
};

type ProductItemAction =
  | { type: "DELETE_Product"; id: string }
  | {
      type: "UPDATE_STATUS";
      status: string;
    }
  | {
      type: "UPDATE_DESCRIPTION";
      description: string;
    };
