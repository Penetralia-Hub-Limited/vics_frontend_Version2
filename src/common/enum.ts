export enum DateRange {
  TODAY = "today",
  YESTERDAY = "yesterday",
  LAST_7_DAYS = "last7",
  LAST_30_DAYS = "last30",
}

export enum PaymentStatus {
  PAID = "Paid",
  NOTPAID = "Not Paid",
}

export enum PlateNumberStatus {
  ASSIGNED = "Assigned",
  UNASSIGNED = "Not Assigned",
  SOLD = "Sold",
}

export enum Role {
  SUPERADMIN = "Super Admin",
  MLA = "MLA", // motor licensing authority
  Chairman = "Chairman",
  SMR = "SMR", // state motor registry
  STOREADMIN = "Store Manager Admin",
  GENERALUSER = "General User",
  ADMIN = "Admin",
  TAXPAYER = "Tax Payer",
}

export enum UserStatus {
  DEACTIVATED = "Deactivated",
  ACTIVE = "Active",
}

export enum ApprovalStatus {
  APPROVED = "Approved",
  NOTAPPROVED = "Not Approved",
}

export enum CardStatus {
  PENDING = "Pending",
  FAILED = "Failed",
  SUCCESS = "Success",
}

export enum RequestStatus {
  PENDING = "Pending",
  APPROVED = "Approved",
  NOTAPPROVED = "Not Approved",
}

export enum SelectCardStatus {
  PRINTED = "Printed",
  NOTPRINTED = "Not Printed",
  NOTPAID = "Not Paid",
}

export enum IssuanceStatus {
  ASSIGNED = "Assigned",
  UNASSIGNED = "Unassigned",
}

export enum InsuranceStatus {
  APPROVED = "Approved",
  NOTAPPROVED = "Not Approved",
}

export enum SelectCardType {
  COMPUTERIZED = "Computerized",
  CARD = "Card",
  STICKER = "Sticker",
  HEAVY = "Heavy",
  LEARNER = "Learner",
  GENERAL = "General",
  HACKNEY = "Hackney",
  RECEIPT = "Receipt",
  ROADWORTHYNESS = "Roadworthiness",
  NUMBERPLATE = "Numberplate",
  OWNERSHHIP = "Ownership",
  VEHICLE = "Vehicle",
  PLATE = "Plate",
  INSURANCE = "Insurance",
  POWC = "POWC",
  COO = "COO",
}

export enum IDTaxPayerMeans {
  NIN = "National Identification Number (NIN)",
  PHONENO = "Phone Number",
}

export enum SuperAdminPermissions {
  CANVIEWINVOICERECEIPT = "Can View Invoice/Receipt",
  CANVIEWPLATESALESREPORT = "Can View Plate Sales Report",
  CANSELLPLATES = "Can Sell Plates",
  DEFAULT = "Default",
  CANVIEWACTIVITYLOG = "Can View Activity Log",
  CANUPLOADSTOCK = "Can Upload Stock",
  CANAPPROVEPLATENUMBER = "Can Approve Plate Number",
  CANDELETESTOCK = "Can Delete Stock",
  CANAUDITROLES = "Can Audit Roles",
  CANVIEWVEHICLEMANAGEMENT = "Can View Vehicle Management",
  CANVIEWSALES = "Can View Sales",
  CANCREATEUSER = "Can Create User",
  CANCREATEROLES = "Can Create Roles",
  CANPRINTDOCUMENT = "Can Print Document",
  CANVIEWMLASTOCK = "Can View MLA Stock",
}

export enum PlateNumberType {
  COMMERCIAL = "Commercial",
  COMMERCIALMOTORCYCLE = "Commericial Motocycle",
  COMMERCIALTRICYCLE = "Commercial Tricycle",
  DEALER = "Dealer",
  FANCY = "Fancy",
  GOVERNFANCY = "Government Fancy",
  GOVERNOFFICIAL = "Government Official",
  OUTOFSERIES = "Out of Series",
  PRIVATE = "Private",
  PRIVATEMOTORCYCLE = "Private Motorcycle",
}

export enum PlateNumberSubType {
  PRIVATE = "Private",
  PRIVATEDIRECT = "Private (Direct)",
}

export enum AuthType {
  LOGIN = "Login",
  SIGNUP = "Sign Up",
  FORGOTPASSWORD = "ForgotPassword",
}

export enum PlateNumberOrderType {
  REQUEST = "Request",
  SALE = "Sale",
}

export enum PlateType {
  SALES = "Sales",
  RENEWAL = "Renewal",
}

export enum VehicleCategory {
  MOTOCYCLE = "Motocycle",
  TRICYCLE = "Tricycle",
  VEHICLE23 = "Vehicle Between 2.1 - 3.0",
  VEHICLE12 = "Vehicle Between 1.7 - 2.0",
  VEHICLE312 = "Vehicle Between 3.1 - 12.0",
  VEHICLEU16 = "Vehicle Under 1.6",
  BUSES = "Buses",
  CANTER = "Canter/Buses/P-UP",
  COACHES = "Coaches",
  TANKER = "Tanker/Truck/Luxury Buses",
  TIPPERS = "Tippers/Lorry",
  TRAILERS = "Trailers",
  TAXI = "Taxi",
}

export enum EngineCapacity {
  ABOVE100 = "Above 100cc",
  ABOVE2000 = "Above 2000cc",
  ABOVE3000 = "Above 3000cc",
  ABOVE7000 = "Above 7000cc",
  ABOVE8000 = "Above 8000cc",
  UP100 = "Up 100cc",
  UP2000 = "Up 2000cc",
  UP3000 = "Up 3000cc",
  UP7000 = "Up 7000cc",
  UP8000 = "Up 8000cc",
}

export enum LoadWeight {
  W11000 = "11000",
  W12000 = "12000",
  W1524 = "1524",
  W15241300 = "1524/1300",
  W16000 = "16000",
  W18000 = "18000",
  W800 = "8000",
  W964 = "964",
}

export enum ServiceType {
  AUTOALERT = "AUTOALERT",
  CHANGEOFOWNERSHIP = "CHANGE OF OWNERSHIP",
  DRIVERSTEST = "DRIVERS TEST",
  DRIVERSTESTFEE = "DRIVERS TEST FEE",
  DRIVERSCONDUCTORBADGES = "DRIVERS CONDUCTOR BADGES",
  HACKNEYPERMIT = "HACKNEY PERMIT",
  LEARNERSPERMIT = "LEARNERS PERMIT",
  LICENCEMOTORCYCLE = "LICENSE MOTORCYCLE/KEKE",
  MCRIDERSCARD = "M/C RIDERS CARD",
  PLATENUMBERMOTORDEALER = "PLATE NUMBER MOTOR DEALER",
  REGMC = "REG-M/C(PTE)",
  RENEWALDRIVINGTESTFEE = "RENEWAL OF DRIVING TEST FEE",
  RENEWALTRICYCLEDRIVINGTESTFEE = "RENEWAL OF TRICYCLE DRIVING TEST FEE",
  ROADWORTHYNESS = "ROADWORTHYNESS/ COMPUTERIZED VEHICLE",
  SMSALERT = "SMS ALERT",
  STICKER = "STICKER",
  STAMPDUTYTASK = "STAMP DUTY TASK",
  TRICYCLEDRIVINGTESTFEE = "TRICYCLE DRIVING TEST FEE",
  TESTMOTORCYCLEKEKE = "TEST-MOTORCYCLE/KEKE",
  VEHICLELICENSING = "VEHICLE LICENSE",
  VEHICLEREG = "VEHICLE REG",
  VEHICLETEST = "VEHICLE TEST/ ROADWORTHINESS",
}

export enum VehicleStatus {
  ACTIVE = "Active",
  INACTIVE = "Inactive",
}

export enum LinkedInvoice {
  LINKED = "LINKED",
  UNLINKED = "UNLINKED",
}

export enum VehicleMakes {
  Toyota = "Toyota",
  Honda = "Honda",
  Nissan = "Nissan",
  Ford = "Ford",
  Hyundai = "Hyundai",
  Kia = "Kia",
  MercedesBenz = "Mercedes-Benz",
  BMW = "BMW",
  Peugeot = "Peugeot",
  Volkswagen = "Volkswagen",
  Lexus = "Lexus",
  Mitsubishi = "Mitsubishi",
  LandRover = "Land Rover",
  Mazda = "Mazda",
  Chevrolet = "Chevrolet",
  Acura = "Acura",
  Audi = "Audi",
  Renault = "Renault",
  Opel = "Opel",
  Chery = "Chery",
  Suzuki = "Suzuki",
  Jeep = "Jeep",
  Infiniti = "Infiniti",
  // Indigenous Nigerian Manufacturers
  Innoson = "Innoson",
  Nord = "Nord",
  Proforce = "Proforce",
  OMAA = "OMAA",
  PhoenixRenewables = "Phoenix Renewables",
}

export enum VehicleModels {
  // Toyota
  Corolla = "Corolla",
  Camry = "Camry",
  Highlander = "Highlander",
  Hilux = "Hilux",
  RAV4 = "RAV4",
  Sienna = "Sienna",
  LandCruiser = "Land Cruiser",
  Yaris = "Yaris",
  Avensis = "Avensis",
  Prado = "Prado",

  // Honda
  Accord = "Accord",
  Civic = "Civic",
  CRV = "CR-V",
  Pilot = "Pilot",
  Odyssey = "Odyssey",

  // Nissan
  Altima = "Altima",
  Pathfinder = "Pathfinder",
  Sentra = "Sentra",
  XTrail = "X-Trail",
  Almera = "Almera",
  Murano = "Murano",

  // Ford
  Edge = "Edge",
  Explorer = "Explorer",
  Ranger = "Ranger",
  Escape = "Escape",
  F150 = "F-150",

  // Hyundai
  Elantra = "Elantra",
  Tucson = "Tucson",
  Sonata = "Sonata",
  SantaFe = "Santa Fe",
  Accent = "Accent",

  // Kia
  Rio = "Rio",
  Sportage = "Sportage",
  Cerato = "Cerato",
  Sorento = "Sorento",
  Optima = "Optima",

  // Mercedes-Benz
  CClass = "C-Class",
  EClass = "E-Class",
  GLE = "GLE",
  ML350 = "ML 350",
  GLC = "GLC",
  GClass = "G-Class",

  // BMW
  X3 = "X3",
  X5 = "X5",
  X6 = "X6",
  Series3 = "3 Series",
  Series5 = "5 Series",
  Series7 = "7 Series",

  // Peugeot
  Peugeot301 = "301",
  Peugeot508 = "508",
  Peugeot3008 = "3008",
  Peugeot5008 = "5008",

  // Volkswagen
  Golf = "Golf",
  Passat = "Passat",
  Jetta = "Jetta",
  Tiguan = "Tiguan",
  Touareg = "Touareg",

  // Lexus
  RX350 = "RX 350",
  GX460 = "GX 460",
  LX570 = "LX 570",
  ES350 = "ES 350",

  // Mitsubishi
  Pajero = "Pajero",
  Lancer = "Lancer",
  Outlander = "Outlander",

  // Land Rover
  RangeRover = "Range Rover",
  Discovery = "Discovery",
  Defender = "Defender",

  // Mazda
  Mazda3 = "Mazda3",
  Mazda6 = "Mazda6",
  CX5 = "CX-5",

  // Chevrolet
  Cruze = "Cruze",
  Malibu = "Malibu",
  Tahoe = "Tahoe",

  // Acura
  MDX = "MDX",
  RDX = "RDX",

  // Audi
  A4 = "A4",
  A6 = "A6",
  Q5 = "Q5",
  Q7 = "Q7",

  // Renault
  Duster = "Duster",
  Logan = "Logan",

  // Opel
  Astra = "Astra",
  Corsa = "Corsa",

  // Chery
  Tiggo8 = "Tiggo 8",
  Arrizo5 = "Arrizo 5",

  // Suzuki
  Dzire = "Dzire",
  Swift = "Swift",

  // Jeep
  Wrangler = "Wrangler",
  Cherokee = "Cherokee",

  // Infiniti
  QX60 = "QX60",
  QX80 = "QX80",

  // Indigenous Nigerian Models
  InnosonUm = "Umu Sedan",
  InnosonG5 = "G5",
  InnosonG6 = "G6",
  InnosonG12 = "G12",
  InnosonKeke = "Keke",
  NordA3 = "A3",
  NordA5 = "A5",
  NordMax = "Max",
  NordTank = "Tank",
  ProforceAra = "Ara",
  OMAABus = "OMAA Bus",
  PhoenixSolarCar = "Solar Car",
}

export const VehicleMakeModelMap: { [key in VehicleMakes]?: VehicleModels[] } =
  {
    [VehicleMakes.Toyota]: [
      VehicleModels.Corolla,
      VehicleModels.Camry,
      VehicleModels.Highlander,
      VehicleModels.Hilux,
      VehicleModels.RAV4,
      VehicleModels.Sienna,
      VehicleModels.LandCruiser,
      VehicleModels.Yaris,
      VehicleModels.Avensis,
      VehicleModels.Prado,
    ],
    [VehicleMakes.Honda]: [
      VehicleModels.Accord,
      VehicleModels.Civic,
      VehicleModels.CRV,
      VehicleModels.Pilot,
      VehicleModels.Odyssey,
    ],
    [VehicleMakes.Nissan]: [
      VehicleModels.Altima,
      VehicleModels.Pathfinder,
      VehicleModels.Sentra,
      VehicleModels.XTrail,
      VehicleModels.Almera,
      VehicleModels.Murano,
    ],
    [VehicleMakes.Ford]: [
      VehicleModels.Edge,
      VehicleModels.Explorer,
      VehicleModels.Ranger,
      VehicleModels.Escape,
      VehicleModels.F150,
    ],
    [VehicleMakes.Hyundai]: [
      VehicleModels.Elantra,
      VehicleModels.Tucson,
      VehicleModels.Sonata,
      VehicleModels.SantaFe,
      VehicleModels.Accent,
    ],
    [VehicleMakes.Kia]: [
      VehicleModels.Rio,
      VehicleModels.Sportage,
      VehicleModels.Cerato,
      VehicleModels.Sorento,
      VehicleModels.Optima,
    ],
    [VehicleMakes.MercedesBenz]: [
      VehicleModels.CClass,
      VehicleModels.EClass,
      VehicleModels.GLE,
      VehicleModels.ML350,
      VehicleModels.GLC,
      VehicleModels.GClass,
    ],
    [VehicleMakes.BMW]: [
      VehicleModels.X3,
      VehicleModels.X5,
      VehicleModels.X6,
      VehicleModels.Series3,
      VehicleModels.Series5,
      VehicleModels.Series7,
    ],
    [VehicleMakes.Peugeot]: [
      VehicleModels.Peugeot301,
      VehicleModels.Peugeot508,
      VehicleModels.Peugeot3008,
      VehicleModels.Peugeot5008,
    ],
    [VehicleMakes.Volkswagen]: [
      VehicleModels.Golf,
      VehicleModels.Passat,
      VehicleModels.Jetta,
      VehicleModels.Tiguan,
      VehicleModels.Touareg,
    ],
    [VehicleMakes.Lexus]: [
      VehicleModels.RX350,
      VehicleModels.GX460,
      VehicleModels.LX570,
      VehicleModels.ES350,
    ],
    [VehicleMakes.Mitsubishi]: [
      VehicleModels.Pajero,
      VehicleModels.Lancer,
      VehicleModels.Outlander,
    ],
    [VehicleMakes.LandRover]: [
      VehicleModels.RangeRover,
      VehicleModels.Discovery,
      VehicleModels.Defender,
    ],
    [VehicleMakes.Mazda]: [
      VehicleModels.Mazda3,
      VehicleModels.Mazda6,
      VehicleModels.CX5,
    ],
    [VehicleMakes.Chevrolet]: [
      VehicleModels.Cruze,
      VehicleModels.Malibu,
      VehicleModels.Tahoe,
    ],
    [VehicleMakes.Acura]: [VehicleModels.MDX, VehicleModels.RDX],
    [VehicleMakes.Audi]: [
      VehicleModels.A4,
      VehicleModels.A6,
      VehicleModels.Q5,
      VehicleModels.Q7,
    ],
    [VehicleMakes.Renault]: [VehicleModels.Duster, VehicleModels.Logan],
    [VehicleMakes.Opel]: [VehicleModels.Astra, VehicleModels.Corsa],
    [VehicleMakes.Chery]: [VehicleModels.Tiggo8, VehicleModels.Arrizo5],
    [VehicleMakes.Suzuki]: [VehicleModels.Dzire, VehicleModels.Swift],
    [VehicleMakes.Jeep]: [VehicleModels.Wrangler, VehicleModels.Cherokee],
    [VehicleMakes.Infiniti]: [VehicleModels.QX60, VehicleModels.QX80],
    [VehicleMakes.Innoson]: [
      VehicleModels.InnosonUm,
      VehicleModels.InnosonG5,
      VehicleModels.InnosonG6,
      VehicleModels.InnosonG12,
      VehicleModels.InnosonKeke,
    ],
    [VehicleMakes.Nord]: [
      VehicleModels.NordA3,
      VehicleModels.NordA5,
      VehicleModels.NordMax,
      VehicleModels.NordTank,
    ],
    [VehicleMakes.Proforce]: [VehicleModels.ProforceAra],
    [VehicleMakes.OMAA]: [VehicleModels.OMAABus],
    [VehicleMakes.PhoenixRenewables]: [VehicleModels.PhoenixSolarCar],
  };
