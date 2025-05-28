export const authTypes = {
  login: "login",
  logout: "logout",
  register: "register",
};

export interface initialAuthStateProp {
  isLoading: boolean;
  isLoggedIn: boolean;
  data: Data | null;
  error: string | null;
}

export const initialAuthState: initialAuthStateProp = {
  isLoading: false,
  isLoggedIn: false,
  data: null,
  error: null,
};

export interface RegisterCredentials {
  firstname: string;
  lastname: string;
  othername: string;
  email: string;
  password: string;
  phone: string;
  address: string;
  state: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface forgotPasswordCredentials {
  email: string;
}

export interface Data {
  accessToken: string;
  user: User;
}

export interface User {
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
}

export interface AuthState {
  data: Data | null;
  isLoading: boolean;
  error: string | null;
  isLoggedIn: boolean;
}

export interface LoginResponse {
  status: boolean;
  message: string;
  data: {
    accessToken: string;
    user: User;
  };
}
