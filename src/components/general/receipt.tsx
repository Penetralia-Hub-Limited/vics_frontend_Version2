"use client";

import { FC, useRef } from "react";
import CardContainer from "./card-container";
import { InformationCardX } from "./information-card";
import { AmountDisplay } from "./display-amount";
import PaymentTable from "./payment-summary-table";
import { PaymentItem } from "./payment-summary-table";
import { PaymentStatus } from "@/common/enum";
import LogoComponent from "./logo";
import { PlateNumberType } from "@/common/enum";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import html2canvas from "html2canvas-pro";
import { jsPDF } from "jspdf";
import BGLogo from "../../assets/logo/KW_logo.png";
import { Notice } from "./notice";
import { Signature } from "./signature";

interface ReceiptProps {
  icon: string;
  state: string;
  data: {
    receiptID: number;
  };
}

const cardData = [
  {
    label: "Full Name",
    value: "Bernard David Ikechukwu",
  },
  {
    label: "Email",
    value: "Bernard@DavidIkechukwu.com",
  },
  {
    label: "Phone Number",
    value: "23232323333",
  },
  {
    label: "Address",
    value: "121 Pastoral lane Briks",
  },
];

const vehicleData = [
  {
    label: "Chasis Number",
    value: 33435342324,
  },
  {
    label: "Engine Number",
    value: "JKLWJKJ348723",
  },
  {
    label: "Vehicle Make",
    value: "Mercedez-Benz",
  },
  {
    label: "Vehicle Model",
    value: "Mercedez E-300",
  },
  {
    label: "Vehicle Category",
    value: "Vehicle Between 3.0 - 4.0",
  },
  {
    label: "Plate Type",
    value: PlateNumberType.PRIVATE,
  },
  {
    label: "Plate Number",
    value: "MORORK232",
  },
  {
    label: "Color",
    value: "Black",
  },
];

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
    description: "Insurance Private",
    status: PaymentStatus.PAID,
    quantity: 1,
    unitPrice: 15000,
    totalAmount: 15000,
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
];

export const Receipt: FC<ReceiptProps> = ({ icon, state, data }) => {
  const { receiptID } = data;
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
              <LogoComponent logo={icon} state={state} />
            </div>

            <div className={"py-4 flex flex-row items-center justify-between"}>
              <p className="text-xl font-bold">Receipt</p>
              <p className="text-xl uppercase font-bold">
                #RC{receiptID ?? 233443}
              </p>
            </div>

            <CardContainer>
              <InformationCardX title={"Buyer's Information"} data={cardData} />
            </CardContainer>

            <CardContainer>
              <InformationCardX
                title={"Vehicle's Information"}
                data={vehicleData}
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
                <AmountDisplay amount={34230} />
              </div>
            </div>

            <div className={"grid md:grid-cols-[2fr_1fr]"}>
              <Notice date={new Date()} />
              <p>BAR CODE</p>
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
