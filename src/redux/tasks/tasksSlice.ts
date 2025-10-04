import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ITask } from "../../types/global";

interface initialState {
  task: ITask[];
}

const initialState: initialState = {
  task: [
    {
      id: "1",
      title: "First Todo",
      description: "Hello This is my first Todo App",
      isCompleted: false,
      dueDate: "04-10-2025",
      priority: "High",
    },
  ],
};

const todoSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    allTask: (state, action: PayloadAction<ITask[]>) => {
      state.task = action.payload;
    },
    addTask: (state, action: PayloadAction<ITask>) => {
      state.task.push(action.payload);
    },
    deleteTask: (state, action: PayloadAction<ITask>) => {
      state.task = state.task.filter((t) => t.id !== action.payload.id);
    },
    updateTask: (state, action: PayloadAction<ITask>) => {
      const index = state.task.findIndex((t) => t.id === action.payload.id);
      if (index !== -1) {
        state.task[index] = action.payload;
      }
    },
  },
});
export const { allTask, addTask, deleteTask, updateTask } = todoSlice.actions;
export default todoSlice.reducer;
