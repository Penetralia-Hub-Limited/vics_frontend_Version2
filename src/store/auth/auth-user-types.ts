export interface IUserCredentials {
  identifier: string;
  password: string;
}

export interface LoginResponse {
  status: boolean;
  message: string;
  data: {
    accessToken: string;
    user: {
      id: string;
      company_id: string;
      creator_id: string | null;
      state_id: string;
      last_updated_id: string | null;
      area_id: string | null;
      lga_id: string | null;
      office_id: string | null;
      firstname: string;
      lastname: string;
      othername: string;
      image: string | null;
      nin: string | null;
      role: string;
      email: string;
      gender: string;
      phone: string;
      address: string;
      status: string;
      registeration_type: string;
      state_verification_no: string | null;
      date_of_birth: string | null;
      is_email_verified: boolean;
      email_verified_at: string | null;
      date_deactivated: string | null;
      created_at: string;
      updated_at: string;
      deleted_at: string | null;
    };
  };
}

export enum USER_ACTION_TYPES {
  SET_CURRENT_USER = "user/SET_CURRENT_USER",
  CHECK_USER_SESSION_START = "user/CHECK_USER_SESSION_START",
  LOGIN_START = "user/LOG_IN_START",
  LOGIN_SUCCESS = "user/LOG_IN_SUCCESS",
  LOGIN_FAILED = "user/LOG_IN_FAILED",
  LOG_OUT_START = "user/LOG_OUT_START",
  LOG_OUT_SUCCESS = "user/LOG_OUT_SUCCESS",
  LOG_OUT_FAILED = "user/LOG_OUT_FAILED",
}
