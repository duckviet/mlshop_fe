export const reviewsEndpoint = {
  "get-all": "/reviews",
  "get-by-id": (id: string) => `/reviews/${id}`,
  "post-reviews": "/reviews",
  "del-reviews": (id: string) => `/reviews/${id}`,
  "get-by-product-id": (id: string) => `/reviews-product/${id}`,
};
