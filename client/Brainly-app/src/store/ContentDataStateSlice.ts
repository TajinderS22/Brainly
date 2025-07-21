import { createSlice } from "@reduxjs/toolkit"; 

const ContentDataStateSlice=createSlice({
    name:"contentDataState",
    initialState:false,
    reducers:{
        setContentDataState:(state,action)=>action.payload,
    }
})

export const {setContentDataState}=ContentDataStateSlice.actions

export default ContentDataStateSlice.reducer