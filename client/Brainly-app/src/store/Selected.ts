import { createSlice } from "@reduxjs/toolkit"; 

const SelectedSlice=createSlice({
    name:"selected",
    initialState:null,
    reducers:{
        setSelected:(state,action)=>action.payload,
        clearSelected:()=>null
    }
})

export const {setSelected,clearSelected}=SelectedSlice.actions

export default SelectedSlice.reducer