import { AddBox, Dashboard, People } from "@mui/icons-material";
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
    key: "add_data_board_key",
    title: "录入数据",
    path: "createHealthDataBoard",
    icon: <AddBox />,
  },
  {
    key: "account",
    title: "用户管理",
    path: "account",
    icon: <People />,
  },
];

export { menus };
