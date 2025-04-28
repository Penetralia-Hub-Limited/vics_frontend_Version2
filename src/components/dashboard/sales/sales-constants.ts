export type inputSalesPropsStep1 = {
  fullName: string;
  email: string;
  phoneNumber: string;
  address: string;
  nationality: string;
  date: Date | undefined;
  userID: string;
  state: string;
};

export const initialSalesValuesStep1 = {
  fullName: "",
  email: "",
  phoneNumber: "",
  address: "",
  nationality: "",
  userID: "",
  date: undefined,
  state: "",
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
  netweight: "",
  vehicleenginecapacity: "",
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
  netweight: string;
  vehicleenginecapacity: string;
  load: string;
};

export type inputSalesPropsStep3 = {
  plateNumber: string;
  plateNumberType: string;
};

export const initialSalesValuesStep3 = {
  plateNumber: "",
  plateNumberType: "",
};

export type inputSalesPropsStep4 = {
  insurance: string;
};

export const initialSalesValuesStep4 = {
  insurance: "",
};
