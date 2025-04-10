import { FC, Dispatch, SetStateAction, ChangeEvent } from "react";
import UserProfile from "./user-profile";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useSelector } from "react-redux";
import { AuthState } from "@/store/auth/auth-user-types";

interface IDashboardNavBar {
  pageTitle: string;
  searchQuery: string;
  setSearchQuery: Dispatch<SetStateAction<string>>;
}

const DashboardNavBar: FC<IDashboardNavBar> = ({
  pageTitle,
  searchQuery,
  setSearchQuery,
}) => {
  const { user } = useSelector((state: { auth: AuthState }) => state.auth);

  const firstInitials = user?.firstname.charAt(0);
  const lastInitials = user?.lastname.charAt(0);

  return (
    <div className="flex items-center justify-between gap-4 w-full px-4 py-3 bg-white ">
      <div className="w-full flex items-center gap-6">
        <p className="font-bold text-lg uppercase hidden md:block">
          {pageTitle}
        </p>

        <div className="relative w-fit md:w-full max-w-md">
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
            size={20}
          />
          <Input
            type="text"
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-neutral-700 transition-all"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setSearchQuery(e.target.value)
            }
          />
        </div>
      </div>

      <UserProfile
        fullName={user?.firstname ?? "USERNAME"}
        role={user?.role ?? "Admin"}
        profileImage={user?.image ?? undefined}
        initials={`${firstInitials}.${lastInitials}`}
      />
    </div>
  );
};

export default DashboardNavBar;
