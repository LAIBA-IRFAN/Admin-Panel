import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import baseURL from '../utils/baseURL'

const initialState = {
    response:[],
    status:'idle',
    condition:null
}

export const getMessagesOfStudentComplaints = createAsyncThunk('studentChatBox/getMessagesOfStudentComplaints', async({studentId , complainThreadId})=>{
    try{
        const response = await axios.get(`${baseURL}/chat/${studentId}/${complainThreadId}`)
        return response.data
    }
    catch(error){
        throw new error("Error fetching messages of complaint")
    }
})

export const postMessageOfAdminToStudent = createAsyncThunk('studentChatBox/postMessageOfAdminToStudent',async({studentId , complainThreadId , messageContent})=>{
    try{
        const response = await axios.post(`${baseURL}/chat/admin/${studentId}/${complainThreadId}` , {studentId , complainThreadId , messageContent})
        return response.data;

    }
    catch(error){
        throw new error("Error posting message of admin to student")
    }
})

export const gettingStatusOfStudentComplaint = createAsyncThunk('studentChatBox/gettingStatusOfStudentComplaint',async({studentId , complainThreadId})=>{
    try{
        const response = await axios.get(`${baseURL}/chat/getstatus/${studentId}/${complainThreadId}`)
        return response.data
    }
    catch(error){
        throw new error("Error getting status of student complaint")
    }
})

export const changingStatusOfStudentComplaintByAdmin = createAsyncThunk('studentChatBox/changingStatusOfStudentComplaintByAdmin',async({studentId , complainThreadId})=>{
    try{
        console.log("changingStatusOfStudentComplaintByAdmin")
        const response = await axios.post(`${baseURL}/chat/statusadmin/${studentId}/${complainThreadId}` , {studentId , complainThreadId})
        return response.data

    }
    catch(error){
        console.log("Error changingStatusOfStudentComplaintByAdmin")
        throw new error("Error changing status of student complaint by Admin")
    }
})
 

const studentChatBoxSlice = createSlice({
    name:'studentChatBox',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(getMessagesOfStudentComplaints.pending,(state)=>{
            state.status = 'loading';
        })
        builder.addCase(getMessagesOfStudentComplaints.fulfilled,(state , action)=>{
            state.status = 'succeeded';
            state.response = action.payload
            state.condition = null;
        })
        builder.addCase(getMessagesOfStudentComplaints.rejected,(state)=>{
            state.status = 'failed';
        })
        builder.addCase(postMessageOfAdminToStudent.pending,(state)=>{
            state.status = 'loading';
        })
        builder.addCase(postMessageOfAdminToStudent.fulfilled,(state , action)=>{
            state.status = 'succeeded';
            console.log(action.payload)
            // state.response.push(action.payload)
        })
        builder.addCase(postMessageOfAdminToStudent.rejected,(state)=>{
            state.status = 'failed';
        })
        builder.addCase(changingStatusOfStudentComplaintByAdmin.pending,(state)=>{
            state.status = 'loading';
            console.log("CHANGE LOADING")
        })
        builder.addCase(changingStatusOfStudentComplaintByAdmin.fulfilled,(state , action)=>{
            state.status = 'succeeded';
            // state.response.push(action.payload)
        })
        builder.addCase(changingStatusOfStudentComplaintByAdmin.rejected,(state)=>{
            state.status = 'failed';
            console.log("CHANGE FAILED")
        })
        builder.addCase(gettingStatusOfStudentComplaint.pending,(state)=>{
            state.status = 'loading';
        })
        builder.addCase(gettingStatusOfStudentComplaint.fulfilled,(state , action)=>{
            state.status = 'succeeded';
            state.condition = action.payload

        })
        builder.addCase(gettingStatusOfStudentComplaint.rejected,(state)=>{
            state.status = 'failed';
        })
    }
})

export const chatActions = {  getMessagesOfStudentComplaints 
                            ,postMessageOfAdminToStudent 
                            ,changingStatusOfStudentComplaintByAdmin, gettingStatusOfStudentComplaint}

export const studentChatBoxReducer = studentChatBoxSlice.reducer;
