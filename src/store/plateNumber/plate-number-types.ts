import { PaginationProp } from "@/common/types";
import { User } from "../user/user-type";
import { StatesData } from "../states/states-types";
import { CompanyData } from "../company/company-types";
import { InvoiceData } from "../invoice/invoice-types";

export interface PlateNumberData {
  id: string;
  company_id: string;
  creator_id: string;
  last_updated_id: string | null;
  deactivated_by_id: string | null;
  state_id: string | null;
  number: string;
  number_status: string;
  status: string;
  agent_id: string;
  owner_id: string;
  request_id: string;
  stock_id: string;
  type: string;
  sub_type: string;
  date_deactivated: string | null;
  created_at: string | null;
  assigned_date: string | null;
  updated_at: string | null;
  creator: User;
  state: StatesData;
  company: CompanyData;
  invoice: InvoiceData;
  owner: User;
}

export interface PlateNumberResponse {
  status: boolean;
  message: string;
  data: PlateNumberData[];
  pagination: PaginationProp;
}

export interface CreatePlateNumberProps {
  state_id: string;
  number: string;
  number_status: string | null;
  status: string | null;
  agent_id: string | null;
  owner_id: string | null;
  request_id: string | null;
  stock_id: string | null;
  type: string | null;
  sub_type: string | null;
  assigned_status: string | null;
}
