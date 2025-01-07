import { createSlice } from "@reduxjs/toolkit"


const jobSlice = createSlice({
    name: 'jobs',
    initialState: {
        allJob: [],
        loading: false,
        singleJob: null,
        allAdminJobs: [],
        searchJobByText: '',
        allAppliedJob: [],
        searchQueryText: ''

    },
    reducers: {
        setAllJob: (state, action) => {
            state.allJob = action.payload;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setSingleJob: (state, action) => {
            state.singleJob = action.payload;
        },
        setAllAdminJob: (state, action) => {
            state.allAdminJobs = action.payload;
        },
        setSearchJobByText: (state, action) => {
            state.searchJobByText = action.payload;
        },
        setAllAppliedJob: (state, action) => {
            state.allAppliedJob = action.payload;
        },
        setSearchQueryText :(state,action) =>{
            state.searchQueryText = action.payload;
        }

    }
})

export const { setAllJob, setSingleJob, setLoading, setAllAdminJob, setSearchJobByText, setAllAppliedJob ,setSearchQueryText} = jobSlice.actions;

export default jobSlice.reducer;