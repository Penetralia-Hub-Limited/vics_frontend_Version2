"use client";

import { FC, useState } from "react";
// import { useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
import {
  AccountBoxRounded,
  KeyboardArrowDownRounded,
} from "@mui/icons-material";
// import { logout } from "../../store/auth-slice";

interface IUserProfile {
  fullName: string;
  role: string;
}

const UserProfile: FC<IUserProfile> = ({ fullName, role }) => {
  // const navigate = useNavigate();
  // const dispatch = useDispatch();
  const [openDropDown, setOpenDropDown] = useState<boolean>(false);

  const handleDropDown = () => {
    setOpenDropDown(!openDropDown);
  };

  // const handleLogOut = () => {
  //   dispatch(logout());
  //   navigate("/login");
  // };

  return (
    <div className={"flex flex-row items-center gap-3"}>
      <AccountBoxRounded sx={{ fontSize: 40 }} className={"text-white"} />
      <div className={"flex flex-col"}>
        <p className={"text-sm font-semibold uppercase"}>{fullName}</p>

        <div className={"relative"}>
          <div
            onClick={handleDropDown}
            className={"flex flex-row items-center cursor-pointer"}
          >
            <p className={"text-[10px] font-light"}>{role}</p>
            <KeyboardArrowDownRounded sx={{ fontSize: 15 }} className={""} />
          </div>

          {openDropDown && (
            <div
              className={"absolute top-[100%] cursor-pointer"}
              onClick={() => {}}
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
