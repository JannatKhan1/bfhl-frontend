import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import bfhlService from './bfhlService'; // Import your service

const initialState = {
  jsonInput: '',
  response: {},
  options: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

// Create async thunk for processing data
export const processData = createAsyncThunk(
  'bfhl/processData',
  async (data, thunkAPI) => {
    try {
      return await bfhlService.processData(data);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Create async thunk for getting static data
export const getBFHL = createAsyncThunk(
  'bfhl/getBFHL',
  async (_, thunkAPI) => {
    try {
      // No payload needed for this request
      const response = await bfhlService.processData({}); // Adjust service method or create a new one if necessary
      return response;
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

const bfhlSlice = createSlice({
  name: 'bfhl',
  initialState,
  reducers: {
    reset: (state) => initialState,
    setJsonInput: (state, action) => {
        state.jsonInput = action.payload;
      },
    setOptions: (state, action) => {
        state.options = action.payload;
      },
    setError: (state, action) => {
        state.isError = true;
        state.message = action.payload;
      },
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(processData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(processData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.response = action.payload;
        // Assuming the response includes options to update
        state.options = [
          'Alphabets',
          'Numbers',
          'Highest lowercase alphabet',
        ]; // Update options based on your API response
      })
      .addCase(processData.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getBFHL.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBFHL.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        // Handle static data if needed
      })
      .addCase(getBFHL.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { setJsonInput, setOptions, setError, reset } = bfhlSlice.actions;
export default bfhlSlice.reducer;
