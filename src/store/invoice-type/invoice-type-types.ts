import { PaginationProp } from "@/common/types";

export interface InvoiceTypeData {
  id: string;
  company_id: string;
  creator_id: string;
  last_updated_id: string | null;
  state_id: string;
  invoice_id: string;
  offence_id: string | null;
  service_type_id: string | null;
  type: string; // "Offence" | "Service";
  amount: number;
  reference: string;
  reg_type: string;
  revenue_code: string;
  payment_status: string; // "Pending" | "Approved" | "Declined";
  sent_to_pwc: boolean;
  payment_date: string; // ISO date string
  expiry_date: string; // ISO date string
  created_at: string;
  updated_at: string;
}

export interface InvoiceTypeResponse {
  status: boolean;
  message: string;
  data: InvoiceTypeData[];
  pagination: PaginationProp;
}

export interface CreateInvoiceTypeProps {
  state_id: string; // [REQUIRED] ULID - Reference to states table
  invoice_id?: string; // [OPTIONAL] ULID - Parent invoice
  offence_id?: string; // [OPTIONAL] ULID - Linked offence
  service_type_id?: string; // [OPTIONAL] ULID - Linked service

  amount: number; // [REQUIRED] float - Invoice amount
  revenue_code: string; // [REQUIRED] string - Accounting code
  type?: "Offence" | "Service"; // [OPTIONAL] Enum: 'Offence'|'Service' (Default: 'Offence')
  reg_type?: string; // [OPTIONAL] Default: 'Standard'
  payment_status?: "Pending" | "Approved"; // [OPTIONAL] Default: 'Pending'
  sent_to_pwc?: boolean; // [OPTIONAL] Default: false
  reference?: string; // [OPTIONAL] Custom reference number
  expiry_date?: string; // [OPTIONAL] ISO8601 format
  payment_date?: string; // [OPTIONAL] ISO8601 format
}
