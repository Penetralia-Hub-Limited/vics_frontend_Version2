import { PaginationProp } from "@/common/types";

export interface LGAData {
  id: string;
  state_id: string;
  name: string;
  created_at: string;
  updated_at: string;
}

export interface LGAResponse {
  status: boolean;
  message: string;
  data: LGAData[];
  pagination: PaginationProp;
}

export interface CreateLGAProps {
  state_id: string;
  name: string;
}
