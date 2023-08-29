import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import baseURL from '../utils/baseURL';

export const addEmployee = createAsyncThunk('employee/addEmployee', async (employeeData) => {
  try {
    const response = await axios.post(`${baseURL}/employee/addEmployee`, employeeData);
    return response.data;
  } catch (error) {
    throw new Error('Failed to add employee');
  }
});

export const fetchAllEmployees = createAsyncThunk('employee/fetchAllEmployees', async () => {
  try {
    const response = await axios.get(`${baseURL}/employee/`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch employees');
  }
});

export const fetchSingleEmployee = createAsyncThunk('employee/fetchSingleEmployee', async (id) => {
  try {
    const response = await axios.get(`${baseURL}/employee/${id}`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch single employee');
  }
});

export const updateEmployee = createAsyncThunk('employee/updateEmployee', async ({ id, employeeData }) => {
  try {
    const response = await axios.put(`${baseURL}/employee/${id}`, employeeData);
    return response.data;
  } catch (error) {
    throw new Error('Failed to update employee');
  }
});

export const deleteEmployee = createAsyncThunk('employee/deleteEmployee', async (id) => {
  try {
    await axios.delete(`${baseURL}/employee/${id}`);
    return id;
  } catch (error) {
    throw new Error('Failed to delete employee');
  }
});

const employeeSlice = createSlice({
  name: 'employee',
  initialState: {
    employees: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addEmployee.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addEmployee.fulfilled, (state, action) => {
        state.loading = false;
        state.employees.push(action.payload);
      })
      .addCase(addEmployee.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchAllEmployees.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllEmployees.fulfilled, (state, action) => {
        state.loading = false;
        state.employees = action.payload;
      })
      .addCase(fetchAllEmployees.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchSingleEmployee.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSingleEmployee.fulfilled, (state, action) => {
        state.loading = false;
        state.employee = action.payload;
      })
      .addCase(fetchSingleEmployee.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateEmployee.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateEmployee.fulfilled, (state, action) => {
        state.loading = false;
        const updatedEmployee = action.payload;
        state.employees = state.employees.map((employee) =>
          employee.id === updatedEmployee.id ? updatedEmployee : employee
        );
      })
      .addCase(updateEmployee.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteEmployee.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteEmployee.fulfilled, (state, action) => {
        state.loading = false;
        const deletedEmployeeId = action.payload;
        state.employees = state.employees.filter((employee) => employee.id !== deletedEmployeeId);
      })
      .addCase(deleteEmployee.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const employeeReducer = employeeSlice.reducer;
