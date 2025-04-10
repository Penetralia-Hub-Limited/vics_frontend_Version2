export interface StatesData {
  id: string;
  name: string;
  created_at: string;
  updated_at: string;
}

export interface StatesResponse {
  status: boolean;
  message: string;
  data: StatesData[];
}

export interface StatesProps {
  state_id: string;
  name: string;
}
