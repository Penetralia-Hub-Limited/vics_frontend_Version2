export const initialValuesStep1 = {
  fullName: "",
  email: "",
  phoneNumber: "",
  address: "",
  nationality: "",
  date: undefined as Date | undefined,
};

export type inputVehiclePropsStep1 = {
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

export type IAddVehicleStep2Props = {
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

export type inputVehiclePropsStep3 = {
  plateNumber: string;
  plateNumberType: string;
};

export const initialValuesStep3 = {
  plateNumber: "",
  plateNumberType: "",
};
