"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import CardContainer from "@/components/general/card-container";
import DashboardPath from "@/components/dashboard/dashboard-path";
import StepsDetails from "@/components/dashboard/steps-details";
import { ResponseModalX } from "@/components/general/response-modalx";
import { AddVehicleStep1 } from "@/components/dashboard/vehicle/new-vehicle/step1";
import { AddVehicleStep2 } from "@/components/dashboard/vehicle/new-vehicle/step2";
import { AddVehicleStep3 } from "@/components/dashboard/vehicle/new-vehicle/step3";
import {
  initialValuesStep1,
  inputVehiclePropsStep1,
  initialValuesStep2,
  IAddVehicleStep2Props,
  initialValuesStep3,
  inputVehiclePropsStep3,
} from "@/components/dashboard/vehicle/vehicle-constant";
import {
  selectVehicleOwnerIDFromName,
  selectVehicleDatafromID,
} from "@/store/vehicle/vehicle-selector";
import { VehicleService } from "@/services/VehicleService";
import { DashboardSVG, VehicleSVG } from "@/common/svgs";
import { ChevronLeft, ChevronRight } from "lucide-react";

const stepdetails = [
  {
    title: "Buyer's Details",
    description: "Kindly fill out the buyer's information",
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

export default function AddVehiclePage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const totalSteps = stepdetails.length;
  const [openModal, setOpenModal] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [step1Values, setStep1Values] =
    useState<inputVehiclePropsStep1>(initialValuesStep1);
  const [step2Values, setStep2Values] =
    useState<IAddVehicleStep2Props>(initialValuesStep2);
  const [step3Values, setStep3Values] =
    useState<inputVehiclePropsStep3>(initialValuesStep3);

  const vehicleService = new VehicleService(dispatch);
  const userID = useSelector((state) =>
    selectVehicleOwnerIDFromName(state, step1Values.userid)
  );
  const vehicleInfo = useSelector((state) =>
    selectVehicleDatafromID(state, userID)
  )[0];

  useEffect(() => {
    if (!userID || !vehicleInfo) return;

    setStep1Values((prev) => ({
      ...prev,
      fullName: `${vehicleInfo.owner?.firstname ?? ""} ${vehicleInfo.owner?.lastname ?? ""}`,
      email: vehicleInfo.owner?.email ?? "",
      phoneNumber: vehicleInfo.owner?.phone ?? "",
      address: vehicleInfo.owner?.address ?? "",
    }));

    setStep2Values({
      ...vehicleInfo,
      category: vehicleInfo.category?.toString() ?? "",
      netweight: vehicleInfo.weight?.toString() ?? "",
      vehicleenginecapacity: vehicleInfo.engine_capacity?.toString() ?? "",
    });

    setStep3Values((prev) => ({
      ...prev,
      plateNumber: vehicleInfo.plate_number?.number?.toString() ?? "",
      plateNumberType: vehicleInfo.type ?? "",
    }));
  }, [userID, vehicleInfo]);

  const handleStepChange = (direction: "next" | "prev") => {
    setCurrentStep((prev) =>
      direction === "next"
        ? Math.min(prev + 1, totalSteps)
        : Math.max(prev - 1, 1)
    );
  };

  const handleCreateVehicle = async () => {
    try {
      const payload = {
        state_id: vehicleInfo?.state_id,
        status: "Active",
        capacity: step2Values.capacity,
        chasis_number: step2Values.chasis_number,
        color: step2Values.color,
        engine_number: step2Values.engine_number,
        load: step2Values.load,
        make: step2Values.make,
        model: step2Values.model,
        year: step2Values.year,
        policy_sector: step2Values.policy_sector,
        category: step2Values.category,
        engine_capacity: step2Values.capacity,
        model_year: step2Values.year,
        no_of_persons: 25,
      };

      const res = await vehicleService.createVehicle(payload);
      if (res?.status) {
        setOpenModal(true);
      }
    } catch (error) {
      console.error("Failed to create vehicle:", error);
      toast.error("Failed to create vehicle.");
    }
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <AddVehicleStep1
            inputValues={step1Values}
            setInputValues={setStep1Values}
          />
        );
      case 2:
        return (
          <AddVehicleStep2
            inputValues={step2Values}
            setInputValues={setStep2Values}
          />
        );
      case 3:
        return (
          <AddVehicleStep3
            inputValues={step3Values}
            setInputValues={setStep3Values}
          />
        );
      default:
        return null;
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
          <div className="text-center">
            <p className="text-lg font-semibold">Registering New Vehicle</p>
            <p className="text-sm font-light">
              {stepdetails[currentStep - 1]?.description}
            </p>
          </div>

          <div className="w-full">{renderCurrentStep()}</div>

          <div className="flex justify-between items-center w-full">
            <Button variant="outline">Save as Draft</Button>
            <div className="flex gap-2 ml-auto">
              <Button
                variant="outline"
                className="flex items-center gap-1"
                onClick={() => handleStepChange("prev")}
                disabled={currentStep === 1}
              >
                <ChevronLeft /> Previous
              </Button>
              {currentStep === totalSteps ? (
                <Button onClick={handleCreateVehicle}>Proceed</Button>
              ) : (
                <Button
                  variant="outline"
                  className="flex items-center gap-1"
                  onClick={() => handleStepChange("next")}
                >
                  Next <ChevronRight />
                </Button>
              )}
            </div>
          </div>
        </CardContainer>

        <CardContainer>
          <StepsDetails activeStep={currentStep} steps={stepdetails} />
        </CardContainer>
      </div>

      <ResponseModalX
        title="New Vehicle was Registered Successfully"
        open={openModal}
        onClose={() => setOpenModal(false)}
        content={<></>}
        status="success"
        footerBtnText="Done"
        footerTrigger={() => router.push("/super-admin/vehicle")}
      />
    </main>
  );
}
