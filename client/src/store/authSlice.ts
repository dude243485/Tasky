import { createSlice , createAsyncThunk } from "@reduxjs/toolkit";
import  * as authService from "../services/authService";
import * as userService from "../services/userService";

interface signInParam {
    email : string;
    password: string ;
}
interface signUpParam {
    name : string;
    email : string;
    password : string;

}
export const signinUser = createAsyncThunk(
    "auth/signin", 
    async ({ email, password} : signInParam, 
        { rejectWithValue }
    ) => {
        try {
            const res = await authService.signin(email, password);
            localStorage.setItem("token", res.data.accessToken);
            return res.data.user;
        } catch (err : any) {
            return rejectWithValue(err.response?.data?.message || "Login failed");
        }
    }
);

export const signupUser = createAsyncThunk(
    "auth/signup", 
    async (data: signUpParam, { rejectWithValue }) => {
        try {
            const res = await authService.signup(data.name, data.email, data.password);
            localStorage.setItem("token", res.data.accessToken);
            return res.data.user
        } catch ( err : any ) {
            return rejectWithValue(err.response?.data?.message || "Signup Failed");
        }
    }
)

export const updateUserProfile = createAsyncThunk(
    "auth/updateProfile",
    async (formData: FormData, { rejectWithValue }) => {
        try {
            const res = await userService.updateProfile(formData);
            return res.data.user;
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || "Failed to update profile");
        }
    }
);

export const fetchCurrentUser = createAsyncThunk(
    "auth/fetchCurrentUser",
    async (_, { rejectWithValue }) => {
        try {
            const res = await userService.getUserInfo();
            return res.data.user;
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || "Failed to fetch user");
        }
    }
);



const authSlice = createSlice({
    name : "auth",
    initialState : {
        user : null as any,
        loading : false,
        error : null as string | null,
    }, 

    reducers : {
        logout(state) {
            state.user = null;
            localStorage.removeItem("token");
        },
        setCredentials(state, action) {
            state.user = action.payload.user;
        },
    }, 

    extraReducers: (builder) => {
        builder
        .addCase(signinUser.pending, (state) => { state.loading = true; })
        .addCase(signinUser.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload;
        })
        .addCase(signinUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string ;
        })
        .addCase(signupUser.pending, (state) => { state.loading = true; state.error = null; })
        .addCase(signupUser.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload;
        })
        .addCase(signupUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        })
        .addCase(updateUserProfile.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(updateUserProfile.fulfilled, (state, action) => {
            state.loading = false;
            if (state.user && action.payload) {
                state.user = { ...state.user, ...action.payload };
            } else {
                state.user = action.payload;
            }
        })
        .addCase(updateUserProfile.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        })
        .addCase(fetchCurrentUser.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchCurrentUser.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload;
        })
        .addCase(fetchCurrentUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
            // Clear invalid token if fetching info fails
            localStorage.removeItem("token");
        });
    }
})

export const { logout, setCredentials } = authSlice.actions;
export default authSlice.reducer;