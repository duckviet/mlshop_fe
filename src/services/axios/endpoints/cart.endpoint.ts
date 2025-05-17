export const cartEndpoint = {
  "get-all": "/cart",
  "get-by-id": (id: string) => `/cart/${id}`,
  "get-by-customerId": (id: string) => `/cart-customer/${id}`,
  "post-add-cart": "/cart/add",
  "del-remove-cart-item": (id: string) => `/cart/${id}`,
};
