import axios from "axios";

export const login = async (username: string, password: string) => {
  const response = await axios.post("/v1/users/login", {
    username,
    password
  });
  return response.data.token as string;
};
