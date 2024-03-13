import { ReactNode } from "react";

export type TRoute = {
  path: string;
  element: ReactNode;
};

export type TSidebarItem =
  | {
      key: string | undefined;
      label: ReactNode;
      children?: TSidebarItem[];
    }
  | undefined;

export type TUserPath = {
  name?: string;
  path?: string;
  element?: ReactNode;
  children?: TUserPath[];
};
