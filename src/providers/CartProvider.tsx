// Updated CartProvider.tsx
"use client";
import React, { createContext, useContext, useReducer, useEffect } from "react";
import useApi from "@/hooks/useApi";
import { cartEndpoint } from "@/services/axios/endpoints/cart.endpoint";
import { useSession } from "next-auth/react";
import { Cart } from "@/interfaces/Cart";

type CartAction =
  | { type: "GET_CART"; cart: Cart[] }
  | { type: "ADDTO_CART"; cart: Cart }
  | { type: "REMOVE_CART"; id: string };

const CartContext = createContext<Cart[] | undefined>(undefined);
const CartDispatchContext = createContext<
  React.Dispatch<CartAction> | undefined
>(undefined);

const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { data: session } = useSession();
  const url = `${process.env.NEXT_PUBLIC_SERVER}${cartEndpoint[
    "get-by-customerId"
  ](`${session?.user.id}`)}`;
  const { data } = useApi<Cart[]>(url, "GET");

  const [state, dispatch] = useReducer(cartReducer, []);

  useEffect(() => {
    if (data) {
      dispatch({ type: "GET_CART", cart: data });
    }
  }, [data]);

  return (
    <CartContext.Provider value={state}>
      <CartDispatchContext.Provider value={dispatch}>
        {children}
      </CartDispatchContext.Provider>
    </CartContext.Provider>
  );
};

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    // throw new Error("useCart must be used within a CartProvider");
    return null;
  }
  return context;
}

export function useCartDispatch() {
  const context = useContext(CartDispatchContext);
  if (context === undefined) {
    return null;
    // throw new Error("useCartDispatch must be used within a CartProvider");
  }
  return context;
}

const cartReducer = (state: Cart[], action: CartAction): Cart[] => {
  switch (action.type) {
    case "GET_CART":
      return action.cart;
    case "ADDTO_CART":
      return [...state, action.cart];
    case "REMOVE_CART":
      return state.filter((s) => s._id !== action.id);
    default:
      throw new Error(`Unhandled action type`);
  }
};

export default CartProvider;
