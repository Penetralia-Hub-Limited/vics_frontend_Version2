import { FC, Dispatch, SetStateAction } from "react";
import InputWithLabel from "@/components/auth/input-comp";
import DashboardCompSelect from "../dashboard-component-select";
import { Role, SuperAdminPermissions } from "@/common/enum";

export interface AddUserModalProp {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  address: string;
  zone: string;
  taxOffice: string;
  roles: Role | undefined;
}

interface IAddNewUserInfo {
  input: AddUserModalProp;
  setInput: Dispatch<SetStateAction<AddUserModalProp>>;
}

export const AddNewUserInfo: FC<IAddNewUserInfo> = ({ input, setInput }) => {
  return (
    <div className={"p-4 flex flex-col gap-5"}>
      <div className={"grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-3"}>
        <InputWithLabel
          items={{
            id: "firstName",
            label: "First Name",
            placeholder: "First Name",
            type: "text",
            htmlfor: "firstName",
          }}
          value={input.firstName}
          onChange={(e) =>
            setInput((prev) => ({
              ...prev,
              firstName: e.target.value,
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
          value={input.lastName}
          onChange={(e) =>
            setInput((prev) => ({
              ...prev,
              lastName: e.target.value,
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
            id: "phoneNumber",
            label: "Phone Number",
            placeholder: "Phone Number",
            type: "text",
            htmlfor: "phoneNumber",
          }}
          value={input.phoneNumber}
          onChange={(e) =>
            setInput((prev) => ({
              ...prev,
              phoneNumber: e.target.value,
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
          title={"Zone"}
          placeholder={"-- Select Zone --"}
          items={["Abuja", "Lagos"]}
          selected={input.zone}
          onSelect={(value) =>
            setInput((prev) => ({
              ...prev,
              zone: value as string,
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
          title={"Roles"}
          placeholder={"-- Select Role --"}
          items={[...Object.values(Role)]}
          selected={input.roles ?? undefined}
          onSelect={(value) =>
            setInput((prev) => ({
              ...prev,
              roles: (value as Role) ?? undefined,
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
