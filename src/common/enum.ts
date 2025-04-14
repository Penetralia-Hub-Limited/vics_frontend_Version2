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
  MLA = "MLA",
  Chairman = "Chairman",
  SMR = "Store Manager Rep",
  STOREADMIN = "Store Manager Admin",
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
  FAILED = "Failed",
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
}
