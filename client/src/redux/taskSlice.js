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

      //   console.log(response);
      localStorage.setItem("tasks", JSON.stringify(response.data));
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
    // console.log(taskData);
    try {
      const { task, token } = taskData;
      const response = await axios.post("/tasks", task, {
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

// Update Task Thunk
export const updateTask = createAsyncThunk(
  "tasks/updateTask",
  async (taskData, { rejectWithValue }) => {
    // console.log(taskData);
    try {
      const { taskId, task, token } = taskData;
      const response = await axios.put(`/tasks/${taskId}`, task, {
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

// Delete Task Thunk
export const deleteTask = createAsyncThunk(
  "tasks/deleteTask",
  async (taskData, { rejectWithValue }) => {
    // console.log(taskData);
    try {
      const { taskId, token } = taskData;
      const response = await axios.delete(`/tasks/${taskId}`, {
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

function searchAndStatusFilter(arr, label, value) {
  console.log(label, value, arr);
  //   if (
  //     (label === "status" && value === "1") ||
  //     (label === "title" && value === "")
  //   ) {
  //     return arr;
  //   }
  if (label === "title") {
    return arr.filter((element) =>
      element[label].toLowerCase().includes(value.toLowerCase())
    );
  }
  return arr.filter((element) => element[label] === value);
}

function filterByDate(arr, order) {
  if (order === "1") {
    return arr;
  } else if (order === "asc") {
    return arr.slice().sort((task1, task2) => {
      // Compare task1.deadline and task2.deadline for ascending order
      return task1.deadline.localeCompare(task2.deadline);
    });
  } else if (order === "desc") {
    return arr.slice().sort((task1, task2) => {
      // Compare task2.deadline and task1.deadline for descending order
      return task2.deadline.localeCompare(task1.deadline);
    });
  } else {
    return arr;
  }
}

const taskSlice = createSlice({
  name: "tasks",
  initialState: {
    tasks: [],
    message: null,
    error: null,
  },
  reducers: {
    filterTasks: (state, action) => {
      const storedTasks = JSON.parse(localStorage.getItem("tasks"));
      const { search, sort, status } = action.payload;
      const statusValue = status === false || status === true ? true : "1";

      console.log(storedTasks, { search, sort, status });
      if (!search || status === "1") {
        state.tasks = storedTasks;
        return;
      }
      if (search && sort && statusValue) {
        const filteredOne = searchAndStatusFilter(storedTasks, "title", search);
        const filteredTwo = searchAndStatusFilter(
          filteredOne,
          "status",
          status
        );
        const filteredThree = filterByDate(filteredTwo, sort);
        state.tasks = filteredThree;
      } else if (sort && statusValue) {
        const filteredOne = searchAndStatusFilter(
          storedTasks,
          "status",
          status
        );
        const filteredTwo = filterByDate(filteredOne, sort);
        state.tasks = filteredTwo;
      } else if (search) {
        const filteredOne = searchAndStatusFilter(storedTasks, "title", search);
        state.tasks = filteredOne;
      } else if (sort) {
        const filteredOne = filterByDate(storedTasks, sort);
        state.tasks = filteredOne;
      } else if (statusValue) {
        const filteredOne = searchAndStatusFilter(
          storedTasks,
          "status",
          status
        );
        state.tasks = filteredOne;
      }
    },
    /* searchTasks: (state, action) => {
      const searchFilter = action.payload;
      console.log(searchFilter);
    },
    filterStatus: (state, action) => {
      const storedTasks = JSON.parse(localStorage.getItem("tasks"));
      const statusFilter = action.payload;
      //   console.log(statusFilter.statusFilter, storedTasks);

      if (statusFilter === "1") {
        state.tasks = storedTasks;
      } else {
        const filteredTasks = storedTasks.filter(
          (task) => task.status === statusFilter
        );
        state.tasks = filteredTasks;
      }
    },
    sortDeadlineOrder: (state, action) => {
      const storedTasks = JSON.parse(localStorage.getItem("tasks"));
      const sortOrder = action.payload;
      console.log(sortOrder, storedTasks);

      if (sortOrder === "1") {
        state.tasks = storedTasks;
      } else if (sortOrder === "asc") {
        const sortedTasks = storedTasks.slice().sort((task1, task2) => {
          // Compare task1.deadline and task2.deadline for ascending order
          return task1.deadline.localeCompare(task2.deadline);
        });
        state.tasks = sortedTasks;
      } else if (sortOrder === "desc") {
        const sortedTasks = storedTasks.slice().sort((task1, task2) => {
          // Compare task2.deadline and task1.deadline for descending order
          return task2.deadline.localeCompare(task1.deadline);
        });
        state.tasks = sortedTasks;
      } else {
        state.tasks = storedTasks;
      }
    }, */
  },
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
        // Use unshift to add the task to the beginning of the array
        state.tasks.unshift(action.payload);
        // state.tasks.push(action.payload);
        state.message = action.payload.message;
        state.error = null;
      })
      .addCase(createTask.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        const updatedTaskIndex = state.tasks.findIndex(
          (task) => task._id === action.payload._id
        );

        if (updatedTaskIndex !== -1) {
          // Replace the old task with the updated one
          state.tasks[updatedTaskIndex] = action.payload;
        }

        // state.message = action.payload.message;
        state.error = null;
      })
      .addCase(updateTask.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        const deletedTaskIndex = state.tasks.findIndex(
          (task) => task._id === action.meta.arg.taskId
        );

        if (deletedTaskIndex !== -1) {
          // Remove the deleted task from the array
          state.tasks.splice(deletedTaskIndex, 1);
        }

        // state.message = "Task deleted successfully"; // If you want to set a message
        state.error = null;
      });
  },
});

export const selectTasks = (state) => state.tasks.tasks;
export const selectTaskError = (state) => state.tasks.error;
export const { searchTasks, filterStatus, sortDeadlineOrder, filterTasks } =
  taskSlice.actions;

export default taskSlice.reducer;
