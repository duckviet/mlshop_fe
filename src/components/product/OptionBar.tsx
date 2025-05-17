"use client";
import { useAddToCart } from "@/hooks/Cart/useAddToCart";
// Removed unused Cart interface import
import { cn } from "@/lib/utils";
import { showSuccessToast, showErrorToast } from "@/utils/showToast"; // Import showErrorToast
import { useSession } from "next-auth/react";
import React, { useState, useEffect } from "react";
// Removed unused useSession import
import { Product } from "@/interfaces/Product";

interface ProductVariant {
  size?: string[];
  color?: string[];
  material?: string[];
}

interface OptionBarProps {
  product: Product;
}

const OptionBar: React.FC<OptionBarProps> = ({ product }) => {
  // Removed useSession as suggested by the user's original logic (add to cart happens without session check here)
  // If add to cart requires session, you'll need to add the check back in useAddToCart hook or here.
  const { data: session } = useSession();

  const initialOptionState = {
    size: "",
    color: "",
    material: "",
    quantity: 1, // Start with a quantity of 1
  };

  const [option, setOption] = useState(initialOptionState);
  const [showSizeError, setShowSizeError] = useState(false);
  const [showColorError, setShowColorError] = useState(false);
  const [showMaterialError, setShowMaterialError] = useState(false);

  const addToCart = useAddToCart();

  // Effect to set initial selected options if variants exist
  useEffect(() => {
    if (product?.variants) {
      setOption((prevOption) => ({
        ...prevOption,
        size: product.variants?.size?.[0] || "",
        color: product.variants?.color?.[0] || "",
        material: product.variants?.material?.[0] || "",
      }));
    }
  }, [product]); // Re-run if product changes

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (!isNaN(value) && value >= 0) {
      setOption((prevOption) => ({
        ...prevOption,
        quantity: value,
      }));
    }
    // Optionally show an error if the input is invalid
  };

  const handleIncrementQuantity = () => {
    setOption((prevOption) => ({
      ...prevOption,
      quantity: prevOption.quantity + 1,
    }));
  };

  const handleDecrementQuantity = () => {
    setOption((prevOption) => {
      if (prevOption.quantity > 1) {
        // Prevent quantity from going below 1
        return {
          ...prevOption,
          quantity: prevOption.quantity - 1,
        };
      }
      return prevOption; // Don't change if quantity is 1 or less
    });
  };

  const validateOptions = () => {
    let isValid = true;
    setShowSizeError(false);
    setShowColorError(false);
    setShowMaterialError(false);

    if (product.variants?.size?.length! > 0 && !option.size) {
      setShowSizeError(true);
      isValid = false;
    }
    if (product.variants?.color?.length! > 0 && !option.color) {
      setShowColorError(true);
      isValid = false;
    }
    if (product.variants?.material?.length! > 0 && !option.material) {
      setShowMaterialError(true);
      isValid = false;
    }
    if (option.quantity <= 0) {
      showErrorToast("Quantity must be at least 1");
      isValid = false;
    }

    return isValid;
  };

  const handleAddToCart = async () => {
    if (!validateOptions()) {
      return;
    }

    // In a real app, you would pass selected options (size, color, material) to the API
    // The current useAddToCart only takes productId and quantity.
    // You'll need to update your useAddToCart hook and backend API to handle variants.
    // For now, we'll just proceed with the existing hook structure.
    await addToCart({
      customerId: session?.user.id,
      productId: product._id,
      ...option,
      price: product.price,
    });
    showSuccessToast("Product added to cart");
    // Reset options after adding to cart if needed, or keep them selected
    // setOption(initialOptionState);
  };

  const handleBuyNow = () => {
    if (!validateOptions()) {
      return;
    }
    // Implement buy now logic here.
    // This would likely involve creating an order directly or navigating to a checkout page
    // with the selected product and options.
    showSuccessToast("Proceeding to checkout with selected item.");
    // You might navigate the user here, e.g.:
    // router.push(`/checkout?productId=${product._id}&quantity=${option.quantity}&size=${option.size}&color=${option.color}&material=${option.material}`);
  };

  // Helper function to render options for a variant type
  const renderVariantOptions = (
    variantType: keyof ProductVariant,
    setError: React.Dispatch<React.SetStateAction<boolean>>,
    showError: boolean
  ) => {
    const variants = product?.variants?.[variantType] || [];
    const hasVariants = product?.variants?.[variantType]?.length! > 0;

    if (!product || !product.variants || !hasVariants) {
      // Don't render the section if no variants of this type exist
      return null;
    }

    return (
      <div className="mb-4">
        <p className="font-semibold capitalize">
          {variantType}: {/* Display the variant type e.g., "Color", "Size" */}
          {showError && (
            <span className="text-red-500 ml-2 text-sm">
              Please select {variantType}
            </span>
          )}
        </p>
        <div className="flex flex-wrap gap-2 mt-2">
          {variants.map((item: string, index: number) => (
            <button // Use button for better accessibility
              key={index}
              onClick={() => {
                setOption((prevOption) => ({
                  ...prevOption,
                  [variantType]: item, // Dynamically set the option based on variant type
                }));
                setError(false); // Hide error when a selection is made
              }}
              className={cn(
                "px-3 py-1 min-w-[32px] text-sm flex items-center justify-center",
                "rounded-full border transition-colors", // Use rounded-full and transition
                option[variantType as keyof typeof option] === item // Check the correct property
                  ? "border-green-600 bg-green-100 text-green-800" // Selected style
                  : "border-gray-300 text-gray-700 hover:bg-gray-100" // Default and hover
              )}
            >
              {item}
            </button>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="   ">
      {/* Display price */}
      {/* Quantity Selector */}
      <div className="mb-6">
        {" "}
        {/* Added margin-bottom */}
        <p className="font-semibold mb-2">Quantity:</p>{" "}
        {/* Added margin-bottom */}
        <div className="flex items-center gap-2">
          {" "}
          {/* Flex container for controls */}
          <button
            onClick={handleDecrementQuantity}
            className="btn btn-outline btn-square btn-sm" // Styled with daisyUI classes
            disabled={option.quantity <= 1} // Disable when quantity is 1
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
              className="w-4 h-4"
            >
              <path
                fill="currentColor"
                d="M432 256c0 17.7-14.3 32-32 32L48 288c-17.7 0-32-14.3-32-32s14.3-32 32-32l352 0c17.7 0 32 14.3 32 32z"
              />
            </svg>
          </button>
          <input
            value={option.quantity}
            type="text"
            className="input input-bordered w-16 text-center text-sm" // Styled with daisyUI classes
            onChange={handleQuantityChange}
            min="1" // Minimum quantity
          />
          <button
            onClick={handleIncrementQuantity}
            className="btn btn-outline btn-square btn-sm" // Styled with daisyUI classes
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
              className="w-4 h-4"
            >
              <path
                fill="currentColor"
                d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z"
              />
            </svg>
          </button>
        </div>
      </div>
      {/* Variant Options (Color, Size, Material) */}
      {renderVariantOptions("color", setShowColorError, showColorError)}
      {renderVariantOptions("size", setShowSizeError, showSizeError)}
      {renderVariantOptions(
        "material",
        setShowMaterialError,
        showMaterialError
      )}
      {/* Action Buttons */}
      <div className="flex flex-col gap-4 mt-6">
        {" "}
        {/* Adjusted spacing */}
        <button
          onClick={handleAddToCart}
          className="btn  btn-ghost  w-full" // Styled with daisyUI primary button
        >
          Add to Cart
        </button>
        <button
          onClick={handleBuyNow}
          className="btn btn-[oklch(75.98% 0.204 56.72)]  w-full" // Styled with daisyUI secondary button
        >
          Buy Now
        </button>
      </div>
    </div>
  );
};

export default OptionBar;
