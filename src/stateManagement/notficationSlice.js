/* eslint-disable no-unused-vars */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import baseURL from "../utils/baseURL";
import axios from 'axios';
// const BASE_URL_LOCAL = "http://192.168.133.34:5000"
// const BASE_URL_LOCAL = "https://fyp-backend-production.azurewebsites.net"


import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { initializeApp } from 'firebase/app';

firebase.initializeApp({
    apiKey: "AIzaSyBvfVUNnYLDgGpn5ZJeWRhOIcvbq-IkB3U",
    authDomain: "final-year-project-72979.firebaseapp.com",
    projectId: "final-year-project-72979",
    storageBucket: "final-year-project-72979.appspot.com",
    messagingSenderId: "380508928272",
    appId: "1:380508928272:web:f977f116e59405ca0c8d95",
    measurementId: "G-R46DC2W3HS"

})

//------------------------------------------
//POST NOTIFICATION
//------------------------------------------

export const postNotificationAction = createAsyncThunk(
    'user/notification',

    async (credentials, thunkAPI) => {
        try {

            // console.log("try", credentials)


            const { message, title, notificationCategory } = credentials;


            const api = await fetch(`http://localhost:5000/notification/addNotification`, {
                method: 'POST',
                headers: {
                    "Content-Type": 'application/json'
                },
                body: JSON.stringify(credentials)
            });

            //yhis part is added to explicitly raise error
            if (!api.ok) {

                const errorCaught = await api.json()
                const errortoSend = errorCaught.message
                // Handle non-200 response status codes here
                throw new Error(errortoSend);
            }

            const data = await api.json()

            //FIREBASE PUSH NOTIFICATION IMPLEMENTATION
            console.log("CATEGORY", notificationCategory)
            if (notificationCategory === "Driver") {
                const tokenCollectionRef = firebase.firestore().collection("drivertoken");
                // console.log(tokenCollectionRef)
                tokenCollectionRef.get().then((querySnapshot) => {
                    // Map the documents to an array of data objects
                    const data = querySnapshot.docs.map((doc) => {
                        return doc.data().token
                    });
                    console.log(data)

                    fetch('http://localhost:5000/send-noti', {
                        method: 'post',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            tokens: data,
                            title,
                            message
                        })
                    })

                    console.log("DRIVER SUCCESS")


                })
            } else if (notificationCategory === "Student") {
                const tokenCollectionRef = firebase.firestore().collection("usertoken");
                // console.log(tokenCollectionRef)
                tokenCollectionRef.get().then((querySnapshot) => {
                    // Map the documents to an array of data objects
                    const data = querySnapshot.docs.map((doc) => {
                        return doc.data().token
                    });
                    console.log(data)

                    fetch('http://localhost:5000/send-noti', {
                        method: 'post',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            tokens: data,
                            title,
                            message
                        })
                    })
                    console.log("STUDENT SUCCESS")
                })
            } else {
                console.log("CATEGORY NOT FOUND")
            }

            return data
        } catch (e) {

            return thunkAPI.rejectWithValue(e.message);
        }
    }
);


//------------------------------------------
//FETCH ALL NOTIFICATION
//------------------------------------------

export const fetchAllNotifications = createAsyncThunk('notification/fetchAllNotifications', async () => {
    try {
      const response = await axios.get(`${baseURL}/notification/all`);
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch notifications');
    }
  });
  


const notificationSlice = createSlice({
    name: "notification",
    initialState: {
        notification: [],
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
        //POST NOTIFICATION
        //------------------------------------------

        builder.addCase(postNotificationAction.pending, (state, action) => {
            state.loading = true
            state.errorStatus = ""
        })
        builder.addCase(postNotificationAction.fulfilled, (state, action) => {
            console.log("fulfILLED", state)
            state.loading = false,
                state.notification = action.payload

        })
        builder.addCase(postNotificationAction.rejected, (state, action) => {
            console.log("🚀 ~ file: appSlice.js:97 ~ builder.addCase ~ rejected:", state)
            if (action.payload == "Network request failed") {
                state.errorStatus = "Check your Internet Connection"
            }
            state.loading = false
            state.errorStatus = action.payload
        })

        //------------------------------------------
        //Fetch NOTIFICATION
        //------------------------------------------
        builder.addCase(fetchAllNotifications.pending, (state) => {
            state.loading = true;
            state.error = null;
          })
          builder.addCase(fetchAllNotifications.fulfilled, (state, action) => {
            state.loading = false;
            state.notification = action.payload
          })
          builder.addCase(fetchAllNotifications.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
          })


    }


})

export const { resetErrorstate } = notificationSlice.actions

export const notificationReducer = notificationSlice.reducer;