import { client } from "..";
import { businessesEndpoint } from "../endpoints/businesses.endpoint";
import mockBusinesses from "@/mock_data/businesses.json";

const businessesAction = {
  async getAll() {
    // Using mock data instead of API call
    return mockBusinesses.businesses;
  },

  async getById(id: string) {
    // Using mock data instead of API call
    const business = mockBusinesses.businesses.find(b => b._id === id);
    return business;
  }
};

export default businessesAction;