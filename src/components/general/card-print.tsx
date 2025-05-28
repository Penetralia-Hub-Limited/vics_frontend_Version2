"use client";

import { FC, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import CardContainer from "./card-container";
import { Button } from "../ui/button";
import QRCodeWithLogo from "./qr-code";
import Barcode from "react-barcode";

interface ICardData {
  front: CardFrontProp;
  back: CardBackProp;
}

const CardPrint = (data: ICardData) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const handlePrint = useReactToPrint({ documentTitle: "Card", contentRef });

  return (
    <div className={"flex flex-col gap-4"}>
      <CardContainer className="flex items-center ">
        <div
          ref={contentRef}
          className={"grid grid-rows-2 gap-8 items-center justify-center"}
        >
          <div className={"flex flex-col gap-4"}>
            <p className={"noprint font-bold"}>Front View</p>
            <CardFront {...data.front} />
          </div>
          <div className={"flex flex-col gap-4"}>
            <p className={" noprint font-bold"}>Back View</p>
            <CardBack {...data.back} />
          </div>
        </div>
      </CardContainer>

      <Button onClick={() => handlePrint()}>Print</Button>
    </div>
  );
};

export default CardPrint;

interface CardFrontProp {
  issuePlace?: string;
  platenumber?: string;
  stateId?: string;
  plateType?: string;
  nationality?: string;
  activationdate?: Date | string | null;
  expirydate?: Date | string | null;
  cardowner?: string;
  address?: string;
}

const CardFront: FC<CardFrontProp> = (data) => {
  return (
    <div className="space-y-3 backdrop-blur-md shadow-lg border border-neutral-100 rounded-2xl overflow-hidden">
      <div
        className={"pt-5 px-5 flex flex-row gap-5 items-center justify-between"}
      >
        <img
          className={"w-auto h-15 md:h-20 object-cover"}
          src={"/assets/logo/flag.png"}
          alt={"nigerian flag"}
        />
        <div>
          <p
            className={
              "font-black print text-primary-500 text-center text-xl md:text-2xl uppercase"
            }
          >
            FEDERAL REPUBLIC OF NIGERIA
          </p>
          <p
            className={
              "font-bold text-primary-500 text-center uppercase text-lg text-xl"
            }
          >
            KWARA STATE GOVERNMENT
          </p>
        </div>
        <img
          className={"w-auto h-15 md:h-20 object-cover"}
          src={"/assets/logo/vics-logo.png"}
          alt={"vics logo"}
        />
      </div>

      <div className="relative p-5 bg-[url(/assets/images/card-bg.png)]">
        <div
          className={
            "absolute inset-0 bg-[url(/assets/logo/vics-logo.png)] opacity-10 bg-center bg-contain bg-no-repeat"
          }
        ></div>
        <div className={"relative z-40 opacity-100 flex flex-col gap-5"}>
          <div className="grid grid-cols-2">
            <div className="flex flex-col">
              <p className={"text-xs"}>Place of Issue</p>
              <p className={"text-base text-wrap font-bold"}>
                {data.issuePlace ?? "----"}
              </p>
            </div>

            <div className="flex flex-col">
              <p className={"text-xs"}>Plate Number</p>
              <p className={"text-base text-wrap font-bold"}>
                {data.platenumber ?? "----"}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2">
            <div className="flex flex-col">
              <p className={"text-xs"}>Kwara State Identification Number</p>
              <p className={"text-base text-wrap font-bold"}>
                {data.stateId ?? "----"}
              </p>
            </div>

            <div className="flex flex-col">
              <p className={"text-xs"}>Plate Type</p>
              <p className={"text-base text-wrap font-bold"}>
                {data.plateType ?? "----"}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2">
            <div className="flex flex-col">
              <p className={"text-xs"}>Nationality</p>
              <p className={"text-base text-wrap font-bold"}>
                {data.nationality ?? "----"}
              </p>
            </div>

            <div className="flex flex-col">
              <p className={"text-xs"}>Registration Date</p>
              <p className={"text-base text-wrap font-bold"}>
                {data.activationdate
                  ? new Date(data.activationdate).toLocaleDateString()
                  : "----"}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2">
            <div className="flex flex-col">
              <p className={"text-xs"}>Expiry Date</p>
              <p className={"text-base text-wrap font-bold"}>
                {data.expirydate
                  ? new Date(data.expirydate).toLocaleDateString()
                  : "----"}
              </p>
            </div>

            <div className="flex flex-col">
              <p className={"text-xs"}>Owners Name</p>
              <p className={"text-base text-wrap font-bold"}>
                {data.cardowner ?? "----"}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2">
            <div className="flex flex-col">
              <p className={"text-xs"}>Address</p>
              <p className={"text-base text-wrap font-bold"}>
                {data.address ?? "----"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface CardBackProp {
  cardno?: number;
  chasisno?: string;
  engineno?: string;
  color?: string;
  year?: number;
  make?: string;
  model?: string;
  category?: string;
  weight?: number;
  capacity?: number;
  insurancecompany?: string | null;
  policy_sector?: string | null;
  permits?: string[] | null;
  expirydate?: Date | string | null;
}

const CardBack: FC<CardBackProp> = (data) => {
  return (
    <div className="backdrop-blur-md shadow-lg border border-neutral-100 rounded-2xl overflow-hidden">
      <div className="relative p-5 bg-[url(/assets/images/card-bg.png)]">
        <div
          className={
            "absolute inset-0 bg-[url(/assets/logo/vics-logo.png)] opacity-10 bg-center bg-contain bg-no-repeat"
          }
        ></div>

        <div className={"space-y-3"}>
          <p className={"font-bold uppercase text-primary-700"}>
            Vehicle Particulars
          </p>

          <div className={"relative z-40 opacity-100 flex flex-col gap-5"}>
            {/* ROW 1 */}
            <div className="grid grid-cols-3">
              <div className="flex flex-col">
                <p className={"text-xs"}>Chasis Number</p>
                <p className={"text-base text-wrap font-bold"}>
                  {data.chasisno ?? "----"}
                </p>
              </div>

              <div className="flex flex-col">
                <p className={"text-xs"}>Engine Number</p>
                <p className={"text-base text-wrap font-bold"}>
                  {data.engineno ?? "----"}
                </p>
              </div>

              <div className="flex flex-col">
                <p className={"text-xs"}>Color</p>
                <p className={"text-base text-wrap font-bold"}>
                  {data.color ?? "----"}
                </p>
              </div>
            </div>

            {/* ROW 2 */}
            <div className="grid grid-cols-3">
              <div className="flex flex-col">
                <p className={"text-xs"}>Model Year</p>
                <p className={"text-base text-wrap font-bold"}>
                  {data.year ?? "----"}
                </p>
              </div>

              <div className="flex flex-col">
                <p className={"text-xs"}>Make</p>
                <p className={"text-base text-wrap font-bold"}>
                  {data.make ?? "----"}
                </p>
              </div>

              <div className="flex flex-col">
                <p className={"text-xs"}>Model</p>
                <p className={"text-base text-wrap font-bold"}>
                  {data.model ?? "----"}
                </p>
              </div>
            </div>

            {/* ROW 3 */}
            <div className="grid grid-cols-3">
              <div className="flex flex-col">
                <p className={"text-xs"}>Category</p>
                <p className={"text-base text-wrap font-bold"}>
                  {data.category ?? "----"}
                </p>
              </div>

              <div className="flex flex-col">
                <p className={"text-xs"}>Weight</p>
                <p className={"text-base text-wrap font-bold"}>
                  {data.weight ?? "----"}
                </p>
              </div>

              <div className="flex flex-col">
                <p className={"text-xs"}>Seating Capacity</p>
                <p className={"text-base text-wrap font-bold"}>
                  {data.capacity ?? "----"}
                </p>
              </div>
            </div>

            {/* ROW 4 */}
            <div className="grid grid-cols-3">
              <div className="flex flex-col">
                <p className={"text-xs"}>Insurance Company</p>
                <p className={"text-base text-wrap font-bold"}>
                  {data.insurancecompany ?? "----"}
                </p>
              </div>

              <div className="flex flex-col">
                <p className={"text-xs"}>Insurance Policy</p>
                <p className={"text-base text-wrap font-bold"}>
                  {data.policy_sector ?? "----"}
                </p>
              </div>

              <div className="flex flex-col">
                <p className={"text-xs"}>Permits</p>
                <div className={"text-base text-wrap font-bold"}>
                  {data.permits
                    ? data.permits.map(
                        (item, index) =>
                          item +
                          (index + 1 === data?.permits?.length ? " " : ", ")
                      )
                    : "----"}
                </div>
              </div>
            </div>

            {/* ROW 5 */}
            <div className="grid grid-cols-2">
              <div className="col-span-1 flex flex-col">
                <p className={"text-xs"}>Road Worthiness</p>
                <p className={"text-base text-wrap font-bold"}>
                  Valid Till:{" "}
                  {data.expirydate
                    ? new Date(data.expirydate).toLocaleDateString()
                    : "----"}
                </p>
              </div>

              <div className={"flex justify-end w-full"}>
                <div className="flex flex-row items-center gap-4">
                  <div className="place-self-end bg-gray-200 rounded-lg p-2">
                    <Barcode
                      width={2}
                      height={40}
                      fontSize={16}
                      value={data?.cardno?.toString() ?? ""}
                    />
                  </div>
                  <div className="place-self-end bg-gray-200 rounded-lg p-2">
                    <QRCodeWithLogo value={""} size={65} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
