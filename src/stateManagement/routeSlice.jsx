/* eslint-disable no-unused-vars */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import baseURL from "../utils/baseURL";
// const BASE_URL_LOCAL = "http://192.168.133.34:5000"
// const BASE_URL_LOCAL = "https://fyp-backend-production.azurewebsites.net"




//------------------------------------------
//CREATE ROUTE
//------------------------------------------

export const createRouteAction = createAsyncThunk(
    'user/route',

    async (routeDetails, thunkAPI) => {
        try {

            // console.log("try", credentials)



            const api = await fetch(`http://localhost:5000/busRoute/`, {
                method: 'POST',
                headers: {
                    "Content-Type": 'application/json'
                },
                body: JSON.stringify(routeDetails)
            });

            //yhis part is added to explicitly raise error
            if (!api.ok) {

                const errorCaught = await api.json()
                const errortoSend = errorCaught.message
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


//------------------------------------------
//FETCH ALL ROUTES
//------------------------------------------

export const fetchAllRouteAction = createAsyncThunk(
    'fetch/allroutes',

    async (props, thunkAPI) => {
        try {
            console.log("try", props)
            const api = await fetch(`${baseURL}/busRoute`, {
                method: 'GET',
                headers: {
                    "Content-Type": 'application/json'
                    // "Authorization": `Bearer ${props.token}`
                },
            });

            //yhis part is added to explicitly raise error
            if (!api.ok) {

                const errorCuaght = await api.json()
                const errortoSend = errorCuaght.message
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

//------------------------------------------
//FETCH A SINGLE ROUTE
//------------------------------------------

export const fetchASingleRouteAction = createAsyncThunk(
    'fetch/route',

    async (props, thunkAPI) => {
        
        try {
            console.log("try", props)
            const api = await fetch(`${baseURL}/busRoute/singleRoute`, {
                method: 'POST',
                headers: {
                    "Content-Type": 'application/json'
                },
                body: JSON.stringify(props)
            });

            //yhis part is added to explicitly raise error
            if (!api.ok) {

                const errorCuaght = await api.json()
                const errortoSend = errorCuaght.message
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


//------------------------------------------
//UPDATE ROUTE
//------------------------------------------

export const updateRouteAction = createAsyncThunk(
    'update/route',

    async (routeDetails, thunkAPI) => {
        try {

            console.log("try", routeDetails)



            const api = await fetch(`http://localhost:5000/busRoute/updateRoute`, {
                method: 'PUT',
                headers: {
                    "Content-Type": 'application/json'
                },
                body: JSON.stringify(routeDetails)
            });

            //yhis part is added to explicitly raise error
            if (!api.ok) {

                const errorCaught = await api.json()
                const errortoSend = errorCaught.message
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





const routeSlice = createSlice({
    name: "route",
    initialState: {
        loading: false,
        errorStatus: "",
    },
    reducers: {
        resetErrorstate: (state, action) => {
            //when the screens of auth unmounts it should remove error and loading
            //so for next screen it becomes initial again
            //plus when we come back it should give previous data
            state.errorStatus = "",
                state.loading = false
        }
    },
    extraReducers: (builder) => {

        //------------------------------------------
        //CREATE ROUTE
        //------------------------------------------

        builder.addCase(createRouteAction.pending, (state, action) => {
            state.loading = true
            state.errorStatus = ""
        })
        builder.addCase(createRouteAction.fulfilled, (state, action) => {
            console.log("fulfILLED", state)
            state.loading = false,
                state.newRoute = action.payload

        })
        builder.addCase(createRouteAction.rejected, (state, action) => {
            console.log("REJECTED", state)
            if (action.payload == "Network request failed") {
                state.errorStatus = "Check your Internet Connection"
            }
            state.loading = false
            state.errorStatus = action.payload
        })

        //------------------------------------------
        //FETCH ALL ROUTES
        //------------------------------------------

        builder.addCase(fetchAllRouteAction.pending, (state, action) => {
            state.loading = true
            state.errorStatus = ""
        })
        builder.addCase(fetchAllRouteAction.fulfilled, (state, action) => {
            console.log("fulfILLED", state)
            state.loading = false,
                state.allRoutes = action.payload

        })
        builder.addCase(fetchAllRouteAction.rejected, (state, action) => {
            console.log("REJECTED", state)
            if (action.payload == "Network request failed") {
                state.errorStatus = "Check your Internet Connection"
            }
            state.loading = false
            state.errorStatus = action.payload
        })

         //------------------------------------------
        //FETCH A SINGLE ROUTE
        //------------------------------------------

        builder.addCase(fetchASingleRouteAction.pending, (state, action) => {
            state.loading = true
            state.errorStatus = ""
        })
        builder.addCase(fetchASingleRouteAction.fulfilled, (state, action) => {
            console.log("fulfILLED", state)
            state.loading = false,
            state.singleRoute = action.payload

        })
        builder.addCase(fetchASingleRouteAction.rejected, (state, action) => {
            console.log("REJECTED", state)
            if (action.payload == "Network request failed") {
                state.errorStatus = "Check your Internet Connection"
            }
            state.loading = false
            state.errorStatus = action.payload
        })


        //------------------------------------------
        //UPDATE A SINGLE ROUTE
        //------------------------------------------

        builder.addCase(updateRouteAction.pending, (state, action) => {
            state.loading = true
            state.errorStatus = ""
        })
        builder.addCase(updateRouteAction.fulfilled, (state, action) => {
            console.log("fulfILLED", state)
            state.loading = false,
            state.updatedRoute = action.payload

        })
        builder.addCase(updateRouteAction.rejected, (state, action) => {
            console.log("REJECTED", state)
            if (action.payload == "Network request failed") {
                state.errorStatus = "Check your Internet Connection"
            }
            state.loading = false
            state.errorStatus = action.payload
        })


    }


})

export const { resetErrorstate } = routeSlice.actions

export const routeReducer = routeSlice.reducer;