import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import React from "react";
import { RootState } from ".";

export declare interface IModalContent {
  content: React.ReactNode;
}

export declare interface IAppState {
  name: string;
  isMenuCollapsed: boolean; // 是否收起侧边栏
  selectedSideBarKey: string;
  activeModalContent?: IModalContent;
}

const initValue: IAppState = {
  name: "my-property-data",
  isMenuCollapsed: true,
  selectedSideBarKey: "dashboard",
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
    setActiveModalContent: (
      state: IAppState,
      action: PayloadAction<IModalContent | undefined>
    ) => {
      state.activeModalContent = action.payload;
    },
  },
  name: "app",
});

const selectIsMenuCollapsed = (state: RootState) => state.app.isMenuCollapsed;

const selectedSideBar = (state: RootState) => state.app.selectedSideBarKey;

const selectedActiveModalContent = (state: RootState) =>
  state.app.activeModalContent;

export const {
  toggleMenuCollapsed,
  setMenuCollapsed,
  setSelectedSideBar,
  setActiveModalContent,
} = appSlice.actions;
export { selectIsMenuCollapsed, selectedSideBar, selectedActiveModalContent };

export default appSlice.reducer;
