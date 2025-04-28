import { FC } from "react";
import LogoComponent from "@/components/general/logo";
import Logo from "../../../../public/assets/logo/icon_green.svg";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ISideBarProps } from "@/common/types";
import Link from "next/link";

interface ISideBar {
  sidebarData: ISideBarProps[];
}

const AppSidebar: FC<ISideBar> = ({ sidebarData }) => {
  return (
    <Sidebar className="border-neutral-300">
      {/* Sidebar Header */}
      <SidebarHeader className="py-6">
        <LogoComponent logo={Logo} state="kwara state" />
      </SidebarHeader>

      {/* Sidebar Content */}
      <SidebarContent>
        {sidebarData.map(({ navigation, groupName }, index) => (
          <SidebarGroup
            key={index}
            className="pb-2 border-b border-neutral-300"
          >
            <SidebarGroupLabel>{groupName}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu className="flex flex-col gap-1">
                {navigation.map(({ id, Icon, title, url, dropdown }) =>
                  dropdown && dropdown.length > 0 ? (
                    <Collapsible key={id}>
                      <CollapsibleTrigger className="group flex items-center justify-between w-full h-10 p-2 rounded-md hover:text-white hover:bg-primary-500 transition-all duration-150 cursor-pointer">
                        <div className="flex items-center gap-2">
                          {Icon && <Icon className="fill-neutral-800" />}
                          <span className="text-sm">{title}</span>
                        </div>
                        <ArrowDropDownIcon className="text-neutral-800 ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                      </CollapsibleTrigger>
                      <CollapsibleContent className="pl-2">
                        {dropdown.map((sub) =>
                          sub.dropdown && sub.dropdown.length > 0 ? (
                            <Collapsible key={sub.id}>
                              <CollapsibleTrigger className="group flex items-center justify-between w-full h-10 p-2 rounded-md hover:text-white hover:bg-primary-200 transition-all duration-150 cursor-pointer">
                                <div className="flex items-center gap-2">
                                  {sub.Icon && (
                                    <sub.Icon className="fill-neutral-800" />
                                  )}
                                  <span>{sub.title}</span>
                                </div>
                                <ArrowDropDownIcon className="text-neutral-800 ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                              </CollapsibleTrigger>
                              <CollapsibleContent className="pl-4">
                                {sub.dropdown.map((inner) => (
                                  <SidebarMenuItem key={inner.id}>
                                    <SidebarMenuButton asChild>
                                      {inner.url ? (
                                        <Link
                                          prefetch
                                          href={inner.url}
                                          className="h-10 flex items-center gap-2 p-2 text-sm rounded-md hover:bg-primary-200 hover:text-white"
                                        >
                                          {inner.title}
                                        </Link>
                                      ) : (
                                        <span className="h-10 flex items-center gap-2 p-2 text-sm rounded-md text-neutral-500 cursor-not-allowed">
                                          {inner.title}
                                        </span>
                                      )}
                                    </SidebarMenuButton>
                                  </SidebarMenuItem>
                                ))}
                              </CollapsibleContent>
                            </Collapsible>
                          ) : (
                            <SidebarMenuItem key={sub.id}>
                              <SidebarMenuButton asChild>
                                {sub.url ? (
                                  <Link
                                    prefetch
                                    href={sub.url}
                                    className="h-10 flex items-center gap-2 p-2 text-sm rounded-md hover:bg-primary-200 hover:text-white"
                                  >
                                    {sub.Icon && (
                                      <sub.Icon className="fill-neutral-800" />
                                    )}
                                    {sub.title}
                                  </Link>
                                ) : (
                                  <span className="h-10 flex items-center gap-2 p-2 text-sm rounded-md text-neutral-500 cursor-not-allowed">
                                    {sub.Icon && (
                                      <sub.Icon className="fill-neutral-800" />
                                    )}
                                    {sub.title}
                                  </span>
                                )}
                              </SidebarMenuButton>
                            </SidebarMenuItem>
                          )
                        )}
                      </CollapsibleContent>
                    </Collapsible>
                  ) : (
                    <SidebarMenuItem key={id}>
                      <SidebarMenuButton asChild>
                        {url ? (
                          <Link
                            prefetch
                            href={url}
                            className="h-10 flex items-center gap-2 p-2 text-sm rounded-md hover:bg-primary-500 hover:text-white"
                          >
                            {Icon && <Icon className="fill-neutral-800" />}
                            {title}
                          </Link>
                        ) : (
                          <span className="h-10 flex items-center gap-2 p-2 text-sm rounded-md text-neutral-500 cursor-not-allowed">
                            {Icon && <Icon className="fill-neutral-800" />}
                            {title}
                          </span>
                        )}
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  )
                )}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
    </Sidebar>
  );
};

export default AppSidebar;
