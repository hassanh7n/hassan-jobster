import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import customFetch from "../../../utils/axios";
import { logoutUser } from "../userSlice";
import { clearValues } from "./jobSlice";


const initialFilterState = {
    search : '',
    searchStatus : 'all',
    searchType : 'all',
    sort : 'latest',
    sortOptions : ['latest', 'oldest', 'a-z', 'z-a'],
};

const initialState = {
    isLoading: true,
    jobs: [],
    totalJobs: 0,
    numOfPages: 1,
    page: 1,
    stats: {},
    monthlyApplications: [],
    ...initialFilterState,
  };


  export const getAllJobs = createAsyncThunk(
    'allJobs/getJobs',
    async (_, thunkAPI) => {
      const { page, search, searchStatus, searchType, sort } =
      thunkAPI.getState().allJobs;
      let url = `/jobs?status=${searchStatus}&jobType=${searchType}&sort=${sort}&page=${page}`;
      
      if (search) {
        url = url + `&search=${search}`;
      }
  
      try {
        const resp = await customFetch.get(url, {
          headers: {
            authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
          },
        });
  
        return resp.data;
      } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.msg);
      }
    }
  );


  export const showStats = createAsyncThunk(
    'alljobs/showStats',
    async(_, thunkAPI) => {
      try {
        const resp = await customFetch.get('/jobs/stats', {
          headers: {
            authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
          },
        })
        console.log(resp.data);
        return resp.data;
      } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.msg);
      }
    }
  )
 





  const allJobsSlice = createSlice({
    name : 'allJobs',
    initialState,
    reducers:{
      showLoading: (state) => {
        state.isLoading = true;
      },
      hideLoading : (state) => {
        state.isLoading = false
      },
      handleChange : (state, { payload  : {name, value}}) => {
         state.page = 1
        state[name] = value;
      },
      clearFilters: (state) => {
        return {...state, ...initialFilterState}
      },
      changePage : (state, {payload}) => {
        state.page =  payload;
      },
      clearAllJobsState : () => initialState,
    },
    extraReducers: (builder) => {
        builder
          .addCase(getAllJobs.pending, (state) => {
            state.isLoading = true;
          })
          .addCase(getAllJobs.fulfilled, (state, { payload }) => {
            state.isLoading = false;
            console.log(payload);
            const {jobs, numOfPages, totalJobs} = payload;
            state.jobs = jobs;
            state.numOfPages = numOfPages;
            state.totalJobs = totalJobs;
          })
          .addCase(getAllJobs.rejected, (state, { payload }) => {
            state.isLoading = false;
            toast.error(payload);
          })
          .addCase(showStats.pending, (state) => {
            state.isLoading = true;
          })
          .addCase(showStats.fulfilled, (state, {payload})  => {
            state.isLoading = false;
            state.stats = payload.defaultStats;
            state.monthlyApplications = payload.monthlyApplications;
          })
          .addCase(showStats.rejected, (state, {payload}) => {
            state.isLoading = false;
            toast.error(payload)
          })
    }
  });

  

  export const {
    hideLoading, 
    showLoading,
    handleChange,
    clearFilters,
    changePage,
    clearAllJobsState
  } = allJobsSlice.actions;
  export default allJobsSlice.reducer;