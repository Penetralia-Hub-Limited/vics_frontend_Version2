import { StatesData } from "@/store/states/states-types";

export type inputSalesPropsStep1 = {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  nationality: string;
  date: Date | undefined;
  userID: string;
  state: StatesData | null;
};

export const initialSalesValuesStep1 = {
  fullName: "",
  email: "",
  phone: "",
  address: "",
  nationality: "",
  userID: "",
  date: undefined,
  state: null,
};

export const initialSalesValuesStep2 = {
  chasis_number: "",
  engine_number: "",
  make: "",
  model: "",
  year: "",
  category: "",
  policy_sector: "",
  color: "",
  capacity: "",
  weight: "",
  engine_capacity: "",
  load: "",
};

export type inputSalesPropsStep2 = {
  chasis_number: string;
  engine_number: string;
  make: string;
  model: string;
  year: string;
  category: string;
  policy_sector: string;
  color: string;
  capacity: string;
  weight: string;
  engine_capacity: string;
  load: string;
};

export type inputSalesPropsStep3 = {
  number: string;
  type: string;
};

export const initialSalesValuesStep3 = {
  number: "",
  type: "",
};

export type inputSalesPropsStep4 = {
  insurance_number: string;
};

export const initialSalesValuesStep4 = {
  insurance_number: "",
};
