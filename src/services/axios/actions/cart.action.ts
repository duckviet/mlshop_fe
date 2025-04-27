import { client } from "..";
import { cartEndpoint } from "../endpoints/cart.endpoint";

const cartAction = {
  async getAll() {
    try {
      const res = await client.get(cartEndpoint["get-all"]);
      return res.data;
    } catch (error) {
      throw error;
    }
  },
  async getById(id: string) {
    try {
      const res = await client.get(cartEndpoint["get-by-id"](id));
      return res.data;
    } catch (error) {
      throw error;
    }
  },
  async getByCustomerId(customerId: string) {
    try {
      const res = await client.get(
        cartEndpoint["get-by-customerId"](customerId)
      );
      return res.data;
    } catch (error) {
      throw error;
    }
  },
  async create(data: any) {
    try {
      const res = await client.post(cartEndpoint.create, data);
      return res.data;
    } catch (error) {
      throw error;
    }
  },
  async deleteItem(id: string) {
    try {
      const res = await client.delete(cartEndpoint["del-remove-cart-item"](id));
      return res.data;
    } catch (error) {
      throw error;
    }
  },
};

export default cartAction;
