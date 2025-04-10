/* eslint-disable @typescript-eslint/no-explicit-any */
import { User, AuthState, LoginResponse } from "@/store/auth/auth-user-types";
import jwt, { SignOptions } from "jsonwebtoken";

export const authTypes = {
  login: "login",
  logout: "logout",
  register: "register",
};

export interface initialAuthStateProp {
  isLoading: boolean;
  isLoggedIn: boolean;
  data: null;
  error: string | null;
}

export const initialAuthState: initialAuthStateProp = {
  isLoading: false,
  isLoggedIn: false,
  data: null,
  error: null,
};

interface Payload {
  [key: string]: LoginResponse | User | AuthState;
}

const tokenSecret = process.env.NEXT_PUBLIC_JWT_SECRET as string;

export const generateToken = (data: Payload, time: string | number): string => {
  if (!tokenSecret) {
    throw new Error("JWT secret is not defined, GEN");
  }

  const options: SignOptions = {
    expiresIn: time as SignOptions["expiresIn"],
  };

  const token = jwt.sign(data, tokenSecret, options);
  return token;
};

interface DecryptTokenResult {
  success: boolean;
  data: any | null;
}

export const decryptToken = (token: string): DecryptTokenResult => {
  let tokenData: DecryptTokenResult = { success: false, data: null };
  if (!tokenSecret) {
    throw new Error("JWT secret is not defined");
  }
  jwt.verify(token, tokenSecret, (error, decoded) => {
    if (!error) {
      tokenData = { success: true, data: decoded };
    }
  });
  return tokenData;
};
