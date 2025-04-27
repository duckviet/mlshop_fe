"use client";

import { Cart } from "@/interfaces/Cart";
import { Product } from "@/interfaces/Product";
import { useCartDispatch } from "@/providers/CartProvider";
import productAction from "@/services/axios/actions/product.endpoint";
import { ordersEndpoint } from "@/services/axios/endpoints/order.endpoint";
import { post } from "@/utils/apiRequest";
import { showErrorToast, showSuccessToast } from "@/utils/showToast";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { toast } from "react-toastify";

interface CheckOutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cart: Cart;
}

const CheckOutModal = ({ isOpen, onClose, cart }: CheckOutModalProps) => {
  const dispatch = useCartDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("credit_card");
  const [addressError, setAddressError] = useState(false);

  // Fetch product details using react-query
  const {
    data: product,
    isLoading: isProductLoading,
    error: productError,
  } = useQuery<Product>({
    queryKey: ["get-product", cart.productId],
    queryFn: async () =>
      toast.promise(productAction.getById(cart.productId), {
        error: "Failed to load product details!",
      }),
    enabled: isOpen,
    retry: false,
  });

  const handleCheckout = async () => {
    if (!address.trim()) {
      setAddressError(true);
      showErrorToast("Please enter a shipping address.");
      return;
    }
    setAddressError(false);

    setIsLoading(true);
    try {
      const response = await post<any>(
        `${process.env.NEXT_PUBLIC_SERVER}${ordersEndpoint[
          "post-checkout-cart"
        ](cart._id)}`,
        {
          shippingAddress: address,
          paymentMethod: paymentMethod,
        }
      );
      if (response) {
        dispatch?.({ type: "REMOVE_CART", id: cart._id });
        showSuccessToast("Order placed successfully!");
        onClose();
      } else {
        showErrorToast("Order placement failed. No data received.");
      }
    } catch (error) {
      console.error("Error placing order:", error);
      showErrorToast("Failed to place order. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  // Loading State
  if (isProductLoading) {
    return (
      <div className="fixed inset-0 bg-gray-900/80 flex items-center justify-center z-50 backdrop-blur-sm">
        <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl text-center animate-fade-in">
          <div className="flex justify-center mb-4">
            <svg
              className="animate-spin h-8 w-8 text-teal-600"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8H4z"
              />
            </svg>
          </div>
          <p className="text-gray-700 text-lg font-semibold">
            Loading product details...
          </p>
        </div>
      </div>
    );
  }

  // Error State
  if (productError) {
    return (
      <div className="fixed inset-0 bg-gray-900/80 flex items-center justify-center z-50 backdrop-blur-sm">
        <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl text-center animate-fade-in">
          <p className="text-red-600 text-lg font-semibold mb-4">
            Error loading product details. Please try again.
          </p>
          <button
            onClick={onClose}
            className="px-6 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  // Main Modal Content
  return (
    <div className="fixed inset-0 bg-gray-900/80 flex items-center justify-center z-50 backdrop-blur-sm transition-opacity duration-300">
      <div className="bg-white rounded-2xl p-6 md:p-8 max-w-4xl w-full mx-4 shadow-2xl transform transition-all duration-300 animate-fade-in">
        {/* Header */}
        <div className="flex justify-between items-center mb-6 border-b border-gray-200 pb-4">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
            Complete Your Order
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl transition-colors focus:outline-none"
            aria-label="Close modal"
          >
            &times;
          </button>
        </div>

        {/* Main Content */}
        <div className="flex flex-col md:flex-row gap-6">
          {/* Order Summary */}
          {product && (
            <div className="w-full md:w-1/2 p-4 bg-gray-50 rounded-xl shadow-sm">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Order Summary
              </h3>
              <div className="flex items-start gap-4">
                {product.image && product.image.length > 0 && (
                  <img
                    src={product.image[0]}
                    alt={product.name}
                    className="w-20 h-20 object-cover rounded-lg border border-gray-200"
                  />
                )}
                <div className="flex-1">
                  <p className="text-lg font-semibold text-gray-800">
                    {product.name}
                  </p>
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {product.description}
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    Quantity: {cart.quantity}
                  </p>
                  <p className="text-md font-semibold text-teal-600">
                    Item Price: ${cart.price.toFixed(2)}
                  </p>
                  {(cart.options ||
                    cart.size ||
                    cart.color ||
                    cart.material) && (
                    <div className="mt-2 text-sm text-gray-700">
                      <p className="font-medium">Selected Options:</p>
                      {cart.options && <p>- Options: {cart.options}</p>}
                      {cart.size && <p>- Size: {cart.size}</p>}
                      {cart.color && <p>- Color: {cart.color}</p>}
                      {cart.material && <p>- Material: {cart.material}</p>}
                    </div>
                  )}
                </div>
              </div>
              <div className="mt-4 text-right">
                <p className="text-lg font-bold text-gray-800">
                  Order Total: ${(cart.quantity * cart.price).toFixed(2)}
                </p>
              </div>
            </div>
          )}

          {/* Payment Information */}
          <div className="w-full md:w-1/2 p-4 bg-gray-50 rounded-xl shadow-sm">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Payment Information
            </h3>
            {/* Shipping Address */}
            <div className="mb-4">
              <label
                htmlFor="shippingAddress"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Shipping Address
              </label>
              <textarea
                id="shippingAddress"
                value={address}
                onChange={(e) => {
                  setAddress(e.target.value);
                  setAddressError(false);
                }}
                className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition-colors ${
                  addressError ? "border-red-500" : "border-gray-300"
                }`}
                rows={4}
                placeholder="Enter your full address..."
                aria-invalid={addressError}
                aria-describedby={addressError ? "address-error" : undefined}
              />
              {addressError && (
                <p id="address-error" className="text-red-500 text-sm mt-1">
                  Shipping address is required.
                </p>
              )}
            </div>

            {/* Payment Method */}
            <div className="mb-4">
              <label
                htmlFor="paymentMethod"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Payment Method
              </label>
              <select
                id="paymentMethod"
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition-colors"
              >
                <option value="credit_card">Credit Card</option>
                <option value="paypal">PayPal</option>
                <option value="bank_transfer">Bank Transfer</option>
              </select>
            </div>

            {/* Order Total */}
            {product && (
              <div className="mb-4 text-right">
                <p className="text-lg font-bold text-gray-800">
                  Order Total: ${(cart.quantity * cart.price).toFixed(2)}
                </p>
              </div>
            )}

            {/* Buttons */}
            <div className="flex justify-end gap-3 mt-4">
              <button
                onClick={onClose}
                className="px-6 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleCheckout}
                disabled={
                  isLoading ||
                  !address.trim() ||
                  isProductLoading ||
                  productError ||
                  !product
                }
                className="px-6 py-2 text-sm font-medium text-white bg-gradient-to-r from-teal-500 to-teal-600 rounded-lg hover:from-teal-600 hover:to-teal-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all focus:outline-none focus:ring-2 focus:ring-teal-500"
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <svg
                      className="animate-spin h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v8H4z"
                      />
                    </svg>
                    Processing...
                  </span>
                ) : (
                  "Place Order"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckOutModal;
