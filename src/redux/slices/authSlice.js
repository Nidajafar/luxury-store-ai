"use client";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// LOGIN


export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "/api/auth/login",
        userData
      );

      const user = response.data.user;
      const token = response.data.token;

      
      // SAVE AUTH
     

      localStorage.setItem("userToken", token);

      localStorage.setItem(
        "userInfo",
        JSON.stringify(user)
      );

      

      localStorage.setItem(
        "customerEmail",
        user.email.toLowerCase()
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Login Failed"
      );
    }
  }
);



export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "/api/auth/register",
        userData
      );

      const user = response.data.user;
      const token = response.data.token;

      localStorage.setItem("userToken", token);

      localStorage.setItem(
        "userInfo",
        JSON.stringify(user)
      );


      localStorage.setItem(
        "customerEmail",
        user.email.toLowerCase()
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Registration Failed"
      );
    }
  }
);



const authSlice = createSlice({
  name: "auth",

  initialState: {
    user: null,
    token: null,
    loading: false,
    error: null,
  },

  reducers: {
   //initializeAuth will be called on app load to sync state with localStorage
    initializeAuth: (state) => {
      if (typeof window !== "undefined") {
        const userInfo =
          localStorage.getItem("userInfo");

        const userToken =
          localStorage.getItem("userToken");

        if (userInfo && userToken) {
          try {
            const parsedUser =
              JSON.parse(userInfo);

            state.user = parsedUser;
            state.token = userToken;

           

            localStorage.setItem(
              "customerEmail",
              parsedUser.email.toLowerCase()
            );
          } catch (e) {
            localStorage.removeItem("userInfo");
            localStorage.removeItem("userToken");
            localStorage.removeItem("customerEmail");
          }
        }
      }
    },

    //////////////////////////////////////////////////////
    // LOGOUT
  

    logout: (state) => {
      state.user = null;
      state.token = null;

      if (typeof window !== "undefined") {
        
        // REMOVE ALL USER DATA
        

        localStorage.removeItem("userToken");

        localStorage.removeItem("userInfo");

        localStorage.removeItem("customerEmail");

        
        // OPTIONAL
      

        localStorage.removeItem("cartItems");

        localStorage.removeItem("wishlistItems");
      }
    },
  },

  extraReducers: (builder) => {
    builder

    
      // LOGIN
    

      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(
        loginUser.fulfilled,
        (state, action) => {
          state.loading = false;
          state.user = action.payload.user;
          state.token = action.payload.token;
        }
      )

      .addCase(
        loginUser.rejected,
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        }
      )

    
      // REGISTER


      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(
        registerUser.fulfilled,
        (state, action) => {
          state.loading = false;
          state.user = action.payload.user;
          state.token = action.payload.token;
        }
      )

      .addCase(
        registerUser.rejected,
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        }
      );
  },
});

export const {
  logout,
  initializeAuth,
} = authSlice.actions;

export default authSlice.reducer;