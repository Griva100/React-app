import { createSlice } from "@reduxjs/toolkit";
// import axios from "axios";

// const REGISTER_URL = "https://api.freeapi.app/api/v1/users/register";
// const LOGIN_URL = "https://api.freeapi.app/api/v1/users/login";

// // **Register User**
// export const registerUser = createAsyncThunk("auth/registerUser", async (userData, { rejectWithValue }) => {
//     try {
//         console.log("data:", userData);
//         const response = await axios.post(REGISTER_URL, userData);
//         console.log("response:", response.data);
//         return response.data;
//     } catch (error) {
//         return rejectWithValue(error.response ? error.response.data : "Something went wrong");
//     }
// });

// // **Login User**

// // pages >  home > components 

// export const loginUser = createAsyncThunk("auth/loginUser", async (credentials, { rejectWithValue }) => {
//     try {
//         console.log("credentials:", credentials);
//         const response = await axios.post(LOGIN_URL, credentials);
//         console.log("response:", response.data);
//         return response.data;
//     } catch (error) {
//         return rejectWithValue(error.response.data);
//     }
// });

const authSlice = createSlice({
    name: "auth",
    initialState: {
        registeredUser: null,
        user: null,
        status: "idle",
        error: null,
    },
    reducers: {
        registerUser: (state, action) => {
            state.registeredUser = action.payload;
            state.status = "succeeded";
            state.error = null;
        },
        loginUser: (state, action) => {
            const { username, password } = action.payload;

            if (state.registeredUser && state.registeredUser.username === username && state.registeredUser.password === password) {
                state.user = state.registeredUser;
                state.status = "succeeded";
                state.error = null;
            } else {
                state.status = "failed";
                state.error = "Invalid credentials!";
            }
        },
        updateUser: (state, action) => {
            state.user = { ...state.user, ...action.payload };
        },
        logoutUser: (state) => {
            state.user = null;
            state.status = "idle";
            state.error = null;
        }
    },
    // extraReducers: (builder) => {
    //     builder
    //         .addCase(registerUser.pending, (state) => {
    //             state.status = "loading";
    //         })
    //         .addCase(registerUser.fulfilled, (state, action) => {
    //             state.status = "succeeded";
    //             state.user = action.payload.data.user;
    //         })
    //         .addCase(registerUser.rejected, (state, action) => {
    //             state.status = "failed";
    //             state.error = action.payload?.message || "Registration failed";
    //         })
    //         .addCase(loginUser.pending, (state) => {
    //             state.status = "loading";
    //         })
    //         .addCase(loginUser.fulfilled, (state, action) => {
    //             state.status = "succeeded";
    //             state.user = action.payload.data.user;
    //             console.log("Logged in User:", action.payload.data.user);
    //         })
    //         .addCase(loginUser.rejected, (state, action) => {
    //             state.status = "failed";
    //             state.error = action.payload;
    //         });
    // },
});

export const { registerUser, loginUser, updateUser, logoutUser } = authSlice.actions;
export default authSlice.reducer;