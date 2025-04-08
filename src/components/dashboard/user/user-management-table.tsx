import { Pencil } from "lucide-react";
import { SuperAdminPermissions } from "@/common/enum";

const RolePermissionsTable = () => {
  const roles = [
    {
      id: 1,
      role: "Super_Admin",
      permissions: [...Object.values(SuperAdminPermissions)],
    },
  ];

  return (
    <div className="py-4 sm:max-h-screen rounded-t-lg overflow-hidden">
      <table className="min-w-full bg-white border border-neutral-300 rounded-t-lg">
        <thead className="rounded-t-lg">
          <tr className={"bg-neutral-100 text-sm leading-normal rounded-t-lg"}>
            <th className="py-3 px-6 text-left text-sm capitalize">S/N</th>
            <th className="py-3 px-6 text-left text-sm capitalize">Role</th>
            <th className="py-3 px-6 text-left text-sm capitalize min-w-[600px] sm:w-[500px]">
              Permissions
            </th>
            <th className="py-3 px-6 text-center text-sm capitalize">Action</th>
          </tr>
        </thead>
        <tbody className="text-sm font-light">
          {roles.map((role, index) => (
            <tr
              key={role.id}
              className="border-b border-gray-200 divide-x-1 divide-solid divide-neutral-300"
            >
              <td className="py-3 px-6 text-left">{index + 1}</td>
              <td className="py-3 px-6 text-left">{role.role}</td>
              <td className="py-3 px-6 text-left flex flex-wrap gap-2 min-w-[600px] sm:w-[500px]">
                {role.permissions.map((permission, i) => (
                  <span
                    key={i}
                    className="bg-role text-white text-xs font-medium px-3 py-1 rounded-full"
                  >
                    {permission}
                  </span>
                ))}
              </td>
              <td className="py-3 px-6 text-center">
                <button className="text-neutral-700 hover:text-role cursor-pointer">
                  <Pencil size={18} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RolePermissionsTable;
