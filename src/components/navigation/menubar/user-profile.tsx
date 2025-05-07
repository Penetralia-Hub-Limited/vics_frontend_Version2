"use client";

import { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ArrowDropDown } from "@mui/icons-material";
import AvatarProfile from "@/components/general/avatar-profile";
import AuthService from "@/services/AuthService";
import { AppDispatch } from "@/store/store";
import { useRouter } from "next/navigation";
import { AuthState } from "@/store/auth/auth-user-types";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
  const router = useRouter();

  const { isLoggedIn, data, isLoading } = useSelector(
    (state: { auth: AuthState }) => state.auth
  );

  useEffect(() => {
    if (!(isLoggedIn && data)) router.push("/login");
  }, [isLoggedIn, data, router]);

  async function handleLogOut() {
    try {
      await authService.logout();
      router.replace("/login");
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

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="flex flex-row gap-1 h-3" variant="logout">
              <p className={"ml-[-10px] text-[10px] font-light text-nowrap"}>
                {role}
              </p>
              <ArrowDropDown sx={{ fontSize: 15 }} className={""} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="min-w-5">
            <DropdownMenuItem className="cursor-pointer" onClick={handleLogOut}>
              <p className={"text-xs font-semibold"}>
                {isLoading ? "Loading..." : "Log Out"}
              </p>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default UserProfile;
