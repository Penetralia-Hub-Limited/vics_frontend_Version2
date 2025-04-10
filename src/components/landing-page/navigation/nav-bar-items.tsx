"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { landingPageNavigation } from "@/common/constant";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "@/store/auth/auth-slice";
import { AppDispatch } from "@/store/store";
import { RootState } from "@/store/store";

const NavBarItems = () => {
  const router = useRouter();
  const pathName = usePathname();
  const dispatch = useDispatch<AppDispatch>();

  const { isLoggedIn } = useSelector((state: RootState) => state.auth);

  return (
    <div
      className={
        "flex flex-col items-center justify-center md:flex-row gap-8 w-full"
      }
    >
      <div
        className={
          "flex flex-col md:flex-row gap-6 items-center justify-center my-auto"
        }
      >
        {landingPageNavigation.map(({ id, label, link }) => (
          <Link
            className={`capitalize text-center pb-2 w-[5rem] 
            ${pathName === link ? "border-b-2 border-primary-500" : ""}
            focus-visible:border-b-2 focus-visible:border-primary-500`}
            key={id}
            href={link}
            shallow
          >
            {label}
          </Link>
        ))}
      </div>

      <Button
        onClick={() =>
          isLoggedIn ? dispatch(logout()) : router.push("/login")
        }
        className={"text-white"}
      >
        {isLoggedIn ? "Log out" : "Login"}
      </Button>
    </div>
  );
};

export default NavBarItems;
