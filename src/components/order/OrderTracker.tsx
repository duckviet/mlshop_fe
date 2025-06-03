"use client";

import { useEffect } from "react";
import { EVENT_TYPES, trackEvent } from "@/utils/eventTracking";

interface OrderTrackerProps {
  productId: string;
}

const OrderTracker: React.FC<OrderTrackerProps> = ({ productId }) => {
  useEffect(() => {
    trackEvent(productId, EVENT_TYPES.BUY);
  }, [productId]);

  return null;
};

export default OrderTracker;
