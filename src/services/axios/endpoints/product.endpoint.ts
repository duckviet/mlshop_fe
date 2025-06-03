export const productEndpoint = {
  "get-all": "/products",
  "get-by-id": (id: string) => `/products/${id}`,
  "get-by-ids": "/products-by-ids",
  "get-by-businesses-id": (id: string) => `/products-businesses/${id}`,
  "get-by-pagination": (page: number, limit: number) =>
    `/products-pagination?page=${page}&limit=${limit}`,
  "get-by-category": `/products-category`,
};
