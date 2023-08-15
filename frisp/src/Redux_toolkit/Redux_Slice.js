import { createSlice } from "@reduxjs/toolkit";
export const Redux_Slice=createSlice({
    name:'slice',
    initialState:({       
        reqFilter:'',
        filtersInfo:{},
    }),
   reducers:({    
        reqFilterAction:(state,action)=>{
            state.reqFilter=action.payload
        },
        filterInfoAction:(state,action)=>{
            state.filtersInfo=action.payload
        },   
    }),
})
export const {reqFilterAction,filterInfoAction,}=Redux_Slice.actions
export const SelectreqFilter=(store)=>store.redux_store.reqFilter
export const SelectFilterInfo=(store)=>store.redux_store.filtersInfo

export default Redux_Slice.reducer