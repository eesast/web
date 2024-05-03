import { useState } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

export interface JwtPayload {
  uuid: string;
  role: string;
  "https://hasura.io/jwt/claims"?: {
    "x-hasura-allowed-roles": string[];
    "x-hasura-default-role": string;
    "x-hasura-user-id": string;
  };
  isLoggedIn: boolean;
}

export const defaultPayload: JwtPayload = {
  uuid: "00000000-0000-0000-0000-000000000000",
  role: "anonymous",
  "https://hasura.io/jwt/claims": {
    "x-hasura-allowed-roles": ["anonymous"],
    "x-hasura-default-role": "anonymous",
    "x-hasura-user-id": "00000000-0000-0000-0000-000000000000",
  },
  isLoggedIn: false,
};

const parse = (token: string | null) => {
  if (!token) {
    return null;
  }

  try {
    const payload = jwtDecode<(JwtPayload & { exp: number }) | null>(token);

    if (!payload) {
      return null;
    }

    const now = new Date().getTime() / 1000;
    if (now > payload.exp) {
      return null;
    }

    payload.isLoggedIn = payload.uuid === defaultPayload.uuid ? false : true;
    return payload as JwtPayload;
  } catch {
    return null;
  }
};

export const useUser: () => [
  JwtPayload,
  (token: string | null) => void,
] = () => {
  const payload = parse(localStorage.getItem("token"));
  const [user, setUser] = useState<JwtPayload>(payload ?? defaultPayload);
  const getDefaultUser = () => {
    axios.get("/user/anonymous").then((response) => {
      const token = response.data.token;
      localStorage.setItem("token", token);
      setUser(parse(token) as JwtPayload);
    });
  };
  if (payload === null) {
    getDefaultUser();
  }
  const setter = (token: string | null) => {
    const payload = parse(token);
    if (payload) {
      localStorage.setItem("token", token as string);
      setUser(payload);
    } else {
      getDefaultUser();
    }
  };
  return [user, setter];
};
