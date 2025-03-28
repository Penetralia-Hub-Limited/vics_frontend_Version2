"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import CardContainer from "@/components/general/card-container";
import DashboardPath from "@/components/dashboard/dashboard-path";
import { DashboardSVG, VehicleSVG } from "@/common/svgs";
import { AddVehicleStep1 } from "@/components/dashboard/vehicle/new-vehicle/step1";
import { AddVehicleStep2 } from "@/components/dashboard/vehicle/new-vehicle/step2";
import { AddVehicleStep3 } from "@/components/dashboard/vehicle/new-vehicle/step3";
import { ChevronRight, ChevronLeft } from "lucide-react";
import StepsDetails from "@/components/dashboard/vehicle/steps-details";
import SuccessModal from "@/components/general/success-response";

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
];

export default function Page() {
  const router = useRouter();
  const totalSteps = stepdetails.length;
  const [currentStep, setCurrentStep] = useState<number>(1);

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
            link: "/store-manager-admin/dashboard",
          },
          {
            label: "Vehicle Dashboard",
            Icon: VehicleSVG,
            link: "/store-manager-admin/vehicle",
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
            <p className="text-lg font-semibold">Registering New Vehicle</p>
            <p className="text-sm font-light">
              {stepdetails[currentStep - 1]?.description}
            </p>
          </div>

          {/* Steps */}
          <div className="w-full">
            {currentStep === 1 && <AddVehicleStep1 />}
            {currentStep === 2 && <AddVehicleStep2 />}
            {currentStep === 3 && <AddVehicleStep3 />}
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
                <SuccessModal
                  button={
                    <Button>
                      <p>Proceed</p>
                    </Button>
                  }
                  successText={"New Vehicle was registered successfully"}
                  btnText={"Done"}
                  trigger={() => router.push("/super-admin/vehicle")}
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
