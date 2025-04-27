// ProductProvider.tsx
"use client";
import { Product } from "@/interfaces/Product";
import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useState,
} from "react";
import useApi from "@/hooks/useApi";
import { productEndpoint } from "@/services/axios/endpoints/product.endpoint";

const ProductContext = createContext<Product[] | null>(null);
const OriginalProductContext = createContext<Product[] | null>(null);

const ProductDispatchContext =
  createContext<React.Dispatch<ProductAction> | null>(null);

type ProductProviderProps = {
  children: React.ReactNode;
  initialProducts: Product[];
};

const ProductProvider = ({
  children,
  initialProducts,
}: ProductProviderProps) => {
  const [state, dispatch] = useReducer(productReducer, initialProducts);

  // Only fetch if we don't have initial products
  const url = `${process.env.NEXT_PUBLIC_SERVER}${productEndpoint["get-all"]}`;
  const { data, loading, error, refetch } = useApi<any>(url, "GET");

  useEffect(() => {
    if (data && !initialProducts.length) {
      dispatch({ type: "GET_PRODUCT", Product: data });
    }
  }, [data, initialProducts.length]);

  return (
    <OriginalProductContext.Provider
      value={initialProducts.length ? initialProducts : data}
    >
      <ProductContext.Provider value={state}>
        <ProductDispatchContext.Provider value={dispatch}>
          {children}
        </ProductDispatchContext.Provider>
      </ProductContext.Provider>
    </OriginalProductContext.Provider>
  );
};

export function useProduct() {
  const context = useContext(ProductContext);
  if (context === null) {
    console.log("useProduct must be used within a ProductProvider");
  }
  return context;
}

export function useProductDispatch() {
  const context = useContext(ProductDispatchContext);
  if (context === null) {
    console.log("useProductDispatch must be used within a ProductProvider");
  }
  return context;
}

export function useOriginalProduct() {
  const context = useContext(OriginalProductContext);
  if (context === null) {
    console.log("useProduct must be used within a ProductProvider");
  }
  return context;
}

const productReducer = (
  state: Product[] | null,
  action: ProductAction
): Product[] | null => {
  switch (action.type) {
    case "GET_PRODUCT":
      return action.Product;

    case "ADDTO_PRODUCT":
      return state ? [...state, action.Product] : [action.Product];

    case "REMOVE_PRODUCT":
      return state ? state.filter((s) => s._id !== action.id) : null;
    case "FILTER_PRODUCT":
      return action.origin.filter((product: Product) => {
        const matchesCategory = product._id
          .toLowerCase()
          .includes(action.searchQuery.category.toLowerCase());
        const matchesName = product.name
          .toLowerCase()
          .includes(action.searchQuery.name.toLowerCase());

        const matchesPrice =
          product.price >= action.searchQuery.priceRange.minPrice &&
          product.price <= action.searchQuery.priceRange.maxPrice;

        return matchesCategory && matchesName && matchesPrice;
      });
    case "SORT_PRODUCT":
      if (state) {
        const sortedProducts = [...state];
        switch (action.sortBy) {
          case "price_asc":
            sortedProducts.sort((a, b) => a.price - b.price);
            break;
          case "price_desc":
            sortedProducts.sort((a, b) => b.price - a.price);
            break;
          // case "rating_asc":
          //   sortedProducts.sort((a, b) => (a.rating || 0) - (b.rating || 0));
          //   break;
          // case "rating_desc":
          //   sortedProducts.sort((a, b) => (b.rating || 0) - (a.rating || 0));
          //   break;
          default:
            throw new Error(`Unhandled sort type: ${action.sortBy}`);
        }
        return sortedProducts;
      }
      return state;
    default:
      throw new Error(`Unhandled action type: `);
  }
};

type ProductAction =
  | { type: "GET_PRODUCT"; Product: Product[] }
  | { type: "ADDTO_PRODUCT"; Product: Product }
  | {
      type: "FILTER_PRODUCT";
      origin: Product[];
      searchQuery: {
        category: string;
        name: string;
        country: string;
        priceRange: { minPrice: number; maxPrice: number };
      };
    }
  | {
      type: "SORT_PRODUCT";
      sortBy: "price_asc" | "price_desc" | "rating_asc" | "rating_desc";
    }
  | { type: "REMOVE_PRODUCT"; id: string };

export default ProductProvider;
