import { createSlice } from "@reduxjs/toolkit";



export const listSlice =createSlice({
    name:"list",
    initialState:{
        value:[],
    },
    reducers:{
        add:(state, action)=>{
            state.value = state.value.concat(action.payload)
        },
        toggle:(state,action)=>{
            state.value = state.value.map(e =>(e.content === action.payload ? {...e, isDone : !e.isDone}: e))
        },
        removeOne:(state,action)=>{
            state.value.splice(action.payload,1)
        }
    }
})

export const {add,toggle,removeOne} = listSlice.actions

export default listSlice.reducer