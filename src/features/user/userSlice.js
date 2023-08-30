import { toast } from "react-toastify";
import customFetch from "../../utils/axios";
import {addUserToLocalStorage, removeUserFromLocalStorage, getUserFromLocalStorage} from'../../utils/localStorage';


const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");


const initialState = {
    isLoading : false,
    user : getUserFromLocalStorage(),
    isSidebarOpen : false,
};



export const registerUser = createAsyncThunk(
    'user/registerUser',
    async(user, thuunkAPI) => {
        try {
            const resp = await customFetch.post('/auth/register', user);
            return resp.data
        } catch (error) {
            return thuunkAPI.rejectWithValue(error.response.data.msg)
        }
    }
    )
    
    
    export const loginUser = createAsyncThunk(
        'user/loginUser',
        async(user, thunkAPI) => {
            try {
                const resp = await customFetch.post('/auth/login', user);
                return resp.data
            } catch (error) {
                return thunkAPI.rejectWithValue(error.response.data.msg)
            }
        }
        )

export const updateUser = createAsyncThunk(
    'user/updateUser',
    async(user, thunkAPI) => {
        try {
            const resp = await customFetch.patch('/auth/updateUser', user, {
                headers : {
                    authorization : `Bearer ${thunkAPI.getState().user.user.token}`,
                    // authorization: `Bearer `,
                },
            });
            return resp.data
        } catch (error) {
            if(error.response.status = 401){
                thunkAPI.dispatch(logoutUser());
                return thunkAPI.rejectWithValue('Unauthorized! Logging Out...')
            };
            return thunkAPI.rejectWithValue(error.response.data.msg);
        }
    }
)
        
    const userSlice = createSlice({
        name : 'user',
        initialState,
        reducers:{
            logoutUser : (state, {payload}) => {
                state.user = null;
                state.isSidebarOpen = false;
                removeUserFromLocalStorage();
                if(payload){
                    toast.success(payload)
                }
              },
            toggleSidebar : (state) => {
                state.isSidebarOpen = !state.isSidebarOpen;
            }
        },
        extraReducers:(builder) => {
            builder
            .addCase(registerUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(registerUser.fulfilled, (state, {payload}) => {
            const {user} = payload;
            state.isLoading = false;
            state.user = user;
            addUserToLocalStorage(user);
            toast.success(`Hello There ${user.name}`);
            })
            .addCase(registerUser.rejected, (state, {payload}) => {
                state.isLoading = false;
                toast.error(payload)
            })
            .addCase(loginUser.pending, (state) => {
                state.isLoading = true
            })
            .addCase(loginUser.fulfilled, (state, {payload}) => {
                const {user} = payload;
                state.isLoading = false;
                state.user = user;
                addUserToLocalStorage(user);
                toast.success(`Welcome Back ${user.name}`);
            })
            .addCase(loginUser.rejected, (state, {payload}) => {
                state.isLoading = false;
                toast.error(payload)
            })
            .addCase(updateUser.pending, (state) => {
                state.isLoading = true
            })
            .addCase(updateUser.fulfilled, (state, {payload}) => {
                const {user} = payload;
                state.isLoading = false;
                state.user = user;
                addUserToLocalStorage(user);
                toast.success('User updated');
            })
            .addCase(updateUser.rejected, (state, {payload}) => {
                state.isLoading = false;
                toast.error(payload)
            })
        }
        });
        export const {logoutUser, toggleSidebar} = userSlice.actions;
        export default userSlice.reducer;