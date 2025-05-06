import { PaginationProp } from "@/common/types";
import { InvoiceData } from "../invoice/invoice-types";
import { VehicleData } from "../vehicle/vehicle-type";
import { StatesData } from "../states/states-types";
import { User } from "../user/user-type";
import { CompanyData } from "../company/company-types";
import { PlateNumberOrderType, PlateNumberType } from "@/common/enum";

export interface PlateNumberOrderData {
  id: string;
  company_id: string;
  creator_id: string;
  last_updated_id: string | null;
  deactivated_by_id: string | null;
  state_id: string;
  invoice_id: string;
  vehicle_id: string;
  approver_id: string;
  recommender_id: string;
  type: PlateNumberOrderType;
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
  insurance_status: string;
  steps_completed: number;
  total_steps: number;
  date_deactivated: string | null;
  company: CompanyData;
  state: StatesData;
  creator: User;
  approver: User | null; // Change if available
  recommender: User | null; // Change if available
  last_updated_by: User | null;
  deactivated_by: User | null;
  invoice: InvoiceData;
  vehicle: VehicleData;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface PlateNumberOrderResponse {
  status: boolean;
  message: string;
  data: PlateNumberOrderData[];
  pagination: PaginationProp;
}

export interface CreatePlateNumberOrderProps {
  invoice_id?: string | null;
  state_id?: string | null;
  approver_id?: string | null;
  recommender_id?: string | null;
  agent_id?: string | null;
  vehicle_id?: string | null;
  type?: PlateNumberOrderType;
  status?: string;
  insurance_status?: string;
  issuance_status?: string;
  assignment_status?: string;
  fancy_plate?: string;
  prefix?: number | null;
  recommended_number?: number | null;
  total_number_requested?: number | null;
  tracking_id?: string | null;
  workflow_approval_status?: string;
  plate_number_type?: PlateNumberType | null;
  plate_number_sub_type?: string | null;
  workflow_id?: string | null;
  reference_number?: string | null;
  steps_completed?: number | null;
  total_steps?: number;
}
