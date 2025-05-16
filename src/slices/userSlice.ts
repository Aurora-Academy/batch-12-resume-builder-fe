import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createAxiosAdminFn } from "@/lib/axiosAdmin";
import { URLS } from "@/constants";

const initialState = {
  users: [],
  total: 0,
  currentPage: 1,
  limit: 5,
  error: "",
  loading: false,
};

export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async ({ limit, page }: { limit: any; page: any }, { rejectWithValue }) => {
    try {
      const axiosAdmin = () => createAxiosAdminFn();
      const { data } = await axiosAdmin().get(`${URLS.USERS}?limit=${limit}&page=${page}`);
      return data;
    } catch (e: any) {
      return rejectWithValue({
        data: e?.response?.data?.msg ?? "Something went wrong",
      });
    }
  }
);

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setLimit: (state, action) => {
      state.currentPage = 1;
      state.limit = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload.data;
      })
      .addCase(fetchUsers.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload.data;
      })
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = "";
      });
  },
});

export const { setCurrentPage, setLimit } = userSlice.actions;

export const userReducer = userSlice.reducer;
