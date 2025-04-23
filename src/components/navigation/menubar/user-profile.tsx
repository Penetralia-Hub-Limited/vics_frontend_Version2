"use client";

import { FC, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ArrowDropDown } from "@mui/icons-material";
import AvatarProfile from "@/components/general/avatar-profile";
import AuthService from "@/services/AuthService";
import { AppDispatch } from "@/store/store";
import { useRouter } from "next/navigation";
import { AuthState } from "@/store/auth/auth-user-types";
import { toast } from "sonner";

interface IUserProfile {
  fullName: string;
  role: string;
  profileImage?: string;
  initials?: string;
}

const UserProfile: FC<IUserProfile> = ({
  fullName,
  role,
  profileImage,
  initials,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const authService = new AuthService(dispatch);
  const [openDropDown, setOpenDropDown] = useState<boolean>(false);
  const router = useRouter();

  const { isLoggedIn, data, isLoading } = useSelector(
    (state: { auth: AuthState }) => state.auth
  );

  useEffect(() => {
    if (!(isLoggedIn && data)) router.push("/login");
  }, [isLoggedIn, data, router]);

  const handleDropDown = () => {
    setOpenDropDown(!openDropDown);
  };

  async function handleLogOut() {
    router.replace("/login");
    try {
      await authService.logout();
    } catch (error) {
      console.error(error as unknown as string);
      toast("Error logging out.");
    }
  }

  return (
    <div className={"flex flex-row items-center w-fit gap-2 pr-3"}>
      <AvatarProfile
        classname={"w-10 h-10"}
        profileImage={profileImage}
        initials={initials ?? "S.A"}
      />
      <div className={"flex flex-col"}>
        <p className={"text-sm font-semibold uppercase"}>{fullName}</p>

        <div className={"relative"}>
          <div
            onClick={handleDropDown}
            className={"flex flex-row w-full items-center cursor-pointer"}
          >
            <p className={"text-[10px] font-light text-nowrap"}>{role}</p>
            <ArrowDropDown sx={{ fontSize: 15 }} className={""} />
          </div>

          {openDropDown && (
            <div
              className={
                "absolute top-[100%] bg-white cursor-pointer mt-2 p-3 border border-neutral-500 rounded-md z-40 shadow-sm"
              }
              onClick={handleLogOut}
            >
              <p className={"text-xs font-semibold"}>
                {isLoading ? "Loading..." : "Log Out"}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
