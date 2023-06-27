import { IToastProps } from '@/components/Toast/Toast'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface SharedState {
  toasts: IToastProps[]
}

const initialState: SharedState = {
  toasts: [],
}

const SharedSlice = createSlice({
  name: 'shared',
  initialState,
  reducers: {
    addToast(state, action: PayloadAction<Omit<IToastProps, 'id'>>) {
      state.toasts.push({ ...action.payload, id: Date.now().toString() })
    },
    removeToast(state, action: PayloadAction<string>) {
      state.toasts = state.toasts.filter((toast) => toast.id !== action.payload)
    }
  },
})

export const { addToast, removeToast } = SharedSlice.actions
export default SharedSlice.reducer
