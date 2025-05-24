import { client } from "..";
import { productEndpoint } from "../endpoints/product.endpoint";
import mockProducts from "@/mock_data/products.json";

const productAction = {
  async getAll() {
    // Using mock data instead of API call
    return mockProducts.products;
  },
  
  async getById(id: string) {
    // Using mock data instead of API call
    const product = mockProducts.products.find(p => p._id === id);
    return product;
  },

  async getByIds(ids: string[]) {
    // Using mock data instead of API call
    const products = mockProducts.products.filter(p => ids.includes(p._id));
    return products;
  },

  async getByPagination(page: number, limit: number) {
    // Using mock data with pagination
    const start = (page - 1) * limit;
    const end = start + limit;
    const products = mockProducts.products.slice(start, end);
    return {
      data: products,
      meta: {
        currentPage: page,
        totalPages: Math.ceil(mockProducts.products.length / limit),
        totalItems: mockProducts.products.length,
        itemsPerPage: limit
      }
    };
  },

  async getByBusinessesId(id: string) {
    // Using mock data instead of API call
    const products = mockProducts.products.filter(p => p.businessesId === id);
    return products;
  },

  async getByCategory(category: string) {
    // Using mock data instead of API call
    const products = mockProducts.products.filter(p => p.category === category);
    return products;
  }
};

export default productAction;