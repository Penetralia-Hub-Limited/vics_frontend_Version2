import { PaginationProp } from "@/common/types";

export type InvoiceData = {
  id: string;
  company_id: string;
  creator_id: string;
  last_updated_id: string | null;
  deactivated_by_id: string | null;
  state_id: string;
  vehicle_id: string;
  payer_id: string;
  approver_id: string;
  status: string;
  amount: number;
  invoice_number: string;
  payment_reference: string;
  payment_status: string; // come back to this
  sent_to_tax: boolean;
  vio_approved: boolean;
  edit_copy: boolean;
  payment_date: string;
  date_deactivated: string | null;
  created_at: string;
  updated_at: string;
};

export interface InvoiceResponse {
  status: boolean;
  message: string;
  data: InvoiceData[];
  pagination: PaginationProp;
}

export type CreateInvoicePayload = {
  state_id: string;
  amount: number;
  invoice_number: string;
  vehicle_id?: string;
  payment_reference?: string;
  payer_id?: string;
  approver_id?: string;
  status?: string; // "Paid" | "Not Paid";
  payment_status?: string; // "Approved" | "Pending";
  sent_to_tax?: boolean;
  vio_approved?: boolean;
  edit_copy?: boolean;
  payment_date?: string;
};
