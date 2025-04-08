"use client";

import { FC } from "react";
import { format } from "date-fns";

interface INotice {
  date: Date;
}

export const Notice: FC<INotice> = ({ date = new Date() }) => {
  const formattedDate = format(date.toDateString(), "MMMM d, yyyy");
  return (
    <div className={"flex flex-col gap-3 py-6"}>
      <p className={"text-sm font-bold"}>
        Notice: Police, VIO, FRSC and Others
      </p>
      <p className={"text-sm"}>
        This receipt serves as a temporary evidence of vehicle registration or
        renewal and it is valid until:{" "}
        <span className={"font-bold"}>Date: {formattedDate}</span>. After this
        date, the vehicle owner should posses their card-based license.
      </p>

      <p className={"text-sm"}>
        Please note that you can verify the validity of this receipt by scanning
        the QR code, or by entering the receipt number of this receipt on
        https://vics.services.kw.gov.ng/verfication.
      </p>
    </div>
  );
};
