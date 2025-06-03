import { client } from "..";
import { businessesEndpoint } from "../endpoints/businesses.endpoint";

const businessesAction = {
  async getAll() {
    try {
      const res = await client.get(businessesEndpoint["get-all"]);
      return res.data;
    } catch (error) {
      throw error;
    }
  },
  async getById(id: string) {
    try {
      const res = await client.get(businessesEndpoint["get-by-id"](id));
      return res.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
};

export default businessesAction;
