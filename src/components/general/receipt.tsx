"use client";

import { FC, useRef } from "react";
import CardContainer from "./card-container";
import { InformationCardX } from "./information-card";
import { AmountDisplay } from "./display-amount";
import PaymentTable from "./payment-summary-table";
import { PaymentItem } from "./payment-summary-table";
import { PaymentStatus } from "@/common/enum";
import LogoComponent from "./logo";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import html2canvas from "html2canvas-pro";
import { jsPDF } from "jspdf";
import BGLogo from "../../../public/assets/logo/KW_logo.png";
import { Notice } from "./notice";
import { Signature } from "./signature";
import QRCodeWithLogo from "./qr-code";
import logo from "../../../public/assets/logo/kwara_logo.webp";
import Icon from "../../../public/assets/logo/icon_green.svg";

interface cardInfo {
  label: string;
  value: string;
}

interface ReceiptProps {
  date: string;
  state: string;
  data: {
    plateNumberId: string;
  };
  userInfo: cardInfo[];
  vehicleInfo: cardInfo[];
  qrcode_link: string;
}

const paymentRows: PaymentItem[] = [
  {
    description: "Road Worthiness - Private Car Above 2200CC",
    status: PaymentStatus.NOTPAID,
    quantity: 1,
    unitPrice: 3500,
    totalAmount: 3500,
    reference: "2025050312501",
  },
  {
    description: "Insurance Private",
    status: PaymentStatus.PAID,
    quantity: 1,
    unitPrice: 15000,
    totalAmount: 15000,
    reference: "2025050312501",
  },
  {
    description: "Motor Vehicle Operations Card Fee",
    status: PaymentStatus.PAID,
    quantity: 1,
    unitPrice: 2000,
    totalAmount: 2000,
    reference: "2025050312501",
  },
  {
    description: "Vehicle REG - Private Vehicle Card",
    status: PaymentStatus.PAID,
    quantity: 1,
    unitPrice: 3250,
    totalAmount: 3250,
    reference: "2025050312501",
  },
  {
    description: "Plate Number Vehicle - Private Vehicle Cars up to 1.7",
    status: PaymentStatus.PAID,
    quantity: 1,
    unitPrice: 18750,
    totalAmount: 18750,
    reference: "2025050312501",
  },
  {
    description: "Vehicle License - Private Vehicle Cars up to 1.7",
    status: PaymentStatus.PAID,
    quantity: 1,
    unitPrice: 1870,
    totalAmount: 1870,
    reference: "2025050312501",
  },
];

export const Receipt: FC<ReceiptProps> = ({
  date,
  state,
  qrcode_link,
  userInfo,
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
              <p className="text-xl font-bold">Receipt</p>
              <p className="text-xl uppercase font-bold">#RC{233443}</p>
            </div>

            <CardContainer>
              <InformationCardX title={"Buyer Information"} data={userInfo} />
            </CardContainer>

            <CardContainer>
              <InformationCardX
                title={"Vehicle Information"}
                data={vehicleInfo}
              />
            </CardContainer>

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

            <div className={"grid md:grid-cols-[2fr_1fr] pt-5"}>
              <Notice date={new Date(date ?? new Date())} />
              <QRCodeWithLogo value={qrcode_link} logoUrl={logo.src} />
            </div>

            <Signature
              name={"Dr. John Doe"}
              role={"Chairman, Example VISC"}
              signature={"Signature (img)"}
            />
          </div>
        </CardContainer>
      </div>
      <Button
        onClick={handleDownloadPDF}
        className={cn("w-fit mx-auto")}
        variant={"outline"}
      >
        Print Invoice
      </Button>
    </div>
  );
};
