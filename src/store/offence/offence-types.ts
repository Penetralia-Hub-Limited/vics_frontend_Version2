import { PaginationProp } from "@/common/types";

export interface OffenceData {
  id: string;
  company_id: string;
  creator_id: string;
  last_updated_id?: string | null;
  deactivated_by_id?: string | null;
  state_id: string;
  status: string;
  action_taken: string;
  fine: number;
  name: string;
  offence_code: string;
  point: number;
  revenue_code: string;
  date_deactivated?: string | null;
  created_at: string;
  updated_at: string;
}

export interface OffenceResponse {
  status: boolean;
  message: string;
  data: OffenceData[];
  pagination: PaginationProp;
}

export interface CreateOffenceProps {
  state_id: string;
  name: string;
  fine: number;
  action_taken: string | null;
  offence_code: string | null;
  revenue_code: string | null;
  status: string; // "Active",
  point: 2;
}
