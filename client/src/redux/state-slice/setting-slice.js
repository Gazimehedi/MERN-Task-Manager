import {createSlice} from "@reduxjs/toolkit";

export const SettingSlice = createSlice({
    name: "settings",
    initialState:{
        loader:"d-none"
    },
    reducers:{
        ShowLoader: (state) => {
            state.loader=""
        },
        HideLoader: (state) => {
            state.loader='d-none'
        }
    }
})
export const {ShowLoader, HideLoader} = SettingSlice.actions;
export default SettingSlice.reducer;