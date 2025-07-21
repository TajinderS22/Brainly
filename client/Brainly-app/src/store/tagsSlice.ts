import { createSlice } from "@reduxjs/toolkit";

const tagsSlice=createSlice({
    name:'tags',
    initialState:[],
    reducers:{
        setTags:(state,action)=>action.payload,
        clearTags:()=>[]
    }
})

export const {setTags,clearTags}=tagsSlice.actions

export default tagsSlice.reducer