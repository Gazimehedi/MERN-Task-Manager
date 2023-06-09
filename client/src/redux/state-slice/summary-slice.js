import {createSlice} from "@reduxjs/toolkit";

const SummarySlice = createSlice({
    name: 'summary',
    initialState: {
        value: []
    },
    reducers: {
        SetSummary: (state,action)=>{
            state.value = action.payload;
        }
    }
});
export const {SetSummary} = SummarySlice.actions;
export default SummarySlice.reducer;