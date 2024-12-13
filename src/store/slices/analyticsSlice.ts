import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AnalyticsState } from '../../types';

interface AnalyticsResponse {
  totalUsers: number;
  activeUsers: number;
  deletedUsers: number;
  registrationTrend: { date: string; count: number }[];
  usersByStatus: { status: string; count: number }[];
  usersByRegion: { region: string; count: number }[];
}

const initialState: AnalyticsState = {
  totalUsers: 0,
  activeUsers: 0,
  deletedUsers: 0,
  registrationTrend: [],
  usersByStatus: [],
  usersByRegion: [],
  loading: false,
  error: null,
  dateRange: {
    start: new Date(Date.now() - 180 * 24 * 60 * 60 * 1000).toISOString(),
    end: new Date().toISOString(),
  },
  selectedRegion: null,
};

export const fetchAnalytics = createAsyncThunk<
  AnalyticsResponse, 
  { startDate: string; endDate: string; region: string | null }
>(
  'analytics/fetchAnalytics',
  async ({ startDate, endDate, region }) => {
    console.log('Fetching analytics for:', { startDate, endDate, region });

    // Mock API call
    return new Promise<AnalyticsResponse>((resolve) => {
      setTimeout(() => {
        resolve({
          totalUsers: 1000,
          activeUsers: 750,
          deletedUsers: 50,
          registrationTrend: [
            { date: '2024-01', count: 150 },
            { date: '2024-02', count: 180 },
            { date: '2024-03', count: 220 },
          ],
          usersByStatus: [
            { status: 'active', count: 750 },
            { status: 'inactive', count: 250 },
          ],
          usersByRegion: [
            { region: 'North America', count: 400 },
            { region: 'Europe', count: 300 },
            { region: 'Asia', count: 200 },
            { region: 'Others', count: 100 },
          ],
        });
      }, 1000);
    });
  }
);

const analyticsSlice = createSlice({
  name: 'analytics',
  initialState,
  reducers: {
    setDateRange: (state, action) => {
      state.dateRange = action.payload;
    },
    setSelectedRegion: (state, action) => {
      state.selectedRegion = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAnalytics.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAnalytics.fulfilled, (state, action) => {
        state.loading = false;
        Object.assign(state, action.payload);
      })
      .addCase(fetchAnalytics.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch analytics';
      });
  },
});

export const { setDateRange, setSelectedRegion } = analyticsSlice.actions;
export default analyticsSlice.reducer;
