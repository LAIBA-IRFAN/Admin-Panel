// import axios from "axios";
// import { createSlice , createAsyncThunk } from "@reduxjs/toolkit";
// import baseURL from "../utils/baseURL";

// const initialState = {
//     response:[],
//     status:'idle'
// }

// export const markPresent = createAsyncThunk('driverAttendance/markPresent',async({driver})=>{
//     try{
//         console.log('markPresent')
//         const response = await axios.post(`${baseURL}/driverAtt/present/${driver}` , {driver})
//         return response.data
//     }
//     catch(error){
//         throw new error("Error marking present")
//     }
// })

// export const markAbsent = createAsyncThunk('driverAttendance/markAbsent',async({driver})=>{
//     try{
//         console.log('markAbsent')
//         const response = await axios.post(`${baseURL}/driverAtt/absent/${driver}` , {driver})
//         return response.data

//     }
//     catch(error){
//         throw new error("Error marking absent")
//     }
// })

// export const markLeave = createAsyncThunk('driverAttendance/markLeave',async({driver})=>{
//     try{
//         console.log('markLeave')
//         const response = await axios.post(`${baseURL}/driverAtt/leave/${driver}` , {driver})
//         return response.data

//     }
//     catch(error){
//         throw new error("Error marking leave")
//     }
// })

// const driverAttendanceSlice = createSlice({
//     name:'driverAttendance',
//     initialState,
//     reducers:{},
//     extraReducers:(builder)=>{
//         builder.addCase(markPresent.pending, (state)=>{
//             state.status = 'loading'
//         })
//         builder.addCase(markPresent.fulfilled, (state , action)=>{
//             state.status = 'succeeded'
//             state.response.push(action.payload)
//             console.log(action.payload)
        
//         })
//         builder.addCase(markPresent.rejected, (state)=>{
//             state.status = 'failed'
//         })
//         builder.addCase(markAbsent.pending, (state)=>{
//             state.status = 'loading'
//         })
//         builder.addCase(markAbsent.fulfilled, (state , action)=>{
//             state.status = 'succeeded'
//             state.response.push(action.payload)
//             console.log(action.payload)
//         })
//         builder.addCase(markAbsent.rejected, (state)=>{
//             state.status = 'failed'
//         })
//         builder.addCase(markLeave.pending, (state)=>{
//             state.status = 'loading'
//         })
//         builder.addCase(markLeave.fulfilled, (state , action)=>{
//             state.status = 'succeeded'
//             state.response.push(action.payload)
//             console.log(action.payload)
//         })
//         builder.addCase(markLeave.rejected, (state)=>{
//             state.status = 'failed'
//         })
//     }
// })

// export const chatActions = { markPresent , markAbsent , markLeave}

// export const driverAttendanceReducer = driverAttendanceSlice.reducer;
