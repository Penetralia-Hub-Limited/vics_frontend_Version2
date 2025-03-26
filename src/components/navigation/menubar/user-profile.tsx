"use client";

import { FC, useState } from "react";
import Image from "next/image";
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
    <div className={"flex flex-row items-center gap-2"}>
      {profileImage ? (
        <Image src={profileImage} alt={"user profile image"} />
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
              className={"absolute top-[100%] cursor-pointer"}
              // onClick={handleLogOut}
            >
              <p className={"text-xs text-white font-semibold"}>Log Out</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
