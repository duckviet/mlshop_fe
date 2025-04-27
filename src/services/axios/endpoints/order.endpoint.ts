export const ordersEndpoint = {
  "get-all": "/orders",
  "get-by-id": (id: string) => `/orders/${id}`,
  "get-by-customerId": (id: string) => `/orders-customer/${id}`,
  create: "/orders",
  "post-checkout-cart": (cartId: string) => `/orders-checkout/${cartId}`,
  "del-remove-orders-item": (id: string) => `/orders/${id}`,
};
