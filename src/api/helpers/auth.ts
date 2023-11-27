import jwtDecode from "jwt-decode";

export interface JwtPayload {
  uuid: string;
  role: string;
  _id: string;
  "https://hasura.io/jwt/claims": {
    "x-hasura-allowed-roles": string[];
    "x-hasura-default-role": string;
    "x-hasura-user-id": string;
  };
}

export const getUserInfo = () => {
  const token = localStorage.getItem("token");

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
