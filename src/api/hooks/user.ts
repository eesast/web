import { useState } from "react";
import { jwtDecode } from "jwt-decode";

export interface JwtPayload {
  uuid: string;
  role: string;
  "https://hasura.io/jwt/claims"?: {
    "x-hasura-allowed-roles": string[];
    "x-hasura-default-role": string;
    "x-hasura-user-id": string;
  };
}

export const defaultPayload: JwtPayload = {
  uuid: "00000000-0000-0000-0000-000000000000",
  role: "anonymous",
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

    return payload as JwtPayload;
  } catch {
    return null;
  }
};

export const useUser: () => [
  JwtPayload,
  (token: string | null) => void,
] = () => {
  const [user, setUser] = useState<JwtPayload>(
    parse(localStorage.getItem("token")) ?? defaultPayload,
  );
  const setter = (token: string | null) => {
    if (!token) {
      localStorage.removeItem("token");
      setUser(defaultPayload);
      return;
    }
    localStorage.setItem("token", token);
    setUser(parse(token) ?? defaultPayload);
    return;
  };
  return [user, setter];
};
