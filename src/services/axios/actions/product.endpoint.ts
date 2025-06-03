import axios from "axios";
import { client } from "..";
import { productEndpoint } from "../endpoints/product.endpoint";

const productAction = {
  async getAll() {
    try {
      const res = await client.get(productEndpoint["get-all"]);
      return res.data;
    } catch (error) {
      throw error;
    }
  },
  async getById(id: string) {
    try {
      const res = await client.get(productEndpoint["get-by-id"](id));
      return res.data;
    } catch (error) {
      throw error;
    }
  },
  async getByIds(ids: string[]) {
    try {
      const res = await client.post(productEndpoint["get-by-ids"], {
        ids,
      });
      console.log(res);
      return res.data;
    } catch (error) {
      throw error;
    }
  },
  async getByPagination(page: number, limit: number) {
    try {
      const res = await client.get(
        productEndpoint["get-by-pagination"](page, limit)
      );
      return res.data;
    } catch (error) {
      throw error;
    }
  },
  async getByBusinessesId(id: string) {
    try {
      const res = await client.get(productEndpoint["get-by-businesses-id"](id));
      return res.data;
    } catch (error) {
      throw error;
    }
  },
  async getByCategory(category: string) {
    try {
      const res = await client.get(
        `${productEndpoint["get-by-category"]}?category=${category}`
      );
      return res.data;
    } catch (error) {
      throw error;
    }
  },
  async getRecommend(data: any) {
    try {
      const res = await axios.post(
        `http://192.168.28.39:8000/recommendations`,
        data
      );
      return res.data;
    } catch (error) {
      throw error;
    }
  },
};

export default productAction;
