import { createSlice } from "@reduxjs/toolkit"; 

const ContentSlice=createSlice({
    name:"content",
    initialState:[],
    reducers:{
        setContent:(state,action)=>action.payload,
    }
})

export const {setContent}=ContentSlice.actions

export default ContentSlice.reducer