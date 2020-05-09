import axios from "axios";
import { IUser } from "../redux/types/state";

export const login = async (username: string, password: string) => {
  const response = await axios.post("/v1/users/login", {
    username,
    password,
  });
  return response.data.token as string;
};

export const register = async (form: IUser) => {
  await axios.post("/v1/users", form);
};

export const updateUser = async (id: number, form: Partial<IUser>) => {
  await axios.put("/v1/users/" + id, form);
};

export const getUserId = async (username: string) => {
  const response = await axios.get(`/v1/users?username=${username}`);
  const convertedResponse = response.data as IUser[];
  if (convertedResponse.length) return convertedResponse[0].id;
  else return 0;
};

export const getUsername = async (userId: number) => {
  const response = await axios.get(`/v1/users/username/${userId}`);
  return response.data.username as string;
};

export const getUserInfo = async (id: number) => {
  const response = await axios.get(`/v1/users/${id}`);
  return response.data as IUser;
};

export const getUserInfos = async (ids: number[]) => {
  const response = await axios.post(`/v1/users/details`, {
    ids,
  });
  return response.data as IUser[];
};

export const verifyToken = async (token: string) => {
  const response = await axios.post(`/v1/users/token/validate`, {
    token: token,
  });
  // THUAI那边直接传递登录后的token
  return response.data;
};
