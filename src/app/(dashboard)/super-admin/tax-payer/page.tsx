"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Pagination from "@/components/general/pagination";
import CardContainer from "@/components/general/card-container";
import DatePicker from "@/components/dashboard/dashboard-datepicker";
import DashboardPath from "@/components/dashboard/dashboard-path";
import { DashboardSVG, TaxPayerSVG } from "@/common/svgs";
import InputWithLabel from "@/components/auth/input-comp";
import { DataTableWButton } from "@/components/dashboard/dashboard-table-w-button";
import { useSelector } from "react-redux";
import { selectTaxPayers } from "@/store/user/user-selector";
import {
  UserIdentificationModal,
  IUserIDInitialValues,
  UserIDProps,
} from "@/components/dashboard/verification-forms/user-identification";
import Modal from "@/components/general/modal";
import { IDTaxPayerMeans } from "@/common/enum";
import {
  RowAction,
  TableData,
} from "@/components/dashboard/dashboard-table-w-button";
import { ResponseModalX } from "@/components/general/response-modalx";
import { selectValidTaxPayer } from "@/store/user/user-selector";

const tableColumns = [
  { key: "sid" as const, title: "S/N" },
  { key: "firstname" as const, title: "First Name" },
  { key: "lastname" as const, title: "last Name" },
  { key: "phone" as const, title: "Phone Number" },
  { key: "email" as const, title: "Email" },
  { key: "date_created" as const, title: "Date" },
];

export default function Page() {
  const router = useRouter();
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [startDate, setStartDate] = useState<Date | undefined>();
  const [endDate, setEndDate] = useState<Date | undefined>();
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [isUserVerified, setIsUserVerified] = useState<boolean>(false);
  const [identificationMeans, setIdentificationMeans] =
    useState<IDTaxPayerMeans>(IDTaxPayerMeans.NIN);
  const [identificationInput, setIdentificationInput] =
    useState<UserIDProps>(IUserIDInitialValues);

  const taxPayers = useSelector(selectTaxPayers);

  const totalPages = Math.ceil(taxPayers.length / itemsPerPage);
  const paginatedData = taxPayers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const doesUserExist = useSelector((vehicle) =>
    selectValidTaxPayer(vehicle, {
      phoneNumber: identificationInput.phoneNumber,
      nin: identificationInput.nin,
    })
  );

  const handleSubmit = () => {
    setTimeout(() => {
      setOpenModal(true);
    }, 2000);

    if (doesUserExist !== undefined) {
      setIsUserVerified(true);
    } else {
      setIsUserVerified(false);
    }
  };

  const getRowActions = (row: unknown): RowAction[] => {
    const tableRow = row as TableData;
    return [
      {
        title: "Preview",
        action: () => router.push(`/super-admin/tax-payer/${tableRow.id}`),
      },
      {
        title: "Edit",
        action: () => console.log("Viewing details for:", tableRow),
      },
    ];
  };

  return (
    <main className={"flex flex-col gap-8 md:gap-12 overflow-hidden"}>
      <div
        className={
          "flex flex-col gap-5 md:flex-row justify-between items-center"
        }
      >
        <DashboardPath
          pathdata={[
            {
              label: "Dashboard",
              Icon: DashboardSVG,
              link: "/store-manager-admin/dashboard",
            },
            {
              label: "Tax Payer Dashboard",
              Icon: TaxPayerSVG,
              link: "/store-manager-admin/tax-payer",
            },
          ]}
        />

        <Modal
          title={"Add New Vehicle"}
          content={
            <UserIdentificationModal
              selected={identificationMeans}
              onSelect={setIdentificationMeans}
              input={identificationInput}
              setInput={setIdentificationInput}
            />
          }
          btnText={"Create New Tax Payer"}
          footerBtn={
            <Button onClick={handleSubmit} type="submit">
              Validate Tax Payer
            </Button>
          }
        />
      </div>

      <CardContainer className={"flex flex-col gap-5"}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
          <InputWithLabel
            items={{
              id: "firstname",
              label: "First Name",
              placeholder: "First Name",
              type: "text",
              htmlfor: "firstname",
            }}
          />
          <InputWithLabel
            items={{
              id: "lastname",
              label: "Last Name",
              placeholder: "Last Name",
              type: "text",
              htmlfor: "lastname",
            }}
          />
          <InputWithLabel
            items={{
              id: "email",
              label: "email",
              placeholder: "example@gmail.com",
              type: "email",
              htmlfor: "email",
            }}
          />
        </div>

        <div className={"grid grid-cols-1 md:grid-cols-4 gap-4 mt-4 items-end"}>
          <InputWithLabel
            items={{
              id: "phonenumber",
              label: "Phone Number",
              placeholder: "phone number",
              type: "text",
              htmlfor: "phonenumber",
            }}
          />

          <DatePicker
            date={startDate}
            setDate={setStartDate}
            title={"Start Date"}
          />
          <DatePicker date={endDate} setDate={setEndDate} title={"End Date"} />

          <Button>Search</Button>
        </div>
      </CardContainer>

      <div
        className={"flex flex-col gap-3 border-1 border-primary-300 rounded-lg"}
      >
        <div
          className={"border-t-1 border-primary-300 rounded-lg overflow-hidden"}
        >
          <DataTableWButton
            headers={tableColumns}
            data={paginatedData}
            rowActions={getRowActions}
          />
        </div>
        <div className={"p-5 ml-auto"}>
          <Pagination totalPages={totalPages} setCurrentPage={setCurrentPage} />
        </div>
      </div>

      <ResponseModalX
        title={
          isUserVerified ? "User Verified Successfully" : "User does not exist"
        }
        open={openModal}
        onClose={() => setOpenModal(false)}
        content={
          <>
            {isUserVerified ? (
              <div className="flex flex-col gap-4 py-5">
                <div className={"grid grid-cols-[1fr_2fr]"}>
                  <p className={"text-sm"}>Name:</p>
                  <p className={"text-sm font-semibold justify-self-end"}>
                    {doesUserExist?.firstname} {doesUserExist?.lastname}
                  </p>
                </div>
                <div className={"grid grid-cols-[1fr_2fr]"}>
                  <p className={"text-sm"}>Phone Number: </p>
                  <p className={"text-sm font-semibold justify-self-end"}>
                    {doesUserExist?.phone}
                  </p>
                </div>
                <div className={"grid grid-cols-[1fr_2fr]"}>
                  <p className={"text-sm"}>Address:</p>
                  <p
                    className={"text-sm font-semibold justify-self-end ml-auto"}
                  >
                    {doesUserExist?.address}
                  </p>
                </div>
              </div>
            ) : (
              <>Please check your details, and try again</>
            )}
          </>
        }
        status={isUserVerified ? "success" : "failed"}
        footerBtnText={"Continue"}
        footerTrigger={() => {}}
      />
    </main>
  );
}
