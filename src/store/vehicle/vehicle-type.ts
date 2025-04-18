import { PaginationProp } from "@/common/types";
import { VehicleStatus, VehicleCategory, EngineCapacity } from "@/common/enum";

export type VehicleData = {
  id: string;
  company_id: string;
  creator_id: string;
  last_updated_id: string | null;
  deactivated_by_id: string | null;
  state_id: string;
  plate_number_id: string;
  owner_id: string;
  status: VehicleStatus; // You can define a stricter union if you know all possible statuses
  capacity: string;
  chasis_number: string;
  color: string;
  engine_number: string;
  insurance_number: string;
  load: string;
  passengers: number;
  permit: string;
  policy_sector: string;
  reg_type: string;
  year: string;
  make: string;
  model: string;
  type: string; // Come back to this
  sub_type: string; // Come back to this
  category: VehicleCategory | null;
  weight: number | null;
  load_weight: number | null;
  engine_capacity: EngineCapacity | null;
  model_year: string | null;
  no_of_persons: number | null;
  date_deactivated: string | null;
  created_at: string;
  updated_at: string;
};

export interface VehicleResponse {
  status: boolean;
  message: string;
  data: VehicleData[];
  pagination: PaginationProp;
}

export interface CreateVehiclePayload {
  state_id: string;
  owner_id?: string | null;
  plate_number_id?: string | null;

  status: string;
  capacity: string;
  chasis_number: string;
  color: string;
  engine_number?: string;
  insurance_number?: string | null;
  load?: string | null;
  passengers?: number;
  make: string;
  model: string;
  year: string;
  type?: string | null;
  sub_type?: string | null;
  reg_type?: string | null;
  permit?: string | null;
  policy_sector?: string | null;
}
