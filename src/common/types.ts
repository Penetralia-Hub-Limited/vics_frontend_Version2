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
  htmlfor: string;
  label: string;
  name?: string;
  type?: string;
  placeholder?: string;
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

export interface CustomSVGProps {
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
  url?: string;
  dropdown?: DropdownItem[];
}

export interface ISideBarProps {
  id: number;
  groupName: string;
  navigation: NavigationItem[];
}

export interface TaxPayerInfo {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  profileImage?: string;
}

export interface Filters {
  serviceType: string;
  registrationType: string;
  zoneOffice: string;
  mla: string;
  fromDate: string;
  toDate: string;
}

export interface PaginationProp {
  total: number;
  per_page: number;
  current_page: number;
  last_page: number;
  from: number;
  to: 2;
  next_page_url: string | null;
  previous_page_url: string | null;
}
