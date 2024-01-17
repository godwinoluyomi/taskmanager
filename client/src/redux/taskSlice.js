import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../utils/axios";
import { useSelector } from "react-redux";
import { selectToken } from "./authSlice";

// const token = useSelector(selectToken);

// Fetch Task Thunk
export const fetchTasks = createAsyncThunk(
  "tasks/fetchTasks",
  async (data, { rejectWithValue }) => {
    try {
      const { userId, token } = data;
      const response = await axios.get(`/tasks/user/${userId}`, {
        headers: {
          Authorization: token,
        },
      });

      console.log(response);
      return response.data;
    } catch (error) {
      //   return error.response.data;
      return rejectWithValue(error.response.data.error);
    }
  }
);

// Create Task Thunk
export const createTask = createAsyncThunk(
  "tasks/createTask",
  async (taskData, { rejectWithValue }) => {
    try {
      const { tasks, token } = taskData;
      const response = await axios.post("/tasks", taskData, {
        headers: {
          Authorization: token,
        },
      });
      return response.data;
    } catch (error) {
      //   throw error.response.data;
      return rejectWithValue(error.response.data.error);
    }
  }
);

const taskSlice = createSlice({
  name: "tasks",
  initialState: {
    tasks: [],
    message: null,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.fulfilled, (state, action) => {
        // console.log(action.payload);
        state.tasks = action.payload;
        state.error = null;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        // console.log(action.error);
        state.error = action.error.message;
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.tasks.push(action.payload);
        state.message = action.payload.message;
        state.error = null;
      })
      .addCase(createTask.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export const selectTasks = (state) => state.tasks.tasks;
export const selectTaskError = (state) => state.tasks.error;

export default taskSlice.reducer;
