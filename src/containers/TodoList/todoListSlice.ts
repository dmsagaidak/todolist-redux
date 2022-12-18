import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import axiosApi from "../../axiosApi";
import {RootState} from "../../app/store";
import {TaskItem, Tasks, ApiTask} from "../../types";

const initialState: Tasks = {
  tasks: [],
  loading: false,
  error: false,
  updateLoading: false,
};

export const fetchTasks = createAsyncThunk(
  'todoList/fetch',
  async () => {
    const response = await axiosApi.get<ApiTask>('/tasks.json');
    return response.data;
  }
)

export const addTask = createAsyncThunk(
  'todoList/add',
  async (task:TaskItem) => {
    await axiosApi.post('/tasks.json', task)
  }
);

export const removeTask = createAsyncThunk(
  'todoList/remove',
  async (id: string) => {
    if(window.confirm('Do you really want to delete this item?')) {
      await axiosApi.delete('/tasks/' + id + '.json')
    }
  }
)

export const todoListSlice = createSlice({
  name: 'todoList',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTasks.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(fetchTasks.fulfilled, (state, action) => {
      state.loading = false;
      state.tasks = Object.keys(action.payload).map((id: string) => {
        const task = action.payload[id];
        return {
          ...task,
          id
        }
      });
    });
    builder.addCase(fetchTasks.rejected, (state) => {
      state.loading = false;
      state.error = true;
    });
    builder.addCase(removeTask.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(removeTask.fulfilled, (state) => {
      state.loading = false;
      state.error = false;
    })
  }
})

export const todoListReducer = todoListSlice.reducer