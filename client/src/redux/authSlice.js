import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../utils/axios";

const userInitialState = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;
const tokenInitialState = localStorage.getItem("token")
  ? JSON.parse(localStorage.getItem("token"))
  : null;

const initialState = {
  user: userInitialState,
  message: null,
  error: null,
  token: tokenInitialState,
  isAuthenticated: !!userInitialState,
};

// Register User thunk
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post("/auth/register", userData);
      return response.data;
    } catch (error) {
      //   console.log(error.response.data.error);
      return rejectWithValue(error.response.data.error);
    }
  }
);

// Login User thunk
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post("/auth/login", userData);

      localStorage.setItem("user", JSON.stringify(response.data.user));
      localStorage.setItem("token", JSON.stringify(response.data.token));
      return response.data;
    } catch (error) {
      //   throw error.response.data;
      return rejectWithValue(error.response.data.error);
    }
  }
);

// Logout user thunk
export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, { rejectWithValue }) => {
    try {
      // You may want to perform any additional cleanup or API calls related to logout here
      localStorage.removeItem("user");
      return {};
    } catch (error) {
      return rejectWithValue(error.response.data.error);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.message = action.payload.message;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = action.payload.isAuthenticated;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        return {
          user: null,
          message: null,
          error: null,
          token: null,
          isAuthenticated: false,
        };
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

// export const { addTodo, toggleTodo, editTodo, deleteTodo } = authSlice.actions;  // No core reducer

export const selectAuthError = (state) => state.auth.error;
export const selectSuccessMessage = (state) => state.auth.message;
export const selectUser = (state) => state.auth.user;
export const selectToken = (state) => state.auth.token;
export const selectAuthStatus = (state) => state.auth.isAuthenticated;

export default authSlice.reducer;
