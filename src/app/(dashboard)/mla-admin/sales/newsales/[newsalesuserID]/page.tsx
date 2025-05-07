"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "@/components/ui/button";
import CardContainer from "@/components/general/card-container";
import DashboardPath from "@/components/dashboard/dashboard-path";
import { DashboardSVG, SalesSVG } from "@/common/svgs";
import { ChevronRight, ChevronLeft } from "lucide-react";
import StepsDetails from "@/components/dashboard/steps-details";
import { PlateNumberService } from "@/services/PlateNumberService";
import { toast } from "sonner";
import { UserService } from "@/services/UserService";
import { VehicleService } from "@/services/VehicleService";
import Spinner from "@/components/general/spinner";

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
import { selectStateIDFromStateName } from "@/store/states/state-selector";
import { selectUserByID } from "@/store/user/user-selector";

import { NewPlateSalesStep1 } from "@/components/dashboard/sales/new-plate-sells/step1";
import { NewPlateSalesStep2 } from "@/components/dashboard/sales/new-plate-sells/step2";
import { NewPlateSalesStep3 } from "@/components/dashboard/sales/new-plate-sells/step3";
import { NewPlateSalesStep4 } from "@/components/dashboard/sales/new-plate-sells/step4";
import { Role, VehicleStatus } from "@/common/enum";

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
  const params = useParams<{ newsalesuserID: string }>();
  const dispatch = useDispatch();
  const totalSteps = stepdetails.length;
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [currentStep, setCurrentStep] = useState<number>(1);
  const userService = new UserService(dispatch);
  const vehicleService = new VehicleService(dispatch);
  const plateService = new PlateNumberService(dispatch);
  const userInfo = useSelector((state) =>
    selectUserByID(state, params.newsalesuserID)
  )[0];

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

  const state_id = useSelector((state) =>
    selectStateIDFromStateName(state, step1InputValues?.state)
  );

  useEffect(() => {
    if (!userInfo) return;
    setStep1InputValues((prev) => ({
      ...prev,
      fullName: `${userInfo?.firstname} ${userInfo?.lastname}`,
      ...userInfo,
    }));
  }, [userInfo]);

  const handleNextStep = () => {
    setCurrentStep((prev) => (prev < totalSteps ? prev + 1 : prev));
  };

  const handlePreviousStep = () => {
    setCurrentStep((prev) => (prev > 1 ? prev - 1 : prev));
  };

  const createNewPlateSalesRequest = async () => {
    setIsProcessing(true);
    try {
      const [firstname = "", lastname = ""] =
        step1InputValues.fullName?.split(" ") || [];

      // Construct user payload
      const userPayload = {
        state_id: state_id,
        firstname: firstname,
        lastname: lastname,
        role: Role.TAXPAYER,
        password: "Adminshd@23434",
        ...step1InputValues,
      };

      // If user does not exist, create one
      let newUser = userInfo;
      if (!userInfo) {
        const userRes = await userService.createUser(userPayload);
        if (!userRes.status) throw new Error("Failed to create user");
        newUser = userRes.data; // assuming the created user is in `data`
        console.log(userRes);
      }

      const vehiclePayload = {
        state_id,
        status: VehicleStatus.ACTIVE,
        owner_id: newUser?.id,
        ...step2InputValues,
      };

      const vehicleRes = await vehicleService.createVehicle(vehiclePayload);
      if (!vehicleRes) throw new Error("Failed to create vehicle");

      const platePayload = {
        state_id: state_id,
        agent_id: null,
        owner_id: newUser?.id,
        number_status: "Paid",
        number: step3InputValues.plateNumber,
        type: step3InputValues.type,
        status: "Sold",
      };

      // Create plate number
      const plateRes = await plateService.createPlateNumber(platePayload);
      if (!plateRes.status) throw new Error("Failed to create plate number");

      // if all passes, redirect to preview
      router.push(`/mla-admin/sales/salespreview/${newUser?.id}`);
      setIsProcessing(false);
    } catch (error) {
      setIsProcessing(false);
      if (error instanceof Error) {
        toast(`Error. ${error.message}`);
      } else {
        toast("Error. An unknown error occurred.");
      }
    }
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
            label: "Sales Dashboard",
            Icon: SalesSVG,
            link: "/mla-admin/sales/sales-dashboard",
          },
          {
            label: "Sell New Plate",
            Icon: SalesSVG,
            link: "/mla-admin/sales/new-sales",
          },
        ]}
      />

      <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-2 w-full">
        <CardContainer className="flex flex-col gap-10 items-center justify-center">
          <div className="flex flex-col gap-2 items-center justify-center">
            <p className="text-lg font-semibold">New Plate Sale</p>
            <p className="text-sm font-light text-center">
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
          <div className="flex flex-col gap-5 md:flex-row items-center justify-between w-full">
            <Button onClick={() => {}} variant="outline">
              Save as Draft
            </Button>

            <div className="flex flex-row gap-2 items-center md:ml-auto">
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
                  className="flex flex-row items-center gap-1"
                  onClick={createNewPlateSalesRequest}
                >
                  {isProcessing && (
                    <Spinner color="white" size={10} screen={"default"} />
                  )}
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
