import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from ".";

enum Gender {
  Male = 1,
  Female = 2,
}

export declare interface Account {
  id: number;
  identifier: string;
  name: string;
  gender: Gender;
  email: string;
  phone: string;
  create_at: string;
}

export declare interface IUserCoordinatorState {
  accounts: Array<Account>;
}

const initialState: IUserCoordinatorState = {
  accounts: [],
};

export const userSlice = createSlice({
  name: "userCoordinator",
  initialState: initialState,
  reducers: {
    updateAccounts: (
      state: IUserCoordinatorState,
      action: PayloadAction<Array<Account>>
    ) => {
      state.accounts = action.payload;
    },
    addAccount: (
      state: IUserCoordinatorState,
      action: PayloadAction<Account>
    ) => {
      state.accounts = [action.payload, ...state.accounts];
    },
  },
});

export const { updateAccounts, addAccount } = userSlice.actions;

const selectAccounts = (state: RootState) => state.userCoordinator.accounts;

export { selectAccounts };

export default userSlice.reducer;
