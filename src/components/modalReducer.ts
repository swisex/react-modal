import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

export type StatusType = "EXPIRED" | "REVOKED" | "ACTIVE";

export interface ShareInfo {
  sharedTo: { name: string; email: string };
  sharedBy: { name: string; email: string };
  sharedOn: Date;
  sharedFor: string;
  status: StatusType;
  actions: boolean; // true for enabled, false for disabled
}

export interface ModalState {
  data: ShareInfo[];
  page: number;
  itemsPerPage: number;
  loading: boolean;
}

const initialState: ModalState = {
  data: [],
  page: 1,
  itemsPerPage: 5,
  loading: false,
};

export const fetchModalDataAsync = createAsyncThunk(
  "modal/fetchModalData",
  async (path: string) => {
    const response = await fetch(path);
    let jsonData = await response.json();
    jsonData = jsonData.map((item: { sharedOn: string | number | Date }) => ({
      ...item,
      sharedOn: new Date(item.sharedOn),
    }));

    return jsonData;
  }
);

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setData: (state, action: PayloadAction<ShareInfo[]>) => {
      state.data = action.payload;
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchModalDataAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchModalDataAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchModalDataAsync.rejected, (state) => {
        state.loading = false;
        alert("Data loading failed!");
      });
  },
});

export const selectModalData = (state: { modal: ModalState }) =>
  state.modal.data;
export const selectModalPage = (state: { modal: ModalState }) =>
  state.modal.page;
export const selectModalItemsPerPage = (state: { modal: ModalState }) =>
  state.modal.itemsPerPage;

export const { setData, setPage } = modalSlice.actions;
export default modalSlice.reducer;
