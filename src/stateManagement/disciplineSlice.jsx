import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import baseURL from '../utils/baseURL';

// Thunk to fetch all disciplines
export const fetchAllDisciplines = createAsyncThunk(
  'discipline/fetchAll',
  async () => {
    try {
      const response = await axios.get(`${baseURL}/subCategory/discipline/`);
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch disciplines');
    }
  }
);

// Thunk to fetch a single discipline
export const fetchSingleDiscipline = createAsyncThunk(
  'discipline/fetchSingle',
  async (id) => {
    try {
      const response = await axios.get(`${baseURL}/subCategory/discipline/${id}`);
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch the discipline');
    }
  }
);

// Thunk to add a discipline
export const addDiscipline = createAsyncThunk(
  'discipline/add',
  async (discipline) => {
    try {
      const response = await axios.post(`${baseURL}/subCategory/discipline/addDiscipline`, discipline);
      return response.data;
    } catch (error) {
      throw new Error('Failed to add the discipline');
    }
  }
);

// Thunk to update a discipline
export const updateDiscipline = createAsyncThunk(
  'discipline/update',
  async ({ id, discipline }) => {
    try {
      const response = await axios.put(`${baseURL}/subCategory/discipline/${id}`, discipline);
      return response.data;
    } catch (error) {
      throw new Error('Failed to update the discipline');
    }
  }
);

// Thunk to delete a discipline
export const deleteDiscipline = createAsyncThunk(
  'discipline/delete',
  async (id) => {
    try {
      await axios.delete(`${baseURL}/subCategory/discipline/${id}`);
      return id;
    } catch (error) {
      throw new Error('Failed to delete the discipline');
    }
  }
);

const disciplineSlice = createSlice({
  name: 'discipline',
  initialState: {
    disciplines: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    // Fetch all disciplines
    builder.addCase(fetchAllDisciplines.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchAllDisciplines.fulfilled, (state, action) => {
      state.loading = false;
      state.disciplines = action.payload;
    });
    builder.addCase(fetchAllDisciplines.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    // Fetch single discipline
    builder.addCase(fetchSingleDiscipline.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchSingleDiscipline.fulfilled, (state, action) => {
      state.loading = false;
      state.singleDiscipline = action.payload;
    });
    builder.addCase(fetchSingleDiscipline.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    // Add discipline
    builder.addCase(addDiscipline.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(addDiscipline.fulfilled, (state, action) => {
      state.loading = false;
      state.disciplines.push(action.payload);
    });
    builder.addCase(addDiscipline.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    // Update discipline
    builder.addCase(updateDiscipline.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(updateDiscipline.fulfilled, (state, action) => {
      state.loading = false;
      const updatedDiscipline = action.payload;
      const index = state.disciplines.findIndex((d) => d.id === updatedDiscipline.id);
      if (index !== -1) {
        state.disciplines[index] = updatedDiscipline;
      }
    });
    builder.addCase(updateDiscipline.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    // Delete discipline
    builder.addCase(deleteDiscipline.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(deleteDiscipline.fulfilled, (state, action) => {
      state.loading = false;
      const deletedDisciplineId = action.payload;
      state.disciplines = state.disciplines.filter((d) => d.id !== deletedDisciplineId);
    });
    builder.addCase(deleteDiscipline.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export const disciplineReducer =  disciplineSlice.reducer;
