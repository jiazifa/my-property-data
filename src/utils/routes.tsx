import { AddBox, Bookmark, Dashboard, MonetizationOnSharp, Money, People } from "@mui/icons-material";
import React from "react";

export declare interface IMenu {
  key?: string;
  path: string;
  title: string;
  display?: boolean;
  icon: string | React.ReactNode;
  sub?: Array<IMenu>;
  comp?: React.ReactNode;
}

const menus: Array<IMenu> = [
  {
    key: "dashboard_key",
    path: "dashboard",
    title: "看板",
    icon: <Dashboard />,
    comp: "Dashboard",
  },
  {
    key: "account",
    title: "用户管理",
    path: "account",
    icon: <People />,
  },
  {
    key: "tag",
    title: "标签管理",
    path: "tag",
    icon: <Bookmark />,
  },
  {
    key: "budget",
    title: "预算管理",
    path: "budget",
    icon: <Money />,
  },
  {
    key: "flow",
    title: "流水管理",
    path: "flow",
    icon: <MonetizationOnSharp />,
  },
];

export { menus };
