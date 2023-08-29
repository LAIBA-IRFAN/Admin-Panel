import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { loginApi } from '../API/postAPI';




const getUser  =()=>JSON.parse(localStorage.getItem("current_user"))

    console.log("res",getUser)

const userDataslice = createSlice({
    name: "user",
    initialState: {
        auth:getUser()?
        getUser()
        :
        {
            userId: null,
            userToken: null,
            userLoggedin: false,
        },
       
  loading: false,
        errorStatus: "",
        theme: "light",
        userName: "",
        userProfilepic: ""
    },
    reducers: {

        changeTheme: (state, action) => {
            if (state.theme == "light") {
                state.theme = "dark"
            } else if (state.theme == "dark") {
                state.theme = "light"
            }
        },

        logoutUser: (state, action) => {
            console.log("loggout", state)
            state.auth.userId = null,
            state.auth.userToken = null,
            state.auth.userLoggedin = false
            localStorage.removeItem("current_user")

        },
        resetUser: (state, action) => {
            console.log(action.payload)
            state.authuserId = action.payload.userId
            state.auth.userToken = action.payload.userToken,
            state.auth.userLoggedin = true

        },
        resetErrorstate: (state, action) => {
            //when the screens of auth unmounts it should remove error and loading
            //so for next screen it becomes initial again
            //plus when we come back it should give previous data
            state.errorStatus = "",
            state.loading = false
        }
    },
    extraReducers: (builder) => {



        //login
        builder.addCase(loginApi.pending, (state, action) => {
            // console.log("pending", state)

            state.loading = true
        })
        builder.addCase(loginApi.fulfilled, (state, action) => {
            console.log("fulf", action)

                state.auth.userId = action.payload._id,
                state.auth.userToken = action.payload.token,
                state.auth.userLoggedin = true
            const obj = {
                userId: action.payload._id,
                userToken: action.payload.token,
                userLoggedin: true
            }
            // console.log("fulf after set", state)
            const details = JSON.stringify(obj)
            console.log("🚀 ~ file: appSlice.jsx:85 ~ builder.addCase ~ details:", details)
            localStorage.setItem('current_user', details)
            console.log("saved")
            state.loading = false
            state.errorStatus = ""


        })
        builder.addCase(loginApi.rejected, (state, action) => {
            console.log("🚀 ~ file: appSlice.js:97 ~ builder.addCase ~ rejected:", state)
            

            //though it caught in action.error.message but since we have gone with different way to atleasr
            //raise error which wasn't earlier so we are getting it in action.payload
            // console.log("in login failed", action.payload)
            if (action.payload == "Network request failed") {
                state.errorStatus = "Check your Internet Connection"
            }
            state.loading = false
            state.errorStatus = action.payload
        })


    }


})
// export const selectUser = (state) => { state.user.userToken }

export const { logoutUser, changeTheme, resetUser, resetErrorstate } = userDataslice.actions
export default userDataslice.reducer;