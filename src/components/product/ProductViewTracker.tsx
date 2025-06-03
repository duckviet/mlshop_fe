"use client";

import { useEffect } from "react";
import { EVENT_TYPES, trackEvent } from "@/utils/eventTracking";

interface ProductViewTrackerProps {
  productId: string;
}

const ProductViewTracker: React.FC<ProductViewTrackerProps> = ({
  productId,
}) => {
  useEffect(() => {
    trackEvent(productId, EVENT_TYPES.VIEW);
  }, [productId]);

  return null; // This component doesn't render anything
};

export default ProductViewTracker;
