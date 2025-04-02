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
  SMR = "SMR",
  STOREADMIN = "Store Admin",
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

export enum SelectCardStatus {
  PRINTED = "Printed",
  NOTPRINTED = "Not Printed",
  NOTPAID = "Not Paid",
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
