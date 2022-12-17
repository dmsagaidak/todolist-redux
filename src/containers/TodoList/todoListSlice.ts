import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import axiosApi from "../../axiosApi";
import {RootState} from "../../app/store";

interface TaskItem {
  id: string,
  status: boolean,
  title: string,
}

interface Tasks {
  tasks: TaskItem[],
  loading: boolean,
  error: boolean,
  updateLoading: boolean,
}

interface ApiTask {
  [id: string]: TaskItem
}

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

// export const addTask = createAsyncThunk<void, undefined, {state: RootState}>(
//   'todoList/add',
//   async (arg, thunkAPI) => {
//     const todoList = thunkAPI.getState().todolist.title;
//     await axiosApi.put('/tasks.json')
//   }
// )

export const todoListSlice = createSlice({
  name: 'todoList',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTasks.pending, (state) => {
      state.loading = true;
      state.error = false;
    })
    builder.addCase(fetchTasks.fulfilled, (state, action) => {
      state.loading = false;
      state.tasks = Object.keys(action.payload).map((id: string) => {
        const task = action.payload[id];
        return {
          ...task,
          id
        }
      });
    })
    builder.addCase(fetchTasks.rejected, (state) => {
      state.loading = false;
      state.error = true;
    })
  }
})

export const todoListReducer = todoListSlice.reducer