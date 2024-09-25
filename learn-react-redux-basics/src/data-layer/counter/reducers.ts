import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {counterInitialState} from "./state";

const counterSlice = createSlice({
    name: 'counter', initialState: counterInitialState, reducers: {
        incrementByAmount: (state, action: PayloadAction<number>) => {
            if (state.value + action.payload >= 10) throw new Error('Value can not go over value 10');
            state.value += action.payload;
        }, decrementByAmount: (state, action: PayloadAction<number>) => {
            state.value -= action.payload;
        }
    }, extraReducers: (builder) => {
        builder
            .addCase(asyncLoadValue.pending, (state) => {
                state.loading = true;
            })
            .addCase(asyncLoadValue.fulfilled, (state, action: PayloadAction<number>) => {
                state.loading = false;
                state.value = action.payload;
            });
    },
})

export const asyncLoadValue = createAsyncThunk("counter/asyncLoadValue", async () => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    return 9;
});

export const {incrementByAmount, decrementByAmount} = counterSlice.actions;
export default counterSlice.reducer;