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
  data: {
    user: LGAData;
  };
}

export interface CreateLGAProps {
  state_id: string;
  name: string;
}
