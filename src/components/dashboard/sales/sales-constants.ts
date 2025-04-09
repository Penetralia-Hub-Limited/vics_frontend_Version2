export type inputSalesPropsStep1 = {
  fullName: string;
  email: string;
  phoneNumber: string;
  address: string;
  nationality: string;
  date: Date | undefined;
};

export const initialSalesValuesStep1 = {
  fullName: "",
  email: "",
  phoneNumber: "",
  address: "",
  nationality: "",
  date: undefined as Date | undefined,
};

export const initialSalesValuesStep2 = {
  chasisnumber: "",
  enginenumber: "",
  vehicleMake: "",
  vehicleModel: "",
  modelYear: "",
  vehicleCategory: "",
  policySector: "",
  vehicleColor: "",
  novehiclecapacity: 0,
  netweight: "",
  vehicleenginecapacity: "",
  vehicleLoad: "",
};

export type inputSalesPropsStep2 = {
  chasisnumber: string;
  enginenumber: string;
  vehicleMake: string;
  vehicleModel: string;
  modelYear: string;
  vehicleCategory: string;
  policySector: string;
  vehicleColor: string;
  novehiclecapacity: number;
  netweight: string;
  vehicleenginecapacity: string;
  vehicleLoad: string;
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
