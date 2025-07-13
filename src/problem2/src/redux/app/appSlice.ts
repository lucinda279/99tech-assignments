import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

import type { Theme } from "@/types/theme";
import type { RootState } from "@/redux/store";

const initialState: {
  theme: Theme;
} = {
  theme: "light",
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    persistTheme: (state, action: PayloadAction<Theme>) => {
      state.theme = action.payload;
    },
  },
});

export const { persistTheme } = appSlice.actions;

export const selectApp = (state: RootState) => state.app;

export default appSlice.reducer;
