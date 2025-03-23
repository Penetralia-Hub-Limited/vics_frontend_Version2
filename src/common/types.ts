import { Navigation } from "@toolpad/core/AppProvider";

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
  Icon: React.ElementType;
  dropdown: Array<{
    id: number;
    title: string;
    Icon: React.ElementType;
  }>;
}

export interface NavigationItemBase extends Navigation {
  title: string;
  kind?: "page"; // Optional for headers and dividers
  segment?: string; // Used for navigation items
  icon?: React.ReactNode; // Icon component
}
