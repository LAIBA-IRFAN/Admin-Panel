import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import baseURL from '../utils/baseURL'


const initialState = {
    response:[],
    status:'idle',
    condition:null
}


export const getMessagesOfDriverComplaints = createAsyncThunk('driverChatBox/getMessagesOfDriverComplaints', async({driverId , complainThreadId})=>{
    try{
        console.log("getMessagesOfDriverComplaints")
        const response = await axios.get(`${baseURL}/chatdriver/${driverId}/${complainThreadId}`)
        return response.data
    }
    catch(error){
        throw new error("Error fetching messages of complaint")
    }
})

export const postMessageOfAdminToDriver = createAsyncThunk('driverChatBox/postMessageOfAdminToDriver',async({driverId, complainThreadId , messageContent})=>{
    try{
        const response = await axios.post(`${baseURL}/chatdriver/admin/${driverId}/${complainThreadId}` , {driverId, complainThreadId , messageContent})
        return response.data

    }
    catch(error){
        throw new error("Error posting message of admin to driver")
    }
})

export const gettingStatusOfDriverComplaint = createAsyncThunk('driverChatBox/gettingStatusOfDriverComplaint',async({driverId , complainThreadId})=>{
    try{
        const response = await axios.get(`${baseURL}/chatdriver/getstatus/${driverId}/${complainThreadId}`)
        return response.data
    }
    catch(error){
        throw new error("Error getting status of driver complaint")
    }
})


export const changingStatusOfDriverComplaintByAdmin = createAsyncThunk('driverChatBox/changingStatusOfDriverComplaintByAdmin',async({driverId , complainThreadId})=>{
    try{
        const response = await axios.post(`${baseURL}/chatdriver/statusadmin/${driverId}/${complainThreadId}` , {driverId , complainThreadId})
        return response.data

    }
    catch(error){
        throw new error("Error changing status of driver complaint by Admin")
    }
})


const driverChatBoxSlice = createSlice({
    name:'driverChatBox',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(getMessagesOfDriverComplaints.pending,(state)=>{
            state.status = 'loading';
        })
        builder.addCase(getMessagesOfDriverComplaints.fulfilled,(state , action)=>{
            state.status = 'succeeded';
            state.response = action.payload
        })
        builder.addCase(getMessagesOfDriverComplaints.rejected,(state)=>{
            state.status = 'failed';
        })
        builder.addCase(postMessageOfAdminToDriver.pending,(state)=>{
            state.status = 'loading';
            console.log('LOADING')
        })
        builder.addCase(postMessageOfAdminToDriver.fulfilled,(state , action)=>{
            state.status = 'succeeded';
            console.log("MESSAGE POSTED")
            // state.response.push(action.payload)
        })
        builder.addCase(postMessageOfAdminToDriver.rejected,(state)=>{
            state.status = 'failed';
            console.log("ADMIN REPLY TO DRIVER FAILED")
        })
        builder.addCase(changingStatusOfDriverComplaintByAdmin.pending,(state)=>{
            state.status = 'loading';
        })
        builder.addCase(changingStatusOfDriverComplaintByAdmin.fulfilled,(state , action)=>{
            state.status = 'succeeded';
            console.log(action.payload)
            // state.response.push(action.payload)
        })
        builder.addCase(changingStatusOfDriverComplaintByAdmin.rejected,(state)=>{
            state.status = 'failed';
        })
        builder.addCase(gettingStatusOfDriverComplaint.pending,(state)=>{
            state.status = 'loading';
        })
        builder.addCase(gettingStatusOfDriverComplaint.fulfilled,(state , action)=>{
            state.status = 'succeeded';
            state.condition = action.payload

        })
        builder.addCase(gettingStatusOfDriverComplaint.rejected,(state)=>{
            state.status = 'failed';
        })
    }
})


export const chatActions = { getMessagesOfDriverComplaints ,
                              postMessageOfAdminToDriver ,
                            gettingStatusOfDriverComplaint
                        ,changingStatusOfDriverComplaintByAdmin }

export const driverChatBoxReducer = driverChatBoxSlice.reducer;


