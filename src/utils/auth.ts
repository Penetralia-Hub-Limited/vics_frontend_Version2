import axios from "axios";
import { LoginResponse, IUserCredentials } from "@/store/auth/auth-user-types";

export const loginAuth = async (userData: IUserCredentials) => {
  try {
    const apiURL = "https://benion-vics-api.onrender.com/api/v1/login";
    const data = `{\r\n    "email": "${userData.identifier}",\r\n    "password": "${userData.password}"\r\n}`;
    const Header = {
      "Content-Type": "application/json",
    };

    const config = {
      method: "post",
      maxBodyLength: Infinity,
      headers: Header,
      url: apiURL,
      data: data,
    };

    const response = await axios(config);

    const loginResponse: LoginResponse = response.data;
    return loginResponse;
  } catch (error) {
    console.log("Error signing user up");
    throw new Error(error as unknown as string);
  }
};

export const forgotPasswordAuth = async () => {
  try {
  } catch (error) {}
};
