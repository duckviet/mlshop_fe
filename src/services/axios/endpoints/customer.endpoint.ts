export const customersEndpoint = {
  "get-all": "/customerss",
  "get-by-id": (id: string) => `/customers/${id}`,
  "put-toggle-wishlist": "/customer-add-wishlist",
  "get-customer-info": (id: string) => `api/auth/customer/${id}`,
  "get-me": `/customer/me`,
};
