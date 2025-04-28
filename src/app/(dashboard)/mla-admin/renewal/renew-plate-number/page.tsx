"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import CardContainer from "@/components/general/card-container";
import DashboardPath from "@/components/dashboard/dashboard-path";
import { DashboardSVG, RenewalsSVG } from "@/common/svgs";
import { RenewPlateNumberStep1 } from "@/components/dashboard/mla-admin/renewals/renew-plate-number/step1";
import { RenewPlateNumberStep2 } from "@/components/dashboard/mla-admin/renewals/renew-plate-number/step2";
import { RenewPlateNumberStep3 } from "@/components/dashboard/mla-admin/renewals/renew-plate-number/step3";
import { RenewPlateNumberStep4 } from "@/components/dashboard/mla-admin/renewals/renew-plate-number/step4";
import { ChevronRight, ChevronLeft } from "lucide-react";
import StepsDetails from "@/components/dashboard/steps-details";
import ResponseModal from "@/components/general/response-modal";
import {
  initialValuesStep1,
  inputRenewPlateNumberPropsStep1,
  initialValuesStep2,
  inputRenewPlateNumberPropsStep2,
  initialValuesStep3,
  inputRenewPlateNumberPropsStep3,
  inputRenewPlateNumberPropsStep4,
} from "@/components/dashboard/mla-admin/renewals/renew-plate-number/renew-plate-constant";

const stepdetails = [
  {
    title: "Buyer's Details",
    description: "Kindly fill out the buyers information",
  },
  {
    title: "Vehicle Information",
    description: "Kindly fill out the vehicle's information",
  },
  {
    title: "Plate Number Details",
    description: "Kindly fill out the plate number information",
  },
  {
    title: "Applicable Services",
    description: "Select applicable services for plate number renewal",
  },
];

export default function Page() {
  const router = useRouter();
  const totalSteps = stepdetails.length;
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [step1InputValues, setStep1InputValues] =
    useState<inputRenewPlateNumberPropsStep1>(initialValuesStep1);

  const [step2InputValues, setStep2InputValues] =
    useState<inputRenewPlateNumberPropsStep2>(initialValuesStep2);

  const [step3InputValues, setStep3InputValues] =
    useState<inputRenewPlateNumberPropsStep3>(initialValuesStep3);

  const [step4InputValues, setStep4InputValues] =
    useState<inputRenewPlateNumberPropsStep4>({
      selectedServices: {},
    });

  const handleNextStep = () => {
    setCurrentStep((prev) => (prev < totalSteps ? prev + 1 : prev));
  };

  const handlePreviousStep = () => {
    setCurrentStep((prev) => (prev > 1 ? prev - 1 : prev));
  };

  return (
    <main className="flex flex-col gap-8 md:gap-12">
      <DashboardPath
        pathdata={[
          {
            label: "Dashboard",
            Icon: DashboardSVG,
            link: "/mla-admin/dashboard",
          },
          {
            label: "Renewal Dashboard",
            Icon: RenewalsSVG,
            link: "/mla-admin/renewal/renewal-dashboard",
          },
          {
            label: "Renew Plate Number",
            Icon: RenewalsSVG,
            link: "/mla-admin/renewal/renew-plate-number",
          },
        ]}
      />

      <div className="grid grid-cols-[2fr_1fr] gap-2 w-full">
        <CardContainer className="flex flex-col gap-10 items-center justify-center">
          <div className="flex flex-col gap-2 items-center justify-center">
            <p className="text-lg font-semibold">Renew Plate Number</p>
            <p className="text-sm font-light">
              {stepdetails[currentStep - 1]?.description}
            </p>
          </div>

          {/* Steps */}
          <div className="w-full">
            {currentStep === 1 && (
              <RenewPlateNumberStep1
                inputValues={step1InputValues}
                setInputValues={setStep1InputValues}
              />
            )}
            {currentStep === 2 && (
              <RenewPlateNumberStep2
                inputValues={step2InputValues}
                setInputValues={setStep2InputValues}
              />
            )}
            {currentStep === 3 && (
              <RenewPlateNumberStep3
                inputValues={step3InputValues}
                setInputValues={setStep3InputValues}
              />
            )}
            {currentStep === 4 && (
              <RenewPlateNumberStep4
                inputValues={step4InputValues}
                setInputValues={setStep4InputValues}
              />
            )}
          </div>

          {/* Navigation Buttons */}
          <div className="flex flex-row items-center justify-between w-full">
            <Button variant="outline">Save as Draft</Button>

            <div className="flex flex-row gap-2 items-center ml-auto">
              <Button
                variant="outline"
                className="flex flex-row items-center gap-1"
                onClick={handlePreviousStep}
                disabled={currentStep === 1}
              >
                <ChevronLeft />
                <p>Previous</p>
              </Button>

              {currentStep === totalSteps ? (
                <ResponseModal
                  title={"Success"}
                  content={<p>Invoice Issued Successfully</p>}
                  btnText={"Proceed"}
                  trigger={() => router.push("/mla-admin/renewal/dashboard")}
                  footerBtnText={"Done"}
                />
              ) : (
                <Button
                  variant="outline"
                  className="flex flex-row items-center gap-1"
                  onClick={handleNextStep}
                  disabled={currentStep === totalSteps}
                >
                  <p>Next</p>
                  <ChevronRight />
                </Button>
              )}
            </div>
          </div>
        </CardContainer>

        <CardContainer>
          <StepsDetails activeStep={currentStep} steps={stepdetails} />
        </CardContainer>
      </div>
    </main>
  );
}
