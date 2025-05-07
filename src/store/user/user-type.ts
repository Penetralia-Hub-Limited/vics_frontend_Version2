import { PaginationProp } from "@/common/types";
import { ApprovalStatus, Role, UserStatus } from "@/common/enum";

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
  role: Role;
  email: string;
  gender: string;
  phone: string;
  address: string;
  status: UserStatus;
  registeration_type: string;
  state_verification_no: string | null;
  date_of_birth: string | null;
  is_email_verified: boolean;
  email_verified_at: boolean;
  date_deactivated: string | null;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface UserResponse {
  status: boolean;
  message: string;
  data: User[];
  pagination: PaginationProp;
}

export interface CreateUserProp {
  state_id: string;
  area_id?: string | null;
  creator_id?: string | null;
  lga_id?: string | null;
  office_id?: string | null;

  firstname: string;
  lastname: string;
  othername?: string | null;
  image?: string | null;
  nin?: string;
  role: Role | null; // nullable, should be from Roles::USER_ROLES enum
  email: string;
  password?: string | null; // should be up to 8 characters
  gender?: string | null;
  phone?: string | null;
  address?: string | null;
  approval_status?: ApprovalStatus | null;
  status?: UserStatus | null; // nullable, defaults to 'active'
  registeration_type?: string | null; // nullable, defaults to 'registration'
  state_verification_no?: string | null; // nullable
  date_of_birth?: string | null; // nullable
  is_email_verified?: boolean; // nullable, defaults to false
  email_verified_at?: string | null;
  date_deactivated?: string | null;
}
