"use client";

import { useState } from "react";
import { useRouter } from "next/navigation"; // ✅ import router
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import DashboardCompSelect from "@/components/dashboard/dashboard-component-select";

export default function CreatePlateRequestPage() {
  const [step, setStep] = useState(1);
  const [plateType, setPlateType] = useState<string>("");
  const [subType, setSubType] = useState<string>("");
  const [plateCount, setPlateCount] = useState<number>(0);

  const router = useRouter(); // ✅ initialize router

  return (
    <main className="max-w-2xl mx-auto p-6 border rounded-lg shadow-md bg-white">
      <div className="flex justify-between items-center mb-6 bg-gray-100 p-4 rounded-t-lg">
        <h2 className="text-xl font-bold">Create New Plate Number Request</h2>
        <button
          onClick={() => router.back()} // ✅ go back to previous page
          className="text-red-600 hover:text-red-800"
          aria-label="Close form"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {step === 1 && (
        <div className="flex flex-col gap-6">
          <label className="text-sm font-medium">Select Plate Number Type</label>
          <DashboardCompSelect
            title=""
            placeholder="-- Select Type --"
            items={["Private", "Commercial"]}
            selected={plateType}
            onSelect={(selected) => {
              if (selected) {
                setPlateType(String(selected));
                setStep(2);
              }
            }}
          />
        </div>
      )}

      {step === 2 && (
        <div className="flex flex-col gap-8">
          <div className="bg-white">
            <label className="text-sm font-medium mb-1">Plate Number Type</label>
            <Input value={plateType} disabled />
          </div>

          <p className="text-center font-medium text-gray-700">
            Enter Plate Number Type Information
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <DashboardCompSelect
              title="Select Plate Number Sub. Type"
              placeholder="-- Select Type --"
              items={plateType === "Private" ? ["Direct", "Auto Dealer"] : ["Interstate", "Local"]}
              selected={subType}
              onSelect={(selected) => selected && setSubType(String(selected))}
            />

            <div>
              <label className="text-sm font-medium">Number of Plates</label>
              <Input
                type="number"
                min={0}
                value={plateCount}
                onChange={(e) => setPlateCount(Number(e.target.value))}
              />
            </div>
          </div>

          <div className="flex justify-center mt-6">
            <Button className="bg-green-800 text-white px-8 py-2 rounded-md">
              Submit
            </Button>
          </div>
        </div>
      )}
    </main>
  );
}
