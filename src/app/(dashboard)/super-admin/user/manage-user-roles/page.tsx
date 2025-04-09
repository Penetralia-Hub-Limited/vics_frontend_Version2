"use client";

import { useState } from "react";
import DashboardPath from "@/components/dashboard/dashboard-path";
import { DashboardSVG, UsersSVG } from "@/common/svgs";
import RolePermissionsTable from "@/components/dashboard/user/user-management-table";
import Modal from "@/components/general/modal";
import { Button } from "@/components/ui/button";
import { CreateUserRole } from "@/components/dashboard/user/add-new-user-modal-info";
import { SuperAdminPermissions } from "@/common/enum";

export default function Page() {
  const [roleName, setRoleName] = useState<string>("");
  const [permissions, setPermissions] = useState<
    SuperAdminPermissions | undefined
  >(undefined);

  console.log(roleName, permissions);

  return (
    <main className={"flex flex-col gap-8 md:gap-12"}>
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
              link: "/super-admin/dashboard",
            },
            {
              label: "User Role Management",
              Icon: UsersSVG,
              link: "/super-admin/user/manage-user-roles",
            },
          ]}
        />

        <Modal
          title={"Create Role"}
          content={
            <CreateUserRole
              roleName={roleName}
              setRoleName={setRoleName}
              permissions={permissions}
              setPermissions={setPermissions}
            />
          }
          btnText={"Add New Role"}
          footerBtn={<Button type="submit">Submit</Button>}
        />
      </div>

      <RolePermissionsTable />
    </main>
  );
}
