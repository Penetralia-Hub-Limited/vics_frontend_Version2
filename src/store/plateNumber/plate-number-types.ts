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
  updated_at: string | null;
}

export interface PlateNumberResponse {
  status: boolean;
  message: string;
  data: {
    user: PlateNumberData;
  };
}

export interface PlateNumberProps {
  state_id: string;
  number: string;
  number_status: string;
  status: string;
  agent_id: string | null;
  owner_id: string | null;
  request_id: string | null;
  stock_id: string | null;
  type: string | null;
  sub_type: string;
}
