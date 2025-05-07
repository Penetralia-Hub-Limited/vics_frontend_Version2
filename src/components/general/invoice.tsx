"use client";

import { FC, useRef } from "react";
import CardContainer from "./card-container";
import { InformationCardX } from "./information-card";
import { AmountDisplay } from "./display-amount";
import PaymentTable from "./payment-summary-table";
import { PaymentItem } from "./payment-summary-table";
import { PaymentStatus } from "@/common/enum";
import { TermsAndConditions } from "./terms";
import LogoComponent from "./logo";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import html2canvas from "html2canvas-pro";
import { jsPDF } from "jspdf";
import QRCodeWithLogo from "./qr-code";
import BGLogo from "../../../public/assets/logo/KW_logo.png";
import logo from "../../../public/assets/logo/kwara_logo.webp";
import Icon from "../../../public/assets/logo/icon_green.svg";

interface cardInfo {
  label: string;
  value: string;
}

interface InvoiceProps {
  buyerInfo: cardInfo[];
  vehicleInfo: cardInfo[];
  state: string;
  data: {
    invoiceID: string;
  };
  invoice_link: string;
}

const paymentRows: Array<PaymentItem> = [
  {
    status: PaymentStatus.NOTPAID,
    description: "ROADWORTHINESS/COMPUTERIZED VEHICLE-PRIVATE CAR ABOVE 2000CC",
    quantity: 1,
    unitPrice: 3750,
    totalAmount: 3750,
    reference: "2025050312501",
  },
  {
    status: PaymentStatus.NOTPAID,
    description: "PLATE NUMBER VEHICLE - Private Vehicle Between 2.1 - 3.0",
    quantity: 1,
    unitPrice: 18750,
    totalAmount: 18750,
    reference: "2556505031201",
  },
  {
    description: "Motor Vehicle Operation Card Fee",
    status: PaymentStatus.NOTPAID,
    quantity: 1,
    unitPrice: 1000,
    totalAmount: 1 * 1000,
    reference: "3025050312501",
  },
  {
    description: "VEHICLE LICENSE-PRIVATE VEHICLE BETWEEN 2.1 - 3.0",
    status: PaymentStatus.NOTPAID,
    quantity: 1,
    unitPrice: 2500,
    totalAmount: 2500,
    reference: "2020000312501",
  },
  {
    description: "INSURANCE PRIVATE",
    status: PaymentStatus.NOTPAID,
    quantity: 1,
    unitPrice: 15000,
    totalAmount: 15000,
    reference: "2025052332501",
  },
];

const termsData = [
  {
    terms: "Receipt will be issued ONLY when payment is received.",
  },
  {
    terms:
      "The customer is responsible for any fees or charges associated with the payment method.",
  },
  {
    terms: "Payment must be made using the invoice number.",
  },
  {
    terms: "This invoice is valid for 30 days of the invoice date.",
  },
  {
    terms:
      "By making payment the customer agrees to this terms and conditions.",
  },
];

export const Invoice: FC<InvoiceProps> = ({
  state,
  invoice_link,
  buyerInfo,
  vehicleInfo,
}) => {
  const printRef = useRef(null);

  const handleDownloadPDF = async () => {
    const element = printRef.current;
    if (!element) return;

    try {
      const canvas = await html2canvas(element, {
        scale: 2,
      });
      const data = canvas.toDataURL("image/png");

      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "px",
        format: "a4",
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      pdf.addImage(data, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("invoice.pdf");
    } catch (error) {
      console.log(error as string);
    }
  };

  const getTotal = paymentRows.reduce(
    (acc, table) => acc + table.totalAmount,
    0
  );

  return (
    <div className={cn("flex flex-col gap-6")}>
      <div ref={printRef}>
        <CardContainer className="bg-white">
          <div
            className="flex flex-col gap-5 bg-contain bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(${BGLogo.src})`,
              backgroundSize: "80%",
            }}
          >
            <div>
              <LogoComponent logo={Icon} state={state} />
            </div>

            <div className={"py-4 flex flex-row items-center justify-between"}>
              <p className="text-xl font-bold">Invoice</p>
              <p className="text-xl uppercase font-bold">#INV{2343}</p>
            </div>

            <InformationCardX title={"Buyer Information"} data={buyerInfo} />
            <InformationCardX
              title={"Vehicle Information"}
              data={vehicleInfo}
            />

            <div
              className={
                "flex flex-col gap-3 border-1 border-neutral-300 rounded-lg"
              }
            >
              <div
                className={
                  "border-t-1 border-neutral-300 rounded-t-lg overflow-hidden"
                }
              >
                <PaymentTable data={paymentRows} />
              </div>
              <div className={"w-full border-t-1 border-neutral-300"}>
                <AmountDisplay amount={getTotal} />
              </div>
            </div>

            <div className={"grid md:grid-cols-[2fr_1fr] items-center pt-8"}>
              <TermsAndConditions termsData={termsData} />
              <QRCodeWithLogo value={invoice_link} logoUrl={logo.src} />
            </div>
          </div>
        </CardContainer>
      </div>

      <div className={"flex flex-row gap-4 mx-auto w-fit"}>
        <Button
          onClick={handleDownloadPDF}
          className={cn("w-fit mx-auto")}
          variant={"outline"}
        >
          Download Invoice
        </Button>
        <Button
          onClick={handleDownloadPDF}
          className={cn("w-fit mx-auto")}
          variant={"default"}
        >
          Send to Email
        </Button>
      </div>
    </div>
  );
};
