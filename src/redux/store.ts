import { configureStore } from "@reduxjs/toolkit";
import taskReducer from "./tasks/tasksSlice";

export const store = configureStore({
  reducer: {
    task: taskReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
