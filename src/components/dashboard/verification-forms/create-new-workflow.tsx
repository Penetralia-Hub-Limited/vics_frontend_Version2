"use client";

import { FC, Dispatch, SetStateAction } from "react";
import DashboardCompSelect from "../dashboard-component-select";
import { PlateNumberType, PlateNumberSubType } from "@/common/enum";
import {
  selectAdminFromName,
  selectSuperAdminFromName,
} from "@/store/user/user-selector";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { User } from "@/store/user/user-type";

export const CreateNewWorkFlowInitialValues = {
  approvingOffice: "",
  workflow_type: "",
  finalStage: "",
  superapprover: "",
};

export type CreateNewWorkFlowProp = {
  approvingOffice: string;
  workflow_type: string;
  finalStage: string;
  superapprover: string;
};

interface ICreateNewWorkFlow {
  input: CreateNewWorkFlowProp;
  setInput: Dispatch<SetStateAction<CreateNewWorkFlowProp>>;
}

export const CreateNewWorkFlow: FC<ICreateNewWorkFlow> = ({
  input,
  setInput,
}) => {
  const { users } = useSelector((userState: RootState) => userState.user);
  const admin = users
    .filter((user) => user.role === "Admin")
    .map((user) => `${user.firstname} ${user.lastname}`);

  const superAdmin = users
    .filter((user) => user.role === "Super Admin")
    .map((user) => `${user.firstname} ${user.lastname}`);

  return (
    <div className="flex flex-col gap-5 p-4">
      <DashboardCompSelect
        title={"Select Approving Officer"}
        placeholder={"-- Select Officer --"}
        items={admin}
        selected={input.approvingOffice}
        onSelect={(selected) =>
          setInput((prev) => ({
            ...prev,
            approvingOffice: selected as PlateNumberType,
          }))
        }
      />

      <div className={"flex item-center justify-center"}>
        <p className="font-semibold">Enter Workflow Details</p>
      </div>

      {input.approvingOffice && (
        <div className={"grid grid-cols-1 gap-3"}>
          <div>
            <DashboardCompSelect
              title={"Workflow Type"}
              placeholder={"-- Select Type --"}
              items={["WorkflowType1", "WorkflowType2", "WorkflowType3"]}
              selected={input.workflow_type}
              onSelect={(selected) =>
                setInput((prev) => ({
                  ...prev,
                  workflow_type: selected as PlateNumberSubType,
                }))
              }
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-2 w-full">
            <DashboardCompSelect
              title={"Final Stage"}
              placeholder={"-- Select Option --"}
              items={["stage1", "stage2", "stage3"]}
              selected={input.finalStage}
              onSelect={(selected) =>
                setInput((prev) => ({
                  ...prev,
                  finalStage: selected as string,
                }))
              }
            />

            <DashboardCompSelect
              title={"Super Approver"}
              placeholder={"-- Select Option --"}
              items={superAdmin}
              selected={input.superapprover}
              onSelect={(selected) =>
                setInput((prev) => ({
                  ...prev,
                  superapprover: selected as string,
                }))
              }
            />
          </div>
        </div>
      )}
    </div>
  );
};
