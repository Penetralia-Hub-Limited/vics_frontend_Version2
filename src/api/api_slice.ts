import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query";
import { headers } from "next/headers";
import { BaseQueryApi as ReduxBaseQueryApi } from "@reduxjs/toolkit/query";

interface BaseQueryArgs {
  url: string;
  method?: string;
  body?: unknown;
}

interface ExtraOptions {
  [key: string]: unknown;
}

interface BaseQueryApi extends ReduxBaseQueryApi {
  // Extend or add additional properties if needed
}

const baseQuery = fetchBaseQuery({
  baseUrl: "http:localhost:3000",
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as { auth: { token: string } }).auth.token;
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

interface BaseQueryResult {
  data?: unknown;
  error?: {
    status: number | string; // Allow both number and string for compatibility
    data?: unknown;
    error?: string; // Include the error field for FETCH_ERROR cases
  };
}

const baseQueryWithReAuth = async (
  args: BaseQueryArgs,
  api: BaseQueryApi,
  extraOptions: ExtraOptions
): Promise<BaseQueryResult | undefined> => {
  const result: BaseQueryResult = await baseQuery(args, api, extraOptions);

  if (result?.error?.status === 403) {
    console.log("sending refresh token");
  }

  return result;
};
