import { client } from "..";
import { authenticationEndpoint } from "../endpoints/authentication.endpoint";

const authenticationAction = {
  async login(email: string, password: string) {
    try {
      const res = await client.post(authenticationEndpoint["login"], {
        email,
        password,
      });

      return res.data;
    } catch (error) {
      throw error;
    }
  },
};

export default authenticationAction;
