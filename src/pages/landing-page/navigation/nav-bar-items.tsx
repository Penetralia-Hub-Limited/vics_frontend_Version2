"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { landingPageNavigation } from "@/common/constant";

const NavBarItems = () => {
  const router = useRouter();
  const pathName = usePathname();

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

      <Button onClick={() => router.push("/login")} className={"text-white"}>
        Login
      </Button>
    </div>
  );
};

export default NavBarItems;
