// import { createAsyncThunk } from "@reduxjs/toolkit";
// // const BASE_URL_LOCAL = "http://192.168.133.34:5000"

// const BASE_URL_LOCAL = "https://fyp-backend-production.azurewebsites.net"



// export const getStudentDetails = createAsyncThunk(
//     'user/studentdetails',

//     async (props, thunkAPI) => {
//         try {
//             console.log("try", props)
//             const api = await fetch(`${BASE_URL_LOCAL}/student/getAStudent?userId=${props.userId}`, {
//                 method: 'GET',
//                 headers: {
//                     // "Content-Type": 'application/json'
//                     "Authorization": `Bearer ${props.token}`
//                 },
//             });

//             //yhis part is added to explicitly raise error
//             if (!api.ok) {

//                 const errorCuaght = await api.json()
//                 const errortoSend = errorCuaght.Error
//                 // Handle non-200 response status codes here
//                 throw new Error(errortoSend);
//             }

//             const data = await api.json()
//             return data
//         } catch (e) {

//             return thunkAPI.rejectWithValue(e.message);
//         }
//     }
// );






// export const getStudentAllFeesRecord = createAsyncThunk(
//     'user/studentallfees',

//     async (props, thunkAPI) => {
//         try {


//             console.log("try", props)
//             const api = await fetch(`${BASE_URL_LOCAL}/student/overallfeeHistoryofstudent?userId=${props.userId}`, {
//                 method: 'GET',
//                 headers: {
//                     // "Content-Type": 'application/json'
//                     "Authorization": `Bearer ${props.token}`
//                 },
//             });

//             //yhis part is added to explicitly raise error
//             if (!api.ok) {

//                 const errorCuaght = await api.json()
//                 const errortoSend = errorCuaght.Error
//                 // Handle non-200 response status codes here
//                 throw new Error(errortoSend);
//             }

//             const data = await api.json()
//             return data
//         } catch (e) {

//             return thunkAPI.rejectWithValue(e.message);
//         }
//     }
// );









// export const getStudentAllComplaints = createAsyncThunk(
//     'user/studentallcomplaints',

//     async (props, thunkAPI) => {
//         try {


//             console.log("try", props)
//             const api = await fetch(`https://fyp-backend-production.azurewebsites.net/chat/student/${props.userId}`, {
//                 method: 'GET',
//                 headers: {
//                     "Content-Type": 'application/json'
//                     // "Authorization": `Bearer ${props.token}`
//                 },
//             });

//             //yhis part is added to explicitly raise error
//             if (!api.ok) {

//                 const errorCuaght = await api.json()
//                 const errortoSend = errorCuaght.Error
//                 // Handle non-200 response status codes here
//                 throw new Error(errortoSend);
//             }

//             const data = await api.json()
//             return data
//         } catch (e) {

//             return thunkAPI.rejectWithValue(e.message);
//         }
//     }
// );
