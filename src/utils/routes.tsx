import React from "react";

export declare interface IMenu {
  key?: string;
  path: string;
  title: string;
  display?: boolean;
  sub?: Array<IMenu>;
  comp?: React.ReactNode;
}

const menus: Array<IMenu> = [
  {
    key: "dashboard",
    path: "dashboard",
    title: "看板",
    comp: "Dashboard",
  },
  {
    key: "account",
    title: "用户管理",
    path: "account",
  },
  {
    key: "tag",
    title: "标签管理",
    path: "tag",
  },
  {
    key: "budget",
    title: "预算管理",
    path: "budget",
  },
  {
    key: "flow",
    title: "流水管理",
    path: "flow",
  },
];

export { menus };
