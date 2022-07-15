import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from ".";

export declare interface IUserState {
  username: string; // 用户姓名
  icon: string | URL; // 用户头像
  email: string; // 用户邮箱
}

const initialState: IUserState = {
  username: "",
  icon: "",
  email: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    updateIcon: (state: IUserState, action: PayloadAction<URL>) => {
      state.icon = action.payload;
    },

    updateEmail: (state: IUserState, action: PayloadAction<string>) => {
      state.email = action.payload;
    },

    updateUserName: (state: IUserState, action: PayloadAction<string>) => {
      state.username = action.payload;
    },
  },
});

export const { updateEmail, updateUserName, updateIcon } = userSlice.actions;

const selectAppName = (state: RootState) => state.app.name;

export { selectAppName };

export default userSlice.reducer;
