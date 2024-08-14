import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface CounterState {
  value: number
}

const initialState: CounterState = {
  value: 0
}

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1
    },
    decrement: (state) => {
      if (state.value > 0) state.value -= 1
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload
    },
    decrementByAmount: (state, action: PayloadAction<number>) => {
      if (state.value - action.payload >= 0) state.value -= action.payload
    }
  }
})

export const { increment, decrement, incrementByAmount, decrementByAmount } = counterSlice.actions
export const counterReducer = counterSlice.reducer