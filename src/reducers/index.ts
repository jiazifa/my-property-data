import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import appReducer from "./app";
import userReducer from "./user";
import tagReducer from "./tag";
import budgetReducer from "./budget";

const store = configureStore({
  reducer: {
    app: appReducer,
    userCoordinator: userReducer,
    tagCoordinator: tagReducer,
    budgetCoordinator: budgetReducer,
  },
});

const useAppDispatch = () => useDispatch<RootDispatch>();

const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export type RootState = ReturnType<typeof store.getState>;

export type RootDispatch = typeof store.dispatch;

export { store, useAppDispatch, useAppSelector };
