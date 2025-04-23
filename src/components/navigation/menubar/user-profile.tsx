"use client";

import { FC, useState, useRef, useEffect } from "react";
import { ArrowDropDown } from "@mui/icons-material";
import AvatarProfile from "@/components/general/avatar-profile";

interface IUserProfile {
  fullName: string;
  role: string;
  profileImage?: string;
}

const UserProfile: FC<IUserProfile> = ({ fullName, role, profileImage }) => {
  const [openDropDown, setOpenDropDown] = useState<boolean>(false);
  const dropDownRef = useRef<HTMLDivElement>(null);

  const handleDropDown = () => {
    setOpenDropDown((prev) => !prev);
  };

  const handleLogOut = () => {
    console.log("User logged out");
    setOpenDropDown(false); // Close dropdown after logout
  };

  const getInitials = (name: string) =>
    name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();

  // Detect clicks outside of dropdown to close it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropDownRef.current &&
        !dropDownRef.current.contains(event.target as Node)
      ) {
        setOpenDropDown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className={"flex flex-row items-center gap-2 pr-3"}>
      <AvatarProfile
        classname={"w-10 h-10"}
        profileImage={profileImage}
        initials={getInitials(fullName)}
      />
      <div className={"flex flex-col"}>
        <p className={"text-sm font-semibold uppercase"}>{fullName}</p>

        <div className={"relative"} ref={dropDownRef}>
          <div
            onClick={handleDropDown}
            onKeyDown={(e) => e.key === "Enter" && handleDropDown()}
            tabIndex={0}
            role="button"
            className={"flex flex-row items-center cursor-pointer"}
          >
            <p className={"text-[10px] font-light"}>{role}</p>
            <ArrowDropDown sx={{ fontSize: 15 }} />
          </div>

          {openDropDown && (
            <div
              className={
                "absolute top-[100%] bg-white cursor-pointer mt-2 p-3 border border-neutral-500 rounded-md z-40 shadow-sm"
              }
              onClick={handleLogOut}
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
