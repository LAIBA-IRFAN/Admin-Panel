import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import baseURL from '../utils/baseURL'


const initialState = {
    response:[],
    status:'idle',
    error:null
}

export const getAllStudentComplaints = createAsyncThunk('chatList/getStudentComplaints',async(condition)=>{
    try{
        const response = await axios.get(`${baseURL}/chat/getcomplaints?filterCondition=${condition}`)
        return response.data;
    }
    catch(error){
        throw new error("Error fetching complaints")
    }
}
)

export const getAllDriverComplaints = createAsyncThunk('chatList/getDriverComplaints', async(condition)=>{
    try{
        const response = await axios.get(`${baseURL}/chatdriver/getcomplaints?filterCondition=${condition}`)
        return response.data; 
    }
    catch(error){
        throw new error("Error fetching complaints")
    }
})

export const getAllConductorComplaints = createAsyncThunk('chatList/getConductorComplaints', async(condition)=>{
    try{
        const response = await axios.get(`${baseURL}/chatconductor/getcomplaints?filterCondition=${condition}`)
        return response.data; 
    }
    catch(error){
        throw new error("Error fetching complaints")
    }
})

export const getAllEmployeeComplaints = createAsyncThunk('chatList/getEmployeeComplaints', async(condition)=>{
    try{
        const response = await axios.get(`${baseURL}/chatemployee/getcomplaints?filterCondition=${condition}`)
        return response.data; 
    }
    catch(error){
        throw new error("Error fetching complaints")
    }
})
 


const chatListSlice = createSlice({
    name:'chatList',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(getAllStudentComplaints.pending,(state)=>{
            state.status = 'loading';
        })
        builder.addCase(getAllStudentComplaints.fulfilled,(state , action)=>{
            state.status = 'succeeded';
            state.response = action.payload
        })
        builder.addCase(getAllStudentComplaints.rejected,(state)=>{
            state.status = 'failed';
        })
        builder.addCase(getAllDriverComplaints.pending,(state)=>{
            state.status = 'loading';
        })
        builder.addCase(getAllDriverComplaints.fulfilled,(state , action)=>{
            state.status = 'succeeded';
            state.response = action.payload
        })
        builder.addCase(getAllDriverComplaints.rejected,(state)=>{
            state.status = 'failed';
        })
        builder.addCase(getAllConductorComplaints.pending,(state)=>{
            state.status = 'loading';
        })
        builder.addCase(getAllConductorComplaints.fulfilled,(state , action)=>{
            state.status = 'succeeded';
            state.response = action.payload
        })
        builder.addCase(getAllConductorComplaints.rejected,(state)=>{
            state.status = 'failed';
        })
        builder.addCase(getAllEmployeeComplaints.pending,(state)=>{
            state.status = 'loading';
        })
        builder.addCase(getAllEmployeeComplaints.fulfilled,(state , action)=>{
            state.status = 'succeeded';
            state.response = action.payload
        })
        builder.addCase(getAllEmployeeComplaints.rejected,(state)=>{
            state.status = 'failed';
        })
    }
})

export const chatActions = {getAllStudentComplaints , 
    getAllDriverComplaints , getAllConductorComplaints
, getAllEmployeeComplaints }

export const chatListReducer = chatListSlice.reducer;


