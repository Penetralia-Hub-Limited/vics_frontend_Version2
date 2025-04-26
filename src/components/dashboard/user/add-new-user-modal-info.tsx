"use client";

import { FC, Dispatch, SetStateAction } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import InputWithLabel from "@/components/auth/input-comp";
import DashboardCompSelect from "../dashboard-component-select";
import { Role, SuperAdminPermissions } from "@/common/enum";

export const AddUserModalInitialState = {
  firstname: "",
  lastname: "",
  email: "",
  phone: "",
  address: "",
  state: "",
  taxOffice: "",
  role: null,
};

export interface AddUserModalProp {
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  address: string;
  state: string;
  taxOffice: string;
  role: Role | null;
}

interface IAddNewUserInfo {
  input: AddUserModalProp;
  setInput: Dispatch<SetStateAction<AddUserModalProp>>;
}

export const AddNewUserInfo: FC<IAddNewUserInfo> = ({ input, setInput }) => {
  const states = useSelector((state: RootState) => state.states);
  const filteredState = states.states.map((state) => state.name);

  return (
    <div
      className={
        "py-2 px-4 flex flex-col gap-3 scrollbar-width overflow-y-scroll max-h-[400px]"
      }
    >
      <div className={"grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-3"}>
        <InputWithLabel
          items={{
            id: "firstName",
            label: "First Name",
            placeholder: "First Name",
            type: "text",
            htmlfor: "firstName",
          }}
          value={input.firstname}
          onChange={(e) =>
            setInput((prev) => ({
              ...prev,
              firstname: e.target.value,
            }))
          }
        />
        <InputWithLabel
          items={{
            id: "lastName",
            label: "Last Name",
            placeholder: "Last Name",
            type: "text",
            htmlfor: "lastName",
          }}
          value={input.lastname}
          onChange={(e) =>
            setInput((prev) => ({
              ...prev,
              lastname: e.target.value,
            }))
          }
        />
      </div>

      <div className={"grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-3"}>
        <InputWithLabel
          items={{
            id: "email",
            label: "Email Address",
            placeholder: "Email Address",
            type: "email",
            htmlfor: "email",
          }}
          value={input.email}
          onChange={(e) =>
            setInput((prev) => ({
              ...prev,
              email: e.target.value,
            }))
          }
        />
        <InputWithLabel
          items={{
            id: "phone",
            label: "Phone Number",
            placeholder: "Phone Number",
            type: "text",
            htmlfor: "phone",
          }}
          value={input.phone}
          onChange={(e) =>
            setInput((prev) => ({
              ...prev,
              phone: e.target.value,
            }))
          }
        />
      </div>

      <div>
        <InputWithLabel
          items={{
            id: "address",
            label: "Address",
            placeholder: "Address",
            type: "text",
            htmlfor: "address",
          }}
          value={input.address}
          onChange={(e) =>
            setInput((prev) => ({
              ...prev,
              address: e.target.value,
            }))
          }
        />
      </div>

      <div className={"grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-3"}>
        <DashboardCompSelect
          title={"Select State"}
          placeholder={"-- Select State --"}
          items={filteredState}
          selected={input.state}
          onSelect={(selected) =>
            setInput((prev) => ({
              ...prev,
              state: String(selected),
            }))
          }
        />

        <DashboardCompSelect
          title={"Tax Office"}
          placeholder={"-- Select Office --"}
          items={["Abuja", "Lagos"]}
          selected={input.taxOffice}
          onSelect={(value) =>
            setInput((prev) => ({
              ...prev,
              taxOffice: value as string,
            }))
          }
        />
      </div>

      <div>
        <DashboardCompSelect
          title={"Role"}
          placeholder={"-- Select Role --"}
          items={[...Object.values(Role)]}
          selected={input.role ?? undefined}
          onSelect={(value) =>
            setInput((prev) => ({
              ...prev,
              role: (value as Role) ?? undefined,
            }))
          }
        />
      </div>
    </div>
  );
};

interface ICreateUserRole {
  roleName: string;
  setRoleName: Dispatch<SetStateAction<string>>;
  permissions: SuperAdminPermissions | undefined;
  setPermissions: Dispatch<SetStateAction<SuperAdminPermissions | undefined>>;
}

export const CreateUserRole: FC<ICreateUserRole> = ({
  roleName,
  setRoleName,
  permissions,
  setPermissions,
}) => {
  return (
    <div className={"p-4 flex flex-col gap-5 overflow-y-scroll"}>
      <InputWithLabel
        items={{
          id: "roleName",
          label: "Role Name",
          placeholder: "Role Name",
          type: "text",
          htmlfor: "roleName",
        }}
        value={roleName}
        onChange={(e) => setRoleName(e.target.value)}
      />

      <DashboardCompSelect
        title={"Permissions"}
        placeholder={"-- Select Permission --"}
        items={[...Object.values(SuperAdminPermissions)]}
        selected={permissions}
        onSelect={(value) =>
          setPermissions((value as SuperAdminPermissions) ?? undefined)
        }
      />
    </div>
  );
};
