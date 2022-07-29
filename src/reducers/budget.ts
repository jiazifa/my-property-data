import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from ".";

export declare interface BudgetMeta {
  id: number;
  title: string;
  moneny: number;
  remark?: string;
  limit_start_time: number;
  limit_end_time: number;
}

export declare interface ITagCoordinatorState {}

const initialState: ITagCoordinatorState = {};

export const tagSlice = createSlice({
  name: "budgetCoordinator",
  initialState: initialState,
  reducers: {},
});

export const {} = tagSlice.actions;

// const selectAllTags = (state: RootState) => state.budgetCoordinator.allTags;

// export { selectAllTags };

export default tagSlice.reducer;
