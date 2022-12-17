import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axiosApi from "../../axiosApi";
import {RootState} from "../../app/store";

interface Task {
  title: string,
  status: boolean,
  loading: boolean,
  error: boolean,
  updateLoading: boolean,
}

interface ApiTask {
  [id: string]: Task
}

const initialState: ApiTask = {};

export const fetchTasks = createAsyncThunk(
  'todoList/fetch',
  async () => {
    const response = await axiosApi.get<ApiTask | null>('/tasks.json');
    return response.data ?? 'No tasks';
  }
)

export const addTask = createAsyncThunk<void, undefined, {state: RootState}>(
  'todoList/add',
  async (arg, thunkAPI) => {
    const todoList = thunkAPI.getState().todolist.title
  }
)

export const todoListSlice = createSlice({
  name: 'todoList',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTasks.pending, (state) => {
      state.todolist.loading = true;
      state.todolist.error = false;
    })
    builder.addCase(fetchTasks.fulfilled, (state, action) => {
      state.todolist.loading = false;
      console.log(action.payload)
      // state.todolist.title = action.payload;
    })
    builder.addCase(fetchTasks.rejected, (state) => {
      // state.todolist.loading = false;
      // state.todolist.error = true;
    })
  }
})

export const todoListReducer = todoListSlice.reducer