import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from ".";

export declare interface TagMeta {
  id: number;
  title: string;
  desc?: string;
  remark?: string;
}

export declare interface ITagCoordinatorState {
  allTags: Array<TagMeta>;
}

const initialState: ITagCoordinatorState = {
  allTags: [],
};

export const tagSlice = createSlice({
  name: "tagCoordinator",
  initialState: initialState,
  reducers: {
    updateTags: (
      state: ITagCoordinatorState,
      action: PayloadAction<Array<TagMeta>>
    ) => {
      state.allTags = action.payload;
    },
    addTag: (state: ITagCoordinatorState, action: PayloadAction<TagMeta>) => {
      state.allTags = [action.payload, ...state.allTags];
    },
  },
});

export const { updateTags, addTag } = tagSlice.actions;

const selectAllTags = (state: RootState) => state.tagCoordinator.allTags;

export { selectAllTags };

export default tagSlice.reducer;
