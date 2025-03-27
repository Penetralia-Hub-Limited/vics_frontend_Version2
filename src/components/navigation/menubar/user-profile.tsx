"use client";

import { FC, useState } from "react";
import { ArrowDropDown } from "@mui/icons-material";

interface IUserProfile {
  fullName: string;
  role: string;
  profileImage?: string;
}

const UserProfile: FC<IUserProfile> = ({ fullName, role, profileImage }) => {
  // const router = useRouter();
  const [openDropDown, setOpenDropDown] = useState<boolean>(false);

  const handleDropDown = () => {
    setOpenDropDown(!openDropDown);
  };

  return (
    <div className={"flex flex-row items-center gap-2 pr-3"}>
      {profileImage ? (
        <img
          loading={"lazy"}
          src={profileImage}
          width={50}
          height={50}
          alt={"user profile image"}
          className={"w-10 h-10 object-cover object-center rounded-full"}
        />
      ) : (
        <div
          className={
            "flex items-center justify-center bg-primary-500 w-10 h-10 rounded-full"
          }
        >
          <p>DI</p>
        </div>
      )}

      <div className={"flex flex-col"}>
        <p className={"text-sm font-semibold uppercase"}>{fullName}</p>

        <div className={"relative"}>
          <div
            onClick={handleDropDown}
            className={"flex flex-row items-center cursor-pointer"}
          >
            <p className={"text-[10px] font-light"}>{role}</p>
            <ArrowDropDown sx={{ fontSize: 15 }} className={""} />
          </div>

          {openDropDown && (
            <div
              className={
                "absolute top-[100%] bg-white cursor-pointer mt-2 p-3 border border-neutral-500 rounded-md z-40 shadow-sm"
              }
              // onClick={handleLogOut}
            >
              <p className={"text-xs font-semibold"}>Log Out</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
