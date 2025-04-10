import { PaginationProp } from "@/common/types";

export interface PlateNumberOrderData {
  id: string;
  company_id: string;
  creator_id: string;
  last_updated_id?: string | null;
  deactivated_by_id?: string | null;
  state_id: string;
  invoice_id: string;
  vehicle_id: string;
  type: string; // "Request";
  status: string;
  assignment_status: string;
  fancy_plate: string;
  prefix: number;
  recommended_number: number;
  total_number_requested: number;
  tracking_id: string;
  workflow_approval_status: string;
  plate_number_type: string;
  plate_number_sub_type: string;
  workflow_id: string;
  reference_number: string;
  steps_completed: number;
  total_steps: number;
  date_deactivated?: string | null;
  created_at: string;
  updated_at: string;
  deleted_at?: string | null;
}

export interface PlateNumberOrderResponse {
  status: boolean;
  message: string;
  data: PlateNumberOrderData[];
  pagination: PaginationProp;
}

export interface CreatePlateNumberOrderProps {
  invoice_id?: string | null;
  state_id: string;
  vehicle_id?: string | null;
  type?: string; //"Request" | "Sale";
  status?: string;
  assignment_status?: string;
  fancy_plate?: string;
  prefix?: number | null;
  recommended_number?: number | null;
  total_number_requested?: number | null;
  tracking_id?: string | null;
  workflow_approval_status?: string;
  plate_number_type?: string | null;
  plate_number_sub_type?: string | null;
  workflow_id?: string | null;
  reference_number?: string | null;
  steps_completed?: number | null;
  total_steps: number;
}
