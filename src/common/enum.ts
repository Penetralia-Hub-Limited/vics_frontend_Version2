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
  UNASSIGNED = "Unassigned",
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
  SOLD = "Sold",
  SUCCESS = "Success",
}

export enum SelectCardStatus {
  PRINTED = "Printed",
  NOTPRINTED = "Not Printed",
  NOTPAID = "Not Paid",
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

export enum PlateStatus {
  SOLD = "Sold",
  NOTSOLD = "Not_sold",
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
