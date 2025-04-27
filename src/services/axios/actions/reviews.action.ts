import { client } from "..";
import { reviewsEndpoint } from "../endpoints/reviews.endpoint";

const reviewsAction = {
  async getAll() {
    try {
      const res = await client.get(reviewsEndpoint["get-all"]);
      return res.data;
    } catch (error) {
      throw error;
    }
  },
  async getById(id: string) {
    try {
      const res = await client.get(reviewsEndpoint["get-by-id"](id));
      return res.data;
    } catch (error) {
      throw error;
    }
  },
  async postReview(data: any) {
    try {
      const res = await client.post(reviewsEndpoint["post-reviews"], data);
      return res.data;
    } catch (error) {
      throw error;
    }
  },
  async deleteReview(id: string) {
    try {
      const res = await client.delete(reviewsEndpoint["del-reviews"](id));
      return res.data;
    } catch (error) {
      throw error;
    }
  },
  async getByProductId(id: string) {
    try {
      const res = await client.get(reviewsEndpoint["get-by-product-id"](id));
      return res.data;
    } catch (error) {
      throw error;
    }
  },
};

export default reviewsAction;
