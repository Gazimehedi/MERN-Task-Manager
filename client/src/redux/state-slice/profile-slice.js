import {createSlice} from "@reduxjs/toolkit";

const profileSlice = createSlice({
    name:'profile',
    initialState:{
        value:[]
    },
    reducers:{
        setProfileDetails:(state,action)=>{
            state.value=action.payload;
        }
    }
});
export const {setProfileDetails} = profileSlice.actions;
export default profileSlice.reducer;