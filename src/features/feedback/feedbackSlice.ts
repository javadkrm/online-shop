
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Toast } from "./types";

interface FeedbackState {
  toasts: Toast[];
}

const initialState: FeedbackState = {
  toasts: [],
};

const feedbackSlice = createSlice({
  name: "feedback",
  initialState,
  reducers: {
    addToast: (state, action: PayloadAction<Toast>) => {
      state.toasts.push(action.payload);
    },

    removeToast: (state, action: PayloadAction<string>) => {
      state.toasts = state.toasts.filter(
        toast => toast.id !== action.payload
      );
    },
  },
});

export const { addToast, removeToast } = feedbackSlice.actions;

export default feedbackSlice.reducer;
