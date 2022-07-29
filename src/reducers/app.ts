import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import React from "react";
import { RootState } from ".";
import PropertyReactNodeManager from "../utils/propertyReactNodeManager";

export declare interface IAppState {
  name: string;
  isMenuCollapsed: boolean; // 是否收起侧边栏
  selectedSideBarKey: string;
  isModalActive: boolean;
}

const initValue: IAppState = {
  name: "my-property-data",
  isMenuCollapsed: true,
  selectedSideBarKey: "dashboard",
  isModalActive: false,
};

export const appSlice = createSlice({
  initialState: initValue,
  reducers: {
    toggleMenuCollapsed: (state) => {
      state.isMenuCollapsed = !state.isMenuCollapsed;
    },

    setMenuCollapsed: (state: IAppState, action: PayloadAction<boolean>) => {
      state.isMenuCollapsed = action.payload;
    },

    setSelectedSideBar: (state: IAppState, action: PayloadAction<string>) => {
      state.selectedSideBarKey = action.payload;
    },
    makeModalContentVisible: (state: IAppState) => {
      state.isModalActive = true;
    },
    makeModalContentDisable: (state: IAppState) => {
      PropertyReactNodeManager.getManager().modalNode = undefined;
      state.isModalActive = false;
    },
  },
  name: "app",
});

const selectIsMenuCollapsed = (state: RootState) => state.app.isMenuCollapsed;

const selectedSideBar = (state: RootState) => state.app.selectedSideBarKey;

const isModalActive = (state: RootState) => state.app.isModalActive;

export const {
  toggleMenuCollapsed,
  setMenuCollapsed,
  setSelectedSideBar,
  makeModalContentVisible,
  makeModalContentDisable,
} = appSlice.actions;
export { selectIsMenuCollapsed, selectedSideBar, isModalActive };

export default appSlice.reducer;
