import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import baseURL from '../utils/baseURL'

// Async thunk for adding a new category
export const addCategory = createAsyncThunk(
  'categories/addCategory',
  async (categoryData, thunkAPI) => {
    try {
      const response = await axios.post(`${baseURL}/category/addCategory/`, categoryData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Async thunk for fetching all categories
export const fetchCategories = createAsyncThunk(
  'categories/fetchCategories',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`${baseURL}/category`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Async thunk for fetching a single category by ID
export const fetchSingleCategory = createAsyncThunk(
  'categories/fetchCategoryById',
  async (categoryId, thunkAPI) => {
    try {
      const response = await axios.get(`${baseURL}/category/${categoryId}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Async thunk for updating a category
export const updateCategory = createAsyncThunk(
  'categories/updateCategory',
  async ({ categoryId, categoryData }, thunkAPI) => {
    try {
      const response = await axios.put(`${baseURL}/category/${categoryId}`, categoryData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Async thunk for deleting a category
export const deleteCategory = createAsyncThunk(
  'categories/deleteCategory',
  async (categoryId, thunkAPI) => {
    try {
      await axios.delete(`${baseURL}/category/${categoryId}`);
      return categoryId;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const categoriesSlice = createSlice({
    name: 'categories',
    initialState: {
      categories: [],
      status: 'idle',
      error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(addCategory.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(fetchCategories.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(fetchSingleCategory.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(updateCategory.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(deleteCategory.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(addCategory.fulfilled, (state, action) => {
          state.status = 'succeeded';
          state.categories.push(action.payload);
        })
        .addCase(fetchCategories.fulfilled, (state, action) => {
          state.status = 'succeeded';
          state.categories = action.payload;
        })
        .addCase(fetchSingleCategory.fulfilled, (state, action) => {
          state.status = 'succeeded';
          // Handle fetching a single category by ID here
          state.singleCategory = action.payload;
        })
        .addCase(updateCategory.fulfilled, (state, action) => {
          state.status = 'succeeded';
          // Handle updating a category here
          const updatedCategory = action.payload;
          const index = state.categories.findIndex(category => category.id === updatedCategory.id);
          if (index !== -1) {
            state.categories[index] = updatedCategory;
          }
        })
        .addCase(deleteCategory.fulfilled, (state, action) => {
          state.status = 'succeeded';
          state.categories = state.categories.filter(category => category.id !== action.payload);
        })
        .addMatcher(
          (action) => action.type.endsWith('/rejected'),
          (state, action) => {
            state.status = 'failed';
            state.error = action.payload;
          }
        );
    },
  });
  
  export const categoryReducer = categoriesSlice.reducer;