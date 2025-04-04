"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import CardContainer from "@/components/general/card-container";
import DashboardPath from "@/components/dashboard/dashboard-path";
import { DashboardSVG, VehicleSVG } from "@/common/svgs";
import {} from "@/components/dashboard/vehicle/new-vehicle/step1";

import { ChevronRight, ChevronLeft } from "lucide-react";
import StepsDetails from "@/components/dashboard/steps-details";
import SuccessModal from "@/components/general/success-response";

import {
  inputSalesPropsStep1,
  initialSalesValuesStep1,
  inputSalesPropsStep2,
  initialSalesValuesStep2,
  inputSalesPropsStep3,
  initialSalesValuesStep3,
  inputSalesPropsStep4,
  initialSalesValuesStep4,
} from "@/components/dashboard/sales/sales-constants";

import { NewPlateSalesStep1 } from "@/components/dashboard/sales/new-plate-sells/step1";
import { NewPlateSalesStep2 } from "@/components/dashboard/sales/new-plate-sells/step2";
import { NewPlateSalesStep3 } from "@/components/dashboard/sales/new-plate-sells/step3";
import { NewPlateSalesStep4 } from "@/components/dashboard/sales/new-plate-sells/step4";

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
    title: "Insurance Policy",
    description: "Kindly fill out the insurance policy details",
  },
];

export default function Page() {
  const router = useRouter();
  const totalSteps = stepdetails.length;
  const [currentStep, setCurrentStep] = useState<number>(1);

  // Input values start
  const [step1InputValues, setStep1InputValues] =
    useState<inputSalesPropsStep1>(initialSalesValuesStep1);

  const [step2InputValues, setStep2InputValues] =
    useState<inputSalesPropsStep2>(initialSalesValuesStep2);

  const [step3InputValues, setStep3InputValues] =
    useState<inputSalesPropsStep3>(initialSalesValuesStep3);

  const [step4InputValues, setStep4InputValues] =
    useState<inputSalesPropsStep4>(initialSalesValuesStep4);
  // Input values end

  console.log(step1InputValues, step2InputValues, step3InputValues);

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
            link: "/super-admin/dashboard",
          },
          {
            label: "Vehicle Dashboard",
            Icon: VehicleSVG,
            link: "/super-admin/vehicle",
          },
          {
            label: "Add New Vehicle",
            Icon: VehicleSVG,
            link: "/store-manager-admin/vehicle/add-new-vehicle",
          },
        ]}
      />

      <div className="grid grid-cols-[2fr_1fr] gap-2 w-full">
        <CardContainer className="flex flex-col gap-10 items-center justify-center">
          <div className="flex flex-col gap-2 items-center justify-center">
            <p className="text-lg font-semibold">New Plate Sale</p>
            <p className="text-sm font-light">
              {stepdetails[currentStep - 1]?.description}
            </p>
          </div>

          {/* Steps */}
          <div className="w-full">
            {currentStep === 1 && (
              <NewPlateSalesStep1
                inputValues={step1InputValues}
                setInputValues={setStep1InputValues}
              />
            )}
            {currentStep === 2 && (
              <NewPlateSalesStep2
                inputValues={step2InputValues}
                setInputValues={setStep2InputValues}
              />
            )}
            {currentStep === 3 && (
              <NewPlateSalesStep3
                inputValues={step3InputValues}
                setInputValues={setStep3InputValues}
              />
            )}
            {currentStep === 4 && (
              <NewPlateSalesStep4
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
                <Button
                  variant="outline"
                  className="flex flex-row items-center gap-1"
                  onClick={() =>
                    router.push("/super-admin/sales/sales-preview/1")
                  }
                  disabled={currentStep === totalSteps}
                >
                  <p>Preview</p>
                  <ChevronRight />
                </Button>
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
