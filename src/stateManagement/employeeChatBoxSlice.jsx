import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import baseURL from '../utils/baseURL'

const initialState = {
    response:[],
    status:'idle',
    condition:null
}

export const getMessagesOfEmployeeComplaints = createAsyncThunk('employeeChatBox/getMessagesOfEmployeeComplaints', async({employeeId , complainThreadId})=>{
    try{
        const response = await axios.get(`${baseURL}/chatemployee/${employeeId}/${complainThreadId}`)
        return response.data
    }
    catch(error){
        throw new error("Error fetching messages of complaint")
    }
})

export const postMessageOfAdminToEmployee = createAsyncThunk('employeeChatBox/postMessageOfAdminToEmployee',async({employeeId , complainThreadId , messageContent})=>{
    try{
        const response = await axios.post(`${baseURL}/chatemployee/admin/${employeeId}/${complainThreadId}` , {employeeId , complainThreadId , messageContent})
        return response.data;

    }
    catch(error){
        throw new error("Error posting message of admin to employee")
    }
})

export const gettingStatusOfEmployeeComplaint = createAsyncThunk('employeeChatBox/gettingStatusOfEmployeeComplaint',async({employeeId , complainThreadId})=>{
    try{
        const response = await axios.get(`${baseURL}/chatemployee/getstatus/${employeeId}/${complainThreadId}`)
        return response.data
    }
    catch(error){
        throw new error("Error getting status of employee complaint")
    }
})

export const changingStatusOfEmployeeComplaintByAdmin = createAsyncThunk('employeeChatBox/changingStatusOfEmployeeComplaintByAdmin',async({employeeId , complainThreadId})=>{
    try{
        console.log("changingStatusOfEmployeeComplaintByAdmin")
        const response = await axios.post(`${baseURL}/chatemployee/statusadmin/${employeeId}/${complainThreadId}` , {employeeId , complainThreadId})
        return response.data

    }
    catch(error){
        console.log("Error changingStatusOfEmployeeComplaintByAdmin")
        throw new error("Error changing status of employee complaint by Admin")
    }
})
 

const employeeChatBoxSlice = createSlice({
    name:'employeeChatBox',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(getMessagesOfEmployeeComplaints.pending,(state)=>{
            state.status = 'loading';
        })
        builder.addCase(getMessagesOfEmployeeComplaints.fulfilled,(state , action)=>{
            state.status = 'succeeded';
            state.response = action.payload
            state.condition = null;
        })
        builder.addCase(getMessagesOfEmployeeComplaints.rejected,(state)=>{
            state.status = 'failed';
        })
        builder.addCase(postMessageOfAdminToEmployee.pending,(state)=>{
            state.status = 'loading';
        })
        builder.addCase(postMessageOfAdminToEmployee.fulfilled,(state , action)=>{
            state.status = 'succeeded';
            console.log(action.payload)
            // state.response.push(action.payload)
        })
        builder.addCase(postMessageOfAdminToEmployee.rejected,(state)=>{
            state.status = 'failed';
        })
        builder.addCase(changingStatusOfEmployeeComplaintByAdmin.pending,(state)=>{
            state.status = 'loading';
            console.log("CHANGE LOADING")
        })
        builder.addCase(changingStatusOfEmployeeComplaintByAdmin.fulfilled,(state , action)=>{
            state.status = 'succeeded';
            // state.response.push(action.payload)
        })
        builder.addCase(changingStatusOfEmployeeComplaintByAdmin.rejected,(state)=>{
            state.status = 'failed';
            console.log("CHANGE FAILED")
        })
        builder.addCase(gettingStatusOfEmployeeComplaint.pending,(state)=>{
            state.status = 'loading';
        })
        builder.addCase(gettingStatusOfEmployeeComplaint.fulfilled,(state , action)=>{
            state.status = 'succeeded';
            state.condition = action.payload

        })
        builder.addCase(gettingStatusOfEmployeeComplaint.rejected,(state)=>{
            state.status = 'failed';
        })
    }
})

export const chatActions = {  getMessagesOfEmployeeComplaints 
                            ,postMessageOfAdminToEmployee 
                            ,changingStatusOfEmployeeComplaintByAdmin, gettingStatusOfEmployeeComplaint}

export const employeeChatBoxReducer = employeeChatBoxSlice.reducer;
