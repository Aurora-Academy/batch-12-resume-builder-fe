import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createAxiosAdminFn } from "@/lib/axiosAdmin";
import { URLS } from "@/constants";

const initialState = {
  users: [],
  total: 0,
  currentPage: 1,
  limit: 10,
  error: "",
  loading: false,
  reports: [],
};

interface UserProfile {
  _id: string;
  name: string;
  email: string;
  isBlocked: boolean;
  isEmailVerified: boolean;
  roles: [string];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async (
    { limit, page, search }: { limit: number; page: number; search?: string },
    { rejectWithValue }
  ) => {
    try {
      let url = `${URLS.USERS}?limit=${limit}&page=${page}&name=`;
      if (search) {
        url += encodeURIComponent(`${search}`);
      }
      const axiosAdmin = () => createAxiosAdminFn();
      const { data } = await axiosAdmin().get(url);
      return data;
    } catch (e: any) {
      return rejectWithValue({
        data: e?.response?.data?.err ?? "Something went wrong",
      });
    }
  }
);

export const makeUserDownloadable = createAsyncThunk(
  "users/makeUserDownloadable",
  async (_, { rejectWithValue }) => {
    try {
      const axiosAdmin = () => createAxiosAdminFn();
      const { data } = await axiosAdmin().get(`${URLS.USERS}/report`);
      return data;
    } catch (e: any) {
      return rejectWithValue({
        data: e?.response?.data?.err ?? "Something went wrong",
      });
    }
  }
);

export const blockUser = createAsyncThunk(
  "users/blockUser",
  async ({ id }: { id: string; status?: string }, { rejectWithValue }) => {
    try {
      const axiosAdmin = () => createAxiosAdminFn();
      const { data } = await axiosAdmin().patch(`${URLS.USERS}/${id}/block`);
      return data;
    } catch (e: any) {
      return rejectWithValue({
        data: e?.response?.data?.err ?? "Something went wrong",
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
      state.limit = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload.data;
        state.total = action.payload.total;
      })
      .addCase(fetchUsers.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload.data;
        state.total = 0;
      })
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(makeUserDownloadable.fulfilled, (state, action) => {
        state.loading = false;
        state.reports = action.payload;
      })
      .addCase(makeUserDownloadable.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload.data;
      })
      .addCase(makeUserDownloadable.pending, (state) => {
        state.loading = true;
        state.reports = [];
        state.error = "";
      })
      .addCase(blockUser.fulfilled, (state, action) => {
        state.loading = false;
        const existing = state.users.find((user: any) => user?._id === action.meta.arg.id) as
          | UserProfile
          | undefined;
        if (existing) {
          existing.isBlocked = action.meta.arg.status === "blocked" ? true : false;
        }
      })
      .addCase(blockUser.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload.data;
      })
      .addCase(blockUser.pending, (state) => {
        state.loading = true;
        state.error = "";
      });
  },
});

export const { setCurrentPage, setLimit } = userSlice.actions;

export const userReducer = userSlice.reducer;
