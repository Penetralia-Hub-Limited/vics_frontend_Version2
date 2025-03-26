import { FC } from "react";

export interface IlandingPageNavigation {
  id: number;
  label: string;
  link: string;
}

export interface ISupportMail {
  id: number;
  mail: string;
}

export interface IHotline {
  id: number;
  line: string;
}

export interface IFieldItems {
  id: string;
  label: string;
  placeholder: string;
  type: string;
  htmlfor: string;
}

export interface IVehiceManagement {
  id: number;
  title: string;
  Icon: React.ReactNode;
  dropdown: Array<{
    id: number;
    title: string;
    Icon: React.ElementType;
  }>;
}

interface CustomSVGProps {
  className?: string;
}

interface DropdownItem {
  id: number;
  title: string;
  url?: string;
  Icon?: FC<CustomSVGProps>;
  dropdown?: DropdownItem[];
}

interface NavigationItem {
  id: number;
  title: string;
  Icon?: FC<CustomSVGProps>;
  url: string;
  dropdown?: DropdownItem[];
}

export interface ISideBarProps {
  id: number;
  groupName: string;
  navigation: NavigationItem[];
}
