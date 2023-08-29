// analyticsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import baseURL from '../utils/baseURL';


export const getAllUsers = createAsyncThunk('analytics/getAllUsers', async () => {
    try {
      const response = await axios.get(`${baseURL}/analytics/getAllUsers`);
      return response.data;
    } catch (error) {
      throw error;
    }
  });
  
  export const getFeesStatus = createAsyncThunk('analytics/getFeesStatus', async () => {
    try {
      const response = await axios.get(`${baseURL}/analytics/getFeesStatus`);
      return response.data;
    } catch (error) {
      throw error;
    }
  });
  
  export const getScannedStatus = createAsyncThunk('analytics/getScannedStatus', async () => {
    try {
      const response = await axios.get(`${baseURL}/analytics/getScannedStatus`);
      return response.data;
    } catch (error) {
      throw error;
    }
  });
  
  export const getComplaintStatus = createAsyncThunk('analytics/getComplaintStatus', async () => {
    try {
      const response = await axios.get(`${baseURL}/analytics/getComplaintStatus`);
      return response.data;
    } catch (error) {
      throw error;
    }
  });
  
  export const getConductorPresentToday = createAsyncThunk('analytics/getConductorPresentToday', async () => {
    try {
      const response = await axios.get(`${baseURL}/condAtt/presentToday`);
      return response.data;
    } catch (error) {
      throw error;
    }
  });
  
  export const getConductorOnLeaveToday = createAsyncThunk('analytics/getConductorOnLeaveToday', async () => {
    try {
      const response = await axios.get(`${baseURL}/condAtt/onLeaveToday`);
      return response.data;
    } catch (error) {
      throw error;
    }
  });
  
  export const getDriverPresentToday = createAsyncThunk('analytics/getDriverPresentToday', async () => {
    try {
      const response = await axios.get(`${baseURL}/driverAtt/presentToday`);
      return response.data;
    } catch (error) {
      throw error;
    }
  });
  
  export const getDriverOnLeaveToday = createAsyncThunk('analytics/getDriverOnLeaveToday', async () => {
    try {
      const response = await axios.get(`${baseURL}/driverAtt/onLeaveToday`);
      return response.data;
    } catch (error) {
      throw error;
    }
  });

const analyticsSlice = createSlice({
  name: 'analytics',
  initialState: {
    users: "",
    feesStatus: "",
    scannedStatus: "",
    complaintStatus: "",
    conductorPresentToday: "",
    conductorOnLeaveToday: "",
    driverPresentToday: "",
    driverOnLeaveToday: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getFeesStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getFeesStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.feesStatus = action.payload;
      })
      .addCase(getFeesStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getScannedStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getScannedStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.scannedStatus = action.payload;
      })
      .addCase(getScannedStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getComplaintStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getComplaintStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.complaintStatus = action.payload;
      })
      .addCase(getComplaintStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getConductorPresentToday.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getConductorPresentToday.fulfilled, (state, action) => {
        state.loading = false;
        state.conductorPresentToday = action.payload;
      })
      .addCase(getConductorPresentToday.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getConductorOnLeaveToday.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getConductorOnLeaveToday.fulfilled, (state, action) => {
        state.loading = false;
        state.conductorOnLeaveToday = action.payload;
      })
      .addCase(getConductorOnLeaveToday.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getDriverPresentToday.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getDriverPresentToday.fulfilled, (state, action) => {
        state.loading = false;
        state.driverPresentToday = action.payload;
      })
      .addCase(getDriverPresentToday.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getDriverOnLeaveToday.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getDriverOnLeaveToday.fulfilled, (state, action) => {
        state.loading = false;
        state.driverOnLeaveToday = action.payload;
      })
      .addCase(getDriverOnLeaveToday.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const analyticsReducer = analyticsSlice.reducer;
