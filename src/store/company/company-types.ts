import { PaginationProp } from "@/common/types";

export interface CompanyData {
  id: string;
  state_id: string;
  name: string;
  licence: string;
  email: string;
  phone: string;
  address: string;
  color: string | null;
  logo: string | null;
  logo_svg: string | null;
  created_at: string;
  updated_at: string;
}

export interface CompanyResponse {
  status: boolean;
  message: string;
  data: CompanyData[];

  pagination: PaginationProp;
}

export interface CreateCompanyProps {
  state_id: string;
  name: string;
}
