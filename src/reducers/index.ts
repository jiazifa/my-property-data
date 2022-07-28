import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import appReducer, { IModalContent } from "./app";
import userReducer from "./user";

const store = configureStore({
  reducer: {
    app: appReducer,
    user: userReducer,
  },
});

const useAppDispatch = () => useDispatch<RootDispatch>();

const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export type IModalContentModel = IModalContent;

export type RootState = ReturnType<typeof store.getState>;

export type RootDispatch = typeof store.dispatch;

export { store, useAppDispatch, useAppSelector };
