import {configureStore} from "@reduxjs/toolkit";
import {todoListReducer} from "../containers/TodoList/todoListSlice";

export const store = configureStore({
  reducer: {
    todolist: todoListReducer,
  }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;