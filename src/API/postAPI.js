/* eslint-disable no-unused-vars */
import { createAsyncThunk } from "@reduxjs/toolkit";
import baseURL from "../utils/baseURL";

export const loginApi = createAsyncThunk(
    'user/login',

    async (credentials, thunkAPI) => {
        try {

            console.log("try",credentials)
            const api = await fetch(`${baseURL}/admin/adminLogin`, {
                method: 'POST',
                headers: {
                    "Content-Type": 'application/json'
                },
                body: JSON.stringify(credentials)
            });

            //yhis part is added to explicitly raise error
            if (!api.ok) {

                const errorCuaght = await api.json()
                const errortoSend = errorCuaght.Error
                // Handle non-200 response status codes here
                throw new Error(errortoSend);
            }

            const data = await api.json()
            return data
        } catch (e) {

            return thunkAPI.rejectWithValue(e.message);
        }
    }
);






