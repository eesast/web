import { useState } from "react";
import { jwtDecode } from "jwt-decode";

export interface JwtPayload {
  uuid: string;
  role: string;
  "https://hasura.io/jwt/claims": {
    "x-hasura-allowed-roles": string[];
    "x-hasura-default-role": string;
    "x-hasura-user-id": string;
  };
}

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
  JwtPayload | null,
  (token: string | null) => void,
] = () => {
  const [user, setUser] = useState<JwtPayload | null>(
    parse(localStorage.getItem("token")),
  );
  const setter = (token: string | null) => {
    if (!token) {
      localStorage.removeItem("token");
      setUser(null);
      return;
    }
    localStorage.setItem("token", token);
    setUser(parse(token));
    return;
  };
  return [user, setter];
};
