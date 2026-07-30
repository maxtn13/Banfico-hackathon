import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { api } from '../api/client.js'

export const fetchDashboard = createAsyncThunk('dashboard/fetch', async (_, { rejectWithValue }) => {
  try {
    return await api.getDashboard()
  } catch (err) {
    return rejectWithValue(err.message || 'Could not load dashboard')
  }
})

export const fetchObservations = createAsyncThunk('dashboard/fetchObs', async () => {
  return await api.getObservations()
})

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState: {
    data: null,
    observations: [],
    obsLoading: true,
    loading: false,
    error: '',
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboard.pending, (state) => {
        state.loading = true
        state.error = ''
      })
      .addCase(fetchDashboard.fulfilled, (state, action) => {
        state.data = action.payload
        state.loading = false
      })
      .addCase(fetchDashboard.rejected, (state, action) => {
        state.error = action.payload || 'We could not load your accounts. Check the backend is running.'
        state.loading = false
      })
      .addCase(fetchObservations.fulfilled, (state, action) => {
        state.observations = action.payload
        state.obsLoading = false
      })
      .addCase(fetchObservations.rejected, (state) => {
        state.obsLoading = false
      })
  },
})

export default dashboardSlice.reducer
