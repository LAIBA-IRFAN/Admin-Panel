import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import baseURL from '../utils/baseURL'


const initialState = {
    response:[],
    status:'idle',
    condition:null
}


export const getMessagesOfConductorComplaints = createAsyncThunk('conductorChatBox/getMessagesOfConductorComplaints', async({conductorId , complainThreadId})=>{
    try{
        console.log("getMessagesOfConductorComplaints")
        const response = await axios.get(`${baseURL}/chatconductor/${conductorId}/${complainThreadId}`)
        return response.data;
    }
    catch(error){
        throw new error("Error fetching messages of complaint")
    }
})


export const postMessageOfAdminToConductor = createAsyncThunk('conductorChatBox/postMessageOfAdminToConductor',async({conductorId , complainThreadId , messageContent})=>{
    try{
        console.log(`${baseURL}/chatconductor/admin/${conductorId}/${complainThreadId}`)
        const response = await axios.post(`${baseURL}/chatconductor/admin/${conductorId}/${complainThreadId}` , {conductorId , complainThreadId , messageContent})
        return response.data

    }
    catch(error){
        throw new error("Error posting message of admin to conductor")
    }
})
 
export const gettingStatusOfConductorComplaint = createAsyncThunk('conductorChatBox/gettingStatusOfConductorComplaint',async({conductorId , complainThreadId})=>{
    try{
        const response = await axios.get(`${baseURL}/chatconductor/getstatus/${conductorId}/${complainThreadId}`)
        return response.data
    }
    catch(error){
        throw new error("Error getting status of conductor complaint")
    }
})


export const changingStatusOfConductorComplaintByAdmin = createAsyncThunk('conductorChatBox/changingStatusOfConductorComplaintByAdmin',async({conductorId , complainThreadId})=>{
    try{
        const response = await axios.post(`${baseURL}/chatconductor/statusadmin/${conductorId}/${complainThreadId}` , {conductorId , complainThreadId})
        return response.data

    }
    catch(error){
        throw new error("Error changing status of conductor complaint by Admin")
    }
})


const conductorChatBoxSlice = createSlice({
    name:'conductorChatBox',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(getMessagesOfConductorComplaints.pending,(state)=>{
            state.status = 'loading';
        })
        builder.addCase(getMessagesOfConductorComplaints.fulfilled,(state , action)=>{
            state.status = 'succeeded';
            state.response = action.payload
        })
        builder.addCase(getMessagesOfConductorComplaints.rejected,(state)=>{
            state.status = 'failed';
        })
        builder.addCase(postMessageOfAdminToConductor.pending,(state)=>{
            state.status = 'loading';
            console.log('LOADING')
        })
        builder.addCase(postMessageOfAdminToConductor.fulfilled,(state , action)=>{
            state.status = 'succeeded';
            console.log(action.payload)
            // state.response.push(action.payload)
        })
        builder.addCase(postMessageOfAdminToConductor.rejected,(state)=>{
            state.status = 'failed';
            console.log("ADMIN REPLY TO CONDUCTOR FAILED")
        })
        builder.addCase(changingStatusOfConductorComplaintByAdmin.pending,(state)=>{
            state.status = 'loading';
        })
        builder.addCase(changingStatusOfConductorComplaintByAdmin.fulfilled,(state , action)=>{
            state.status = 'succeeded';
            console.log(action.payload)
            // state.response.push(action.payload)
        })
        builder.addCase(changingStatusOfConductorComplaintByAdmin.rejected,(state)=>{
            state.status = 'failed';
        })
        builder.addCase(gettingStatusOfConductorComplaint.pending,(state)=>{
            state.status = 'loading';
        })
        builder.addCase(gettingStatusOfConductorComplaint.fulfilled,(state , action)=>{
            state.status = 'succeeded';
            state.condition = action.payload

        })
        builder.addCase(gettingStatusOfConductorComplaint.rejected,(state)=>{
            state.status = 'failed';
        })
    }
})

export const chatActions = {  getMessagesOfConductorComplaints
                            ,  postMessageOfAdminToConductor 
                        ,changingStatusOfConductorComplaintByAdmin
                    ,gettingStatusOfConductorComplaint}

export const conductorChatBoxReducer = conductorChatBoxSlice.reducer;


