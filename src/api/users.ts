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

export const updateUser = async (id: number, form: Partial<IUser>) => {
  await axios.put("/v1/users/" + id, form);
};

export const getUsername = async (id: number, token: string) => {
  const response = await axios.get(`/v1/users/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data.username as string;
};
