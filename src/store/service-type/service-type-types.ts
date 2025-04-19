import { PaginationProp } from "@/common/types";
import { User } from "../user/user-type";
import { CompanyData } from "../company/company-types";
import { StatesData } from "../states/states-types";

export type ServiceTypeData = {
  id: string;
  company_id: string;
  creator_id: string;
  last_updated_id: string | null;
  deactivated_by_id: string | null;
  state_id: string;
  status: "Active" | "Inactive";
  code: string;
  name: string;
  duration_in_month: number;
  price: number;
  revenue_code: string;
  reg_type: string;
  vehicle_category: string;
  plate_number_type: string;
  date_deactivated: string | null;
  created_at: string;
  updated_at: string;
  creator: User;
  company: CompanyData;
  state: StatesData;
};

export interface ServiceTypeResponse {
  status: boolean;
  message: string;
  data: ServiceTypeData[];
  pagination: PaginationProp;
}

export interface CreateStateTypeProps {
  state_id: string;
  name: string;
  price: number;
  code?: string;
  revenue_code?: string;
  reg_type?: string;
  vehicle_category?: string;
  plate_number_type?: string | null;
  status?: string; //"Active" | "Inactive" | null;
  duration_in_month?: number;
}
