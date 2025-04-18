import { FC } from "react";
import LogoComponent from "@/components/general/logo";
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
                      <CollapsibleTrigger className="group flex items-center justify-between w-full h-12 p-2 rounded-md hover:text-white hover:bg-primary-500 transition-all duration-150 cursor-pointer">
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
                              <CollapsibleTrigger className="group flex items-center justify-between w-full h-12 p-2 rounded-md hover:text-white hover:bg-primary-500 transition-all duration-150 cursor-pointer">
                                <div className="flex items-center gap-2">
                                  {sub.Icon && (
                                    <sub.Icon className="fill-neutral-800" />
                                  )}
                                  <span>{sub.title}</span>
                                </div>
                                <ArrowDropDownIcon className="text-neutral-800 ml-auto transition-transform data-[state=open]:rotate-180" />
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
                          ) : (
                            <SidebarMenuItem key={sub.id}>
                              <SidebarMenuButton asChild>
                                <a
                                  href={sub.url}
                                  className="h-10 flex items-center gap-2 p-2 text-sm rounded-md hover:bg-primary-500 hover:text-white"
                                >
                                  {sub.Icon && (
                                    <sub.Icon className="fill-neutral-800" />
                                  )}
                                  {sub.title}
                                </a>
                              </SidebarMenuButton>
                            </SidebarMenuItem>
                          )
                        )}
                      </CollapsibleContent>
                    </Collapsible>
                  ) : (
                    <SidebarMenuItem key={id}>
                      <SidebarMenuButton asChild>
                        <a
                          href={url}
                          className="h-10 flex items-center gap-2 p-2 text-sm rounded-md hover:bg-primary-500 hover:text-white"
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
