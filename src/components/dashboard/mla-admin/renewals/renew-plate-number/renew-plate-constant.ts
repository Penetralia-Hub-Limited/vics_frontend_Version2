export const initialValuesStep1 = {
  fullName: "",
  email: "",
  phone: "",
  address: "",
  nationality: "",
  date: undefined as Date | undefined,
};

export type inputRenewPlateNumberPropsStep1 = {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  nationality: string;
  date: Date | undefined;
};

export const initialValuesStep2 = {
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

export type inputRenewPlateNumberPropsStep2 = {
  chasis_number: string;
  engine_number: string;
  make: string;
  model: string;
  year: string;
  category: string;
  policy_sector: string;
  color: string;
  capacity: string | null;
  weight: string;
  engine_capacity: string;
  load: string;
};

export type inputRenewPlateNumberPropsStep3 = {
  number: string;
  type: string;
};

export const initialValuesStep3 = {
  number: "",
  type: "",
};

export interface SelectedServices {
  [key: string]: boolean;
}

export interface inputRenewPlateNumberPropsStep4 {
  selectedServices: SelectedServices;
}
