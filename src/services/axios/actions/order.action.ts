import { client } from "..";
import { ordersEndpoint } from "../endpoints/order.endpoint";

const orderAction = {
  async getAll() {
    try {
      const res = await client.get(ordersEndpoint["get-all"]);
      return res.data;
    } catch (error) {
      throw error;
    }
  },
  async getById(id: string) {
    try {
      const res = await client.get(ordersEndpoint["get-by-id"](id));
      return res.data;
    } catch (error) {
      throw error;
    }
  },
  async create(data: any) {
    try {
      const res = await client.post(ordersEndpoint.create, data);
      return res.data;
    } catch (error) {
      throw error;
    }
  },
  async postCheckout(cartId: string) {
    try {
      const res = await client.post(
        ordersEndpoint["post-checkout-cart"](cartId)
      );
      return res.data;
    } catch (error) {
      throw error;
    }
  },
  async deleteItem(id: string) {
    try {
      const res = await client.delete(
        ordersEndpoint["del-remove-orders-item"](id)
      );
      return res.data;
    } catch (error) {
      throw error;
    }
  },
};

export default orderAction;
