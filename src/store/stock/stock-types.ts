import { LGAData } from "../lgas/lga-type";
import { StatesData } from "../states/states-types";
import { User } from "../user/user-type";
import { CompanyData } from "../company/company-types";

export type PlateType = {
  type: string;
  stock_total: number;
};

export interface StockProps {
  id: string;
  company_id: string;
  creator_id: string;
  last_updated_id: string;
  state_id: string;
  lga_id: string;
  plate_number_id: string;
  range: string;
  end_code: string;
  type: string;
  intial_quantity: number;
  current_quantity: number;
  assigned_quantity: number;
  sold_quantity: number;
  status: string;
  plate_type?: PlateType;
  lga: LGAData;
  state?: StatesData;
  creator?: User;
  last_updated?: User;
  company?: CompanyData;
  created_at: string;
  updated_at: string;
}

export type EnterStockProps = {
  state_id: string; // REQUIRED
  lga_id?: string; // OPTIONAL
  plate_number_id?: string; // OPTIONAL

  range?: string; // OPTIONAL
  end_code?: string; // OPTIONAL
  type?: string; // OPTIONAL
  status?: string; // OPTIONAL

  intial_quantity?: number; // OPTIONAL (default to 0)
  current_quantity?: number; // OPTIONAL (default to 0)
  assigned_quantity?: number; // OPTIONAL (default to 0)
  sold_quantity?: number; // OPTIONAL (default to 0)

  plate_type?: PlateType;
};

export type StockResponses = {
  status: boolean;
  message: string;
  data: StockProps;
};
