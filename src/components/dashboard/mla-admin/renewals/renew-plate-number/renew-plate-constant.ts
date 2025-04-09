export const initialValuesStep1 = {
  fullName: "",
  email: "",
  phoneNumber: "",
  address: "",
  nationality: "",
  date: undefined as Date | undefined,
};

export type inputRenewPlateNumberPropsStep1 = {
  fullName: string;
  email: string;
  phoneNumber: string;
  address: string;
  nationality: string;
  date: Date | undefined;
};

export const initialValuesStep2 = {
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

export type inputRenewPlateNumberPropsStep2 = {
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

export type inputRenewPlateNumberPropsStep3 = {
  plateNumber: string;
  plateNumberType: string;
};

export const initialValuesStep3 = {
  plateNumber: "",
  plateNumberType: "",
};

export interface SelectedServices {
  [key: string]: boolean;
}

export interface inputRenewPlateNumberPropsStep4 {
  selectedServices: SelectedServices;
}
