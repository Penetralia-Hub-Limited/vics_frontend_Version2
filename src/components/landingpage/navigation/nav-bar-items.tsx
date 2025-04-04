import Link from "next/link";
import { Button } from "@/components/ui/button";
import { landingPageNavigation } from "@/common/constant";

const NavBarItems = () => {
  return (
    <div
      className={"flex flex-col items-center justify-center md:flex-row gap-8"}
    >
      <div
        className={
          "flex flex-col md:flex-row gap-6 items-center justify-center my-auto"
        }
      >
        {landingPageNavigation.map(({ id, label, link }) => (
          <Link className={"capitalize text-center"} key={id} href={link}>
            {label}
          </Link>
        ))}
      </div>

      <Button className={"text-white"}>Login</Button>
    </div>
  );
};

export default NavBarItems;
