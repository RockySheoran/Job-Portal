import { createSlice } from "@reduxjs/toolkit"

const applicationSlice = createSlice({
    name:"application",
    initialState:{
        allApplicant:[],
    },
    reducers:{
        setApplication:(state,action) =>{
            state.allApplicant = action.payload;
        }
    }
})


export const {setApplication} = applicationSlice.actions;

export default applicationSlice.reducer;