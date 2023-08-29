import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import baseURL from '../utils/baseURL';


export const fetchAllBatches = createAsyncThunk('batch/fetchAllBatches', async () => {
  try {
    const response = await axios.get(`${baseURL}/subCategory/batch`);
    return response.data;
  } catch (error) {
    throw Error('Failed to fetch batches');
  }
});


export const fetchSingleBatch = createAsyncThunk('batch/fetchSingleBatch', async (id) => {
  try {
    const response = await axios.get(`${baseURL}/subCategory/batch/${id}`);
    return response.data;
  } catch (error) {
    throw Error('Failed to fetch batch');
  }
});


export const addBatch = createAsyncThunk('batch/addBatch', async (batchData) => {
  try {
    const response = await axios.post(`${baseURL}/subCategory/batch/addBatch`, batchData);
    return response.data;
  } catch (error) {
    throw Error('Failed to add batch');
  }
});


export const updateBatch = createAsyncThunk('batch/updateBatch', async ({ id, batchData }) => {
  try {
    const response = await axios.put(`${baseURL}/subCategory/batch/${id}`, batchData);
    return response.data;
  } catch (error) {
    throw Error('Failed to update batch');
  }
});


export const deleteBatch = createAsyncThunk('batch/deleteBatch', async (id) => {
  try {
    await axios.delete(`${baseURL}/subCategory/batch/${id}`);
    return id;
  } catch (error) {
    throw Error('Failed to delete batch');
  }
});

const batchSlice = createSlice({
  name: 'batch',
  initialState: {
    batches: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllBatches.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllBatches.fulfilled, (state, action) => {
        state.loading = false;
        state.batches = action.payload;
      })
      .addCase(fetchAllBatches.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchSingleBatch.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSingleBatch.fulfilled, (state, action) => {
        state.loading = false;
        state.singleBatch = action.payload;
      })
      .addCase(fetchSingleBatch.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addBatch.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addBatch.fulfilled, (state, action) => {
        state.loading = false;
        state.batches.push(action.payload);
      })
      .addCase(addBatch.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateBatch.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateBatch.fulfilled, (state, action) => {
        state.loading = false;
        const updatedBatch = action.payload;
        const index = state.batches.findIndex((batch) => batch.id === updatedBatch.id);
        if (index !== -1) {
          state.batches[index] = updatedBatch;
        }
      })
      .addCase(updateBatch.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteBatch.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteBatch.fulfilled, (state, action) => {
        state.loading = false;
        const deletedBatchId = action.payload;
        state.batches = state.batches.filter((batch) => batch.id !== deletedBatchId);
      })
      .addCase(deleteBatch.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const batchReducer = batchSlice.reducer;
