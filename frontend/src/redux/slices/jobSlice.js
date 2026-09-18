import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

export const fetchJobs = createAsyncThunk('jobs/fetchJobs', async (params = {}, { rejectWithValue }) => {
  try {
    const res = await api.get('/jobs', { params });
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || 'Error fetching jobs');
  }
});

const jobSlice = createSlice({
  name: 'jobs',
  initialState: {
    list: [],
    total: 0,
    pages: 1,
    page: 1,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchJobs.pending, (state) => { state.loading = true; })
      .addCase(fetchJobs.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload.data;
        state.total = action.payload.total;
        state.pages = action.payload.pages;
        state.page = action.payload.page;
      })
      .addCase(fetchJobs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export default jobSlice.reducer;
