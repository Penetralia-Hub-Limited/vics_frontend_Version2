import { FC } from "react";

import LogoComponent from "../../general/logo";
import Logo from "@/assets/logo/icon_green.svg";
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

interface ISideBar {
  sidebarData: Array<ISideBarProps>;
}

const AppSidebar: FC<ISideBar> = ({ sidebarData }) => {
  return (
    <Sidebar className={"border-neutral-300"}>
      <SidebarHeader className={"py-6"}>
        <LogoComponent logo={Logo} state="kwara state" />
      </SidebarHeader>
      <SidebarContent>
        {sidebarData.map(({ navigation, groupName }, index) => (
          <SidebarGroup
            key={index}
            className={"pb-2 border-b border-neutral-300"}
          >
            <SidebarGroupLabel>{groupName}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu className="flex flex-col gap-1">
                {navigation.map(({ id, Icon, title, url, dropdown }) =>
                  dropdown && dropdown.length > 0 ? (
                    dropdown.some(
                      (sub) => sub.dropdown && sub.dropdown.length > 0
                    ) ? (
                      /** ✅ Multi-Level Dropdown → Keep nested collapsibles */
                      <Collapsible key={id}>
                        <CollapsibleTrigger className="group flex items-center justify-between w-full h-12 p-2 rounded-md hover:text-white hover:fill-white hover:bg-primary-500 transition-all ease-in-out duration-150 cursor-pointer">
                          <div className="flex items-center gap-2">
                            {Icon && <Icon className={"fill-neutral-800"} />}
                            <span className="text-sm">{title}</span>
                          </div>
                          <ArrowDropDownIcon className="text-neutral-800 ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                        </CollapsibleTrigger>
                        <CollapsibleContent className="pl-2">
                          {dropdown.map((sub) => (
                            <Collapsible key={sub.id}>
                              <CollapsibleTrigger className="group flex items-center justify-between w-full h-12 p-2 rounded-md hover:text-white hover:fill-white hover:bg-primary-500 transition-all ease-in-out duration-150 cursor-pointer">
                                <div className="flex items-center gap-2">
                                  {sub.Icon && (
                                    <sub.Icon className="fill-neutral-800" />
                                  )}
                                  <span>{sub.title}</span>
                                </div>
                                <ArrowDropDownIcon
                                  className={
                                    "text-neutral-800 ml-auto transition-transform duration-200 ease-in-out data-[state=open]:rotate-180"
                                  }
                                />
                              </CollapsibleTrigger>
                              <CollapsibleContent className="pl-4">
                                {sub.dropdown?.map((inner) => (
                                  <SidebarMenuItem key={inner.id}>
                                    <SidebarMenuButton asChild>
                                      <a
                                        href={inner.url}
                                        className="hover:bg-primary-500 hover:text-white h-10 block p-2 text-sm rounded-md"
                                      >
                                        {inner.title}
                                      </a>
                                    </SidebarMenuButton>
                                  </SidebarMenuItem>
                                ))}
                              </CollapsibleContent>
                            </Collapsible>
                          ))}
                        </CollapsibleContent>
                      </Collapsible>
                    ) : (
                      /** ✅ Single-Level Dropdown → Top-level collapsible, dropdown items are links */
                      <Collapsible key={id}>
                        <CollapsibleTrigger className="group flex items-center justify-between w-full h-12 p-2 rounded-md hover:text-white hover:bg-primary-500 transition-all ease-in-out duration-150 cursor-pointer">
                          <div className="flex items-center gap-2">
                            {Icon && <Icon className={"fill-neutral-800"} />}
                            <span className="text-sm">{title}</span>
                          </div>
                          <ArrowDropDownIcon className="text-neutral-800 ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                        </CollapsibleTrigger>
                        <CollapsibleContent className="pl-2">
                          {dropdown.map((sub) => (
                            <SidebarMenuItem key={sub.id}>
                              <SidebarMenuButton asChild>
                                <a
                                  href={sub.url}
                                  className="h-10 flex items-center gap-2 p-2 text-sm rounded-md cursor-pointer hover:bg-primary-500 hover:text-white"
                                >
                                  {sub.Icon && (
                                    <sub.Icon className="fill-neutral-800" />
                                  )}
                                  {sub.title}
                                </a>
                              </SidebarMenuButton>
                            </SidebarMenuItem>
                          ))}
                        </CollapsibleContent>
                      </Collapsible>
                    )
                  ) : (
                    /** ✅ No dropdown → Simple clickable link */
                    <SidebarMenuItem key={id}>
                      <SidebarMenuButton asChild>
                        <a
                          href={url}
                          className="h-10 flex items-center gap-2 p-2 text-sm rounded-md hover:bg-gray-200 transition-all hover:bg-primary-500 hover:text-white"
                        >
                          {Icon && <Icon className="fill-neutral-800" />}
                          {title}
                        </a>
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
