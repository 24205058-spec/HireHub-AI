import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

export const fetchMyApplications = createAsyncThunk('applications/fetchMine', async (_, { rejectWithValue }) => {
  try {
    const res = await api.get('/applications/my');
    return res.data.data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || 'Error loading applications');
  }
});

const applicationSlice = createSlice({
  name: 'applications',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMyApplications.pending, (state) => { state.loading = true; })
      .addCase(fetchMyApplications.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchMyApplications.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export default applicationSlice.reducer;
