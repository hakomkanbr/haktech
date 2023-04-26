import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getSession } from "next-auth/react";
import pointsSite from "points.site";
import { UserReducers } from "redux/types";
import axiosConfig from "services/api";
const jwt = require("jsonwebtoken");
const initialState: UserReducers = {
    user: {},
    loading: false
};

export const checkUserLogin: any = createAsyncThunk(
    "user/getsession", async (_, thunkAPI) => {
        try {
            let session: any = await getSession();
            if (!session) {
                throw "401"
            }
            console.info("session : ", session);
            const token = jwt.verify(
                session?.user.token,
                process.env.NEXT_PUBLIC_NEXTAUTH_SECRET
            )
            if (typeof token === "object") {
                token.id = session?.user?.id
                token.username = session?.user?.username
            }

            return token;
        } catch (err) {
            console.info("err : ", err);
            return err;
        }
    }
)

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        login(state, action) {
            state.user = action.payload
        },
        logout(state, action) {
        },
    },
    extraReducers: {
        [checkUserLogin.pending]: (state, action) => {
            state.loading = true;
        },
        [checkUserLogin.fulfilled]: (state, action) => {
            state.loading = false;
            if (typeof action.payload != "string") {
                state.user = action.payload;
            }
        },
        [checkUserLogin.rejected]: (state, action) => {
            state.loading = false;
        },
    },
});

export const {
    login,
    logout
} = userSlice.actions;
export default userSlice.reducer;
