import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { UsersState, User } from '../../types';

const initialState: UsersState = {
  users: [],
  filteredUsers: [],
  loading: false,
  error: null,
  currentPage: 1,
  totalPages: 1,
  deletedUsers: 0,
};

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  // Mock API call
  return new Promise<User[]>((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: 1,
          name: 'John Doe',
          email: 'john@example.com',
          status: 'active',
          region: 'North America',
          registrationDate: '2024-01-15',
        },
        {
          id: 2,
          name: 'Jane Smith',
          email: 'jane@example.com',
          status: 'active',
          region: 'Europe',
          registrationDate: '2024-02-01',
        },
        {
          id: 3,
          name: 'Michael Johnson',
          email: 'michael@example.com',
          status: 'inactive',
          region: 'Asia',
          registrationDate: '2024-01-20',
        },
        {
          id: 4,
          name: 'Sarah Williams',
          email: 'sarah@example.com',
          status: 'active',
          region: 'Europe',
          registrationDate: '2024-02-15',
        },
        {
          id: 5,
          name: 'David Brown',
          email: 'david@example.com',
          status: 'inactive',
          region: 'North America',
          registrationDate: '2024-01-10',
        },
        {
          id: 6,
          name: 'Emily Davis',
          email: 'emily@example.com',
          status: 'active',
          region: 'Asia',
          registrationDate: '2024-02-20',
        },
        {
          id: 7,
          name: 'James Wilson',
          email: 'james@example.com',
          status: 'active',
          region: 'Europe',
          registrationDate: '2024-01-25',
        },
        {
          id: 8,
          name: 'Lisa Anderson',
          email: 'lisa@example.com',
          status: 'inactive',
          region: 'North America',
          registrationDate: '2024-02-05',
        },
        {
          id: 9,
          name: 'Robert Taylor',
          email: 'robert@example.com',
          status: 'active',
          region: 'Asia',
          registrationDate: '2024-01-30',
        },
        {
          id: 10,
          name: 'Maria Garcia',
          email: 'maria@example.com',
          status: 'active',
          region: 'Europe',
          registrationDate: '2024-02-10',
        },
        {
          id: 11,
          name: 'Thomas Martinez',
          email: 'thomas@example.com',
          status: 'inactive',
          region: 'North America',
          registrationDate: '2024-01-05',
        },
        {
          id: 12,
          name: 'Jennifer Lee',
          email: 'jennifer@example.com',
          status: 'active',
          region: 'Asia',
          registrationDate: '2024-02-25',
        },
        {
          id: 13,
          name: 'William Clark',
          email: 'william@example.com',
          status: 'active',
          region: 'Europe',
          registrationDate: '2024-01-12',
        },
        {
          id: 14,
          name: 'Patricia Rodriguez',
          email: 'patricia@example.com',
          status: 'inactive',
          region: 'North America',
          registrationDate: '2024-02-18',
        },
        {
          id: 15,
          name: 'Kevin Chen',
          email: 'kevin@example.com',
          status: 'active',
          region: 'Asia',
          registrationDate: '2024-01-28',
        }
      ]);
    }, 1000);
  });
});

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    deleteUser: (state, action) => {
      state.users = state.users.filter((user) => user.id !== action.payload);
      state.filteredUsers = state.filteredUsers.filter((user) => user.id !== action.payload);
      state.deletedUsers += 1;
      state.totalPages = Math.ceil(state.filteredUsers.length / 5);
    },
    filterUsers: (state, action) => {
      const searchTerm = action.payload.toLowerCase();
      state.filteredUsers = state.users.filter(
        (user) =>
          user.name.toLowerCase().includes(searchTerm) ||
          user.email.toLowerCase().includes(searchTerm)
      );
      state.totalPages = Math.ceil(state.filteredUsers.length / 5);
      state.currentPage = 1;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
        state.filteredUsers = action.payload;
        state.totalPages = Math.ceil(action.payload.length / 5);
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch users';
      });
  },
});

export const { deleteUser, filterUsers, setCurrentPage } = usersSlice.actions;
export default usersSlice.reducer;