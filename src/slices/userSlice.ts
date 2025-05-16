import { URLS } from "@/constants";
import { axiosInstance } from "@/lib/axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  users: [],
  total: 0,
  currentPage: 1,
  limit: 10,
  error: "",
  loading: false,
};

export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async ({ limit, page }: { limit: any; page: any }, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get(`${URLS.USERS}?limit=${limit}&page=${page}`, {
        headers: {
          access_token: localStorage.getItem("access_token"),
        },
      });
      return res.data;
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
