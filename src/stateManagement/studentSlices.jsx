import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import baseURL from '../utils/baseURL'


const initialState = {
    singleStudent:[],
    batches:[],
    disciplines:[],
    pending:[],
    paid:[],
    Unpaid:[],
    response:[],
    status:'idle',
    error:null
}

export const addStudent = createAsyncThunk('student/addStudent',async(info)=>{
    try{
        // const details = JSON.stringify(info)
        // console.log(`The Info is ${details}`)
        console.log(info)
        const response = await axios.post(`${baseURL}/student/addStudent` , info)
        console.log(response)
        return response.data;
    }
    catch(error){
        if (error.response && error.response.data && error.response.data.message) {
            const errorMessage = error.response.data.message;
            return {error:errorMessage};
          } else {
            throw new Error("Error adding Student");
          }
        // throw new error("Error adding Student")
    }
}
)

export const getSingleStudent = createAsyncThunk('student/getStudentData',async(id)=>{
    try{
        const response = await axios.get(`${baseURL}/student/getAStudent?userId=${id}`)
        return response.data;
    }
    catch(error){
        throw new error("Error getting Single Student")
    }
}
)


export const editStudent = createAsyncThunk('student/editStudent',async({info , selectedId})=>{
    try{
        const response = await axios.put(`${baseURL}/student/updateStudent/${selectedId}` , info)
        return response.data;
    }
    catch(error){
        throw new Error("Error editting Student")
    }
}
)

export const deleteStudent = createAsyncThunk('student/deleteStudent',async(id)=>{
    try{
        const response = await axios.delete(`${baseURL}/student/${id}`)
        return response.data;
    }
    catch(error){
        throw new Error("Error deleting Student")
    }
}
)

export const getPendingFeesStudents = createAsyncThunk('student/getPendingFeesStudents',async()=>{
    try{
        const response = await axios.get(`${baseURL}/student/pendingFeesStudents`)
        return response.data;
    }
    catch(error){
        throw new Error("Error fetching Pending Fees Students")
    }
}
)

export const getPaidFeesStudents = createAsyncThunk('student/getPaidFeesStudents',async()=>{
    try{
        const response = await axios.get(`${baseURL}/student/paidFeesStudents`)
        return response.data;
    }
    catch(error){
        throw new Error("Error fetching Paid Fees Students")
    }
}
)

export const getUnpaidFeesStudents = createAsyncThunk('student/getUnpaidFeesStudents',async()=>{
    try{
        const response = await axios.get(`${baseURL}/student/unpaidFeesStudents`)
        return response.data;
    }
    catch(error){
        throw new Error("Error fetching Unpaid Fees Students")
    }
}
)

export const feesStatusChangedByAdmin = createAsyncThunk('student/feesStatusChangedByAdmin',async(studentIds)=>{
    try{
        console.log(`The student IDS are ${studentIds}`)
        const response = await axios.put(`${baseURL}/student/feeStatusChangebyAd` , studentIds)
        return response.data;
    }
    catch(error){
        throw new Error("Error changing fees Status")
    }
}
)

export const fetchAllBatches = createAsyncThunk('student/fetchAllBatches',async()=>{
    try{
        const response = await axios.get(`${baseURL}/subCategory/batch` , )
        return response.data;
    }
    catch(error){
        throw new Error("Error fetching All Batches")
    }
}
)
 
export const fetchAllDisciplines = createAsyncThunk('student/fetchAllDisciplines',async()=>{
    try{
        const response = await axios.get(`${baseURL}/subCategory/discipline` , )
        return response.data;
    }
    catch(error){
        throw new Error("Error fetching All Disciplines")
    }
}
)

const studentSlice = createSlice({
    name:'student',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(addStudent.pending,(state)=>{
            state.status = 'loading';
        })
        builder.addCase(addStudent.fulfilled,(state , action)=>{
            state.status = 'succeeded';
            if(action.payload && action.payload.error){
                state.error = action.payload.error 
                console.log(state.error)
              }
        })
        builder.addCase(addStudent.rejected,(state)=>{
            state.status = 'failed';
        })
        builder.addCase(editStudent.pending,(state)=>{
            state.status = 'loading';
        })
        builder.addCase(editStudent.fulfilled,(state , action)=>{
            state.status = 'succeeded';
            state.response = action.payload
            console.log(state.response)
            console.log('succeeded')
        })
        builder.addCase(editStudent.rejected,(state)=>{
            state.status = 'failed';
            console.log('failed')
        })
        builder.addCase(deleteStudent.pending,(state)=>{
            state.status = 'loading';
        })
        builder.addCase(deleteStudent.fulfilled,(state , action)=>{
            state.status = 'succeeded';
        })
        builder.addCase(deleteStudent.rejected,(state)=>{
            state.status = 'failed';
        })
        builder.addCase(getSingleStudent.pending,(state)=>{
            state.status = 'loading';
        })
        builder.addCase(getSingleStudent.fulfilled,(state , action)=>{
            state.status = 'succeeded';
            state.singleStudent = action.payload
        })
        builder.addCase(getSingleStudent.rejected,(state)=>{
            state.status = 'failed';
        })
        builder.addCase(getPendingFeesStudents.pending,(state)=>{
            state.status = 'loading';
        })
        builder.addCase(getPendingFeesStudents.fulfilled,(state , action)=>{
            state.status = 'succeeded';
            state.pending = action.payload
        })
        builder.addCase(getPendingFeesStudents.rejected,(state)=>{
            state.status = 'failed';
        })
        builder.addCase(getPaidFeesStudents.pending,(state)=>{
            state.status = 'loading';
        })
        builder.addCase(getPaidFeesStudents.fulfilled,(state , action)=>{
            state.status = 'succeeded';
            state.paid = action.payload
        })
        builder.addCase(getPaidFeesStudents.rejected,(state)=>{
            state.status = 'failed';
        })
        builder.addCase(getUnpaidFeesStudents.pending,(state)=>{
            state.status = 'loading';
        })
        builder.addCase(getUnpaidFeesStudents.fulfilled,(state , action)=>{
            state.status = 'succeeded';
            state.Unpaid = action.payload
        })
        builder.addCase(getUnpaidFeesStudents.rejected,(state)=>{
            state.status = 'failed';
        })
        builder.addCase(feesStatusChangedByAdmin.pending,(state)=>{
            state.status = 'loading';
            console.log('Pending')
        })
        builder.addCase(feesStatusChangedByAdmin.fulfilled,(state , action)=>{
            state.status = 'succeeded';
        })
        builder.addCase(feesStatusChangedByAdmin.rejected,(state)=>{
            state.status = 'failed';
            console.log('Failed')
        })
        builder.addCase(fetchAllBatches.pending,(state)=>{
            state.status = 'loading';
            console.log('Pending')
        })
        builder.addCase(fetchAllBatches.fulfilled,(state , action)=>{
            state.status = 'succeeded';
            state.batches = action.payload
        })
        builder.addCase(fetchAllBatches.rejected,(state)=>{
            state.status = 'failed';
            console.log('Failed')
        })
        builder.addCase(fetchAllDisciplines.pending,(state)=>{
            state.status = 'loading';
            console.log('Pending')
        })
        builder.addCase(fetchAllDisciplines.fulfilled,(state , action)=>{
            state.status = 'succeeded';
            state.disciplines = action.payload
        })
        builder.addCase(fetchAllDisciplines.rejected,(state)=>{
            state.status = 'failed';
            console.log('Failed')
        })
    }
})

export const studentActions = { addStudent , 
                                getSingleStudent , 
                                getPendingFeesStudents,
                                getPaidFeesStudents , 
                                getUnpaidFeesStudents,
                                feesStatusChangedByAdmin,
                                fetchAllBatches,
                                fetchAllDisciplines
                               }

export const studentReducer = studentSlice.reducer;


