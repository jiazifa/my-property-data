import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import appReducer from "./app";
import userReducer from "./user";

const store = configureStore({
  reducer: {
    app: appReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type RootDispatch = typeof store.dispatch;

const useAppDispatch = () => useDispatch<RootDispatch>();

const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export { store, useAppDispatch, useAppSelector };
