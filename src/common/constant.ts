import { IlandingPageNavigation, IHotline, ISupportMail } from "./types";

export const landingPageNavigation: IlandingPageNavigation[] = [
  {
    id: 1,
    label: "home",
    link: "/",
  },
  {
    id: 2,
    label: "verification",
    link: "/verification",
  },
];

export const hotline: IHotline[] = [
  {
    id: 1,
    line: "+234 901 234 5678",
  },
  {
    id: 2,
    line: "+234 801 234 5678",
  },
];

export const supportMail: ISupportMail[] = [
  {
    id: 1,
    mail: "support@kw-ivas.gov.ng",
  },
  {
    id: 2,
    mail: "helpdesk@kw-ivas.gov.ng",
  },
];
