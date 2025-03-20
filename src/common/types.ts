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
