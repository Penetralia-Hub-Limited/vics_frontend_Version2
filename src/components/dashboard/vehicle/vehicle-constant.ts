export const initialValuesStep1 = {
  fullName: "",
  email: "",
  phoneNumber: "",
  address: "",
  nationality: "",
  date: undefined as Date | undefined,
  userid: "",
};

export type inputVehiclePropsStep1 = {
  userid: string;
  fullName: string;
  email: string;
  phoneNumber: string;
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
  netweight: "",
  vehicleenginecapacity: "",
  load: "",
};

export type IAddVehicleStep2Props = {
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

export type inputVehiclePropsStep3 = {
  plateNumber: string;
  plateNumberType: string;
};

export const initialValuesStep3 = {
  plateNumber: "",
  plateNumberType: "",
};
