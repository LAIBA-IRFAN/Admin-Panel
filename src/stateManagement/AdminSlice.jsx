import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import baseURL from '../utils/baseURL';

export const fetchAllAdmins = createAsyncThunk('admin/fetchAllAdmins', async () => {
  try {
    const response = await axios.get(`${baseURL}/admin`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch admins');
  }
});

export const fetchSingleAdmin = createAsyncThunk('admin/fetchSingleAdmin', async (id) => {
  try {
    const response = await axios.get(`${baseURL}/admin/${id}`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch admin');
  }
});

export const addAdmin = createAsyncThunk('admin/addAdmin', async (adminData) => {
  try {
    const response = await axios.post(`${baseURL}/admin/addAdmin`, adminData);
    return response.data;
  } catch (error) {
    throw new Error('Failed to add admin');
  }
});

export const updateAdmin = createAsyncThunk('admin/updateAdmin', async ({ id, adminData }) => {
  try {
    const response = await axios.put(`${baseURL}/admin/${id}`, adminData);
    return response.data;
  } catch (error) {
    throw new Error('Failed to update admin');
  }
});

export const deleteAdmin = createAsyncThunk('admin/deleteAdmin', async (id) => {
  try {
    await axios.delete(`${baseURL}/admin/${id}`);
    return id;
  } catch (error) {
    throw new Error('Failed to delete admin');
  }
});

const adminSlice = createSlice({
  name: 'admin',
  initialState: {
    admins: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllAdmins.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllAdmins.fulfilled, (state, action) => {
        state.loading = false;
        state.admins = action.payload;
      })
      .addCase(fetchAllAdmins.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchSingleAdmin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSingleAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.singleAdmin = action.payload;
      })
      .addCase(fetchSingleAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addAdmin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.admins.push(action.payload);
      })
      .addCase(addAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateAdmin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateAdmin.fulfilled, (state, action) => {
        state.loading = false;
        const updatedAdmin = action.payload;
        const index = state.admins.findIndex((admin) => admin.id === updatedAdmin.id);
        if (index !== -1) {
          state.admins[index] = updatedAdmin;
        }
      })
      .addCase(updateAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteAdmin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteAdmin.fulfilled, (state, action) => {
        state.loading = false;
        const deletedAdminId = action.payload;
        state.admins = state.admins.filter((admin) => admin.id !== deletedAdminId);
      })
      .addCase(deleteAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const adminReducer = adminSlice.reducer;
