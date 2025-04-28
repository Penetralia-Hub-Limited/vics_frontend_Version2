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
  area_id: string | null;
  creator_id: string | null;
  lga_id: string | null;
  office_id: string | null;

  firstname: string;
  lastname: string;
  othername: string | null;
  image: string | null;
  nin: string;
  role: Role | null; // nullable, should be from Roles::USER_ROLES enum
  email: string;
  password: string | null;
  gender: string | null;
  phone: string | null;
  address: string | null;
  approval_status: ApprovalStatus | null;
  status: UserStatus | null; // nullable, defaults to 'active'
  registeration_type: string | null; // nullable, defaults to 'registration'
  state_verification_no: string | null; // nullable
  date_of_birth: string | null; // nullable
  is_email_verified: false; // nullable, defaults to false
  email_verified_at: string | null;
  date_deactivated: string | null;
}

// {
//   "state_id": "01jngsm04sh9bf4btpnyzdnn5z",    // required
//   // "area_id": "84hrhwegfjfhuysdj",               // nullable
//   // "creator_id": "01jpw29he00stj0fxpasd2zgej",   // nullable
//   // "lga_id": "bdjgsajfd787r384",                 // nullable
//   // "office_id": "jkhfgf788r4378yr7ui",          // nullable

//   "firstname": "State",                         // required
//   "lastname": "User",                           // required
//   "othername": "Other",                         // nullable
//   "image": "image-src-url",                     // nullable
//   "nin": "762356467874",                        // nullable
//   "role": "General User",                       // nullable, should be from Roles::USER_ROLES enum
//   "email": "test-user@example.com",            // required
//   "password": "Password@1234",                     // required
//   "gender": "male",                             // nullable
//   "phone": "09134867432",                       // nullable
//   "address": "Test Address",                    // nullable
//   "status": "Active",                           // nullable, defaults to 'Active'
//   "approval_status": "Not Approved",                           // nullable, defaults to 'Not Approved'
//   "registeration_type": "registration",         // nullable, defaults to 'registration'
//   "state_verification_no": "6t4hsdjf",           // nullable
//   "date_of_birth": "2025-03-21 09:59:32",        // nullable
//   "is_email_verified": false,                    // nullable, defaults to false
//   "email_verified_at": "2025-03-21 09:59:32",      // nullable
//   "date_deactivated": "2025-03-21 09:59:32"    // nullable
// }
