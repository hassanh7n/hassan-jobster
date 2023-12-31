import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./features/user/userSlice";
import jobSlice from "./features/user/job/jobSlice";
import allJobsSlice from "./features/user/job/allJobsSlice";


export const store = configureStore({
    reducer : {
        user : userSlice,
        job : jobSlice,
        allJobs : allJobsSlice
    },
})