import { createSlice } from "@reduxjs/toolkit"



const companySlice = createSlice({
    name:"company",
    initialState:{
        singleCompany:null,
        allCompany:[],
        searchCompanyByText :"",
    },
    reducers:{
        setSingleCompany :(state,action)=>{
            state.singleCompany= action.payload;
        },
        setAllCompany :(state,action)=>{
            state.allCompany = action.payload;
        },
        setSearchByText: (state, action) => {
            state.searchCompanyByText = action.payload;
        },
    }

})

export const { setSingleCompany, setAllCompany,setSearchByText } = companySlice.actions;

export default companySlice.reducer;