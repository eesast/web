import axios from "axios";
import { IUser } from "../redux/types/state";

export const login = async (username: string, password: string) => {
  const response = await axios.post("/v1/users/login", {
    username,
    password
  });
  return response.data.token as string;
};

export const register = async (form: IUser) => {
  await axios.post("/v1/users", form);
};
