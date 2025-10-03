import { createSlice } from "@reduxjs/toolkit"; 

const ContentSlice=createSlice({
    name:"content",
    initialState:[],
    reducers:{
        setContent:(_state, action) => action.payload,
        clearContent:()=>[]
    }
})

export const {setContent,clearContent}=ContentSlice.actions

export default ContentSlice.reducer