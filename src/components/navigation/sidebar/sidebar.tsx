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
      <SidebarHeader>
        <LogoComponent logo={Logo} state="kwara state" />
      </SidebarHeader>

      <SidebarContent>
        {sidebarData.map(({ id, navigation, groupName }) => (
          <SidebarGroup key={id}>
            <SidebarGroupLabel>{groupName}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu className="flex flex-col gap-1">
                {navigation.map((item) => (
                  <Collapsible key={item.id}>
                    <CollapsibleTrigger
                      className={
                        "mb-2 cursor-pointer flex items-center justify-between w-full h-12 p-2 bg-primary-100 rounded-md"
                      }
                    >
                      <div className="flex items-center gap-2">
                        {item.Icon && item.Icon}
                        <span className={"text-sm"}>{item.title}</span>
                      </div>
                      <ArrowDropDownIcon className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                    </CollapsibleTrigger>

                    <CollapsibleContent className="pl-2">
                      {item.dropdown?.map((sub) => (
                        <Collapsible key={sub.id}>
                          <CollapsibleTrigger className="cursor-pointer flex items-center justify-between w-full p-2 bg-gray-100 rounded-md">
                            <div className="flex items-center gap-2">
                              {sub.Icon && sub.Icon}
                              <span>{sub.title}</span>
                            </div>
                            <ArrowDropDownIcon className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                          </CollapsibleTrigger>
                          <CollapsibleContent className="pl-4">
                            {sub.dropdown?.map((inner) => (
                              <SidebarMenuItem key={inner.id}>
                                <SidebarMenuButton asChild>
                                  <a
                                    href={inner.url}
                                    className="block p-2 text-sm text-gray-700 hover:bg-gray-200 rounded-md"
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
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
    </Sidebar>
  );
};

export default AppSidebar;
