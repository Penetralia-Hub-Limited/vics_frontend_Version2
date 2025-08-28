/* eslint-disable @typescript-eslint/no-explicit-any */
import { User, AuthState, LoginResponse } from "@/store/auth/auth-user-types";
import jwt, { SignOptions } from "jsonwebtoken";

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

// export const host = process.env.NEXT_PUBLIC_API_URL;
// export const xApiKey = process.env.NEXT_PUBLIC_AUTH_API_KEY;
export const host = "https://api-vics.penetraliahub.com/api/v1";
export const xApiKey =
  "7f9035a810eb39c3daf48e6fdfb31da9834ffff5c4d213013fc7fb3ab8851740";
