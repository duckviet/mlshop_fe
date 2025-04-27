import { client } from "..";
import { customersEndpoint } from "../endpoints/customer.endpoint";

const customerAction = {
  async getAll() {
    try {
      const res = await client.get(customersEndpoint["get-all"]);
      return res.data;
    } catch (error) {
      throw error;
    }
  },
  async getById(id: string) {
    try {
      const res = await client.get(customersEndpoint["get-by-id"](id));
      return res.data;
    } catch (error) {
      throw error;
    }
  },
  async toggleWishlist(data: any) {
    try {
      const res = await client.put(
        customersEndpoint["put-toggle-wishlist"],
        data
      );
      return res.data;
    } catch (error) {
      throw error;
    }
  },
  async getCustomerInfo(id: string) {
    try {
      const res = await client.get(customersEndpoint["get-customer-info"](id));
      return res.data;
    } catch (error) {
      throw error;
    }
  },
  async getMe(sessionToken: string) {
    try {
      const res = await client.post(customersEndpoint["get-me"], {
        token: sessionToken,
      });
      return res.data;
    } catch (error) {
      throw error;
    }
  },
};

export default customerAction;
