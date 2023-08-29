import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import baseURL from "../utils/baseURL"


const initialState = {
    singleBusId:[],
    // buses:[],
    bus:[],
    busIds:[],
    // routes:[],
    // verify:[],
    status: 'idle',
    error: null
};

export const fetchASingleBusId = createAsyncThunk('bus/fetchASingleBusId',async({id ,shiftNumber})=>{
    try{
        console.log(`${baseURL}/bus/${id}?shift=${shiftNumber}`)
        const response = await axios.get(`${baseURL}/bus/${id}?shift=${shiftNumber}`)
        console.log(response)
        return response.data
    }
    catch(error){
        throw new Error("Error fetching A Single Bus")
    }
  })

export const fetchAllBusIds = createAsyncThunk('bus/fetchAllBusIds',async()=>{
    try{
        console.log('fetchAllBusIds')
        const response = await axios.get(`${baseURL}/busId`)
        return response.data
   
    }
    catch(error){
        throw new Error("Error fetching all Bus Ids")
    }
  })

  export const createBusId = createAsyncThunk('bus/createBusId',async({busNo})=>{
    try{
        const response = await axios.post(`${baseURL}/busId` , {busNo})
        if(!response){
          console.log(response.error.message)
          return response.error.message
        }
        return response.data
    }
    catch(error){
        throw new Error("Error creating bus")
    }
  })

  export const deleteABusId = createAsyncThunk('bus/deleteABusId',async(id)=>{
    try{
        console.log(`${baseURL}/busId/${id}`)
        const response = await axios.delete(`${baseURL}/busId/${id}`)
        return response.data
    }
    catch(error){
        throw new Error("Error deleting a bus")
    }
  })

const busSlice = createSlice({
  name: 'bus',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchASingleBusId.pending, (state)=>{
        state.status = 'loading'
     })
     builder.addCase(fetchASingleBusId.fulfilled, (state , action)=>{
            state.status = 'succeeded'
            state.singleBusId = action.payload
            console.log(state.singleBusId)
   
     })
     builder.addCase(fetchASingleBusId.rejected, (state, action)=>{
         state.status = 'failed'
         console.log('failed')
     })

    builder.addCase(fetchAllBusIds.pending, (state)=>{
        state.status = 'loading'
     })
     builder.addCase(fetchAllBusIds.fulfilled, (state , action)=>{
        state.status = 'succeeded'
        state.busIds = action.payload
   
     })
     builder.addCase(fetchAllBusIds.rejected, (state, action)=>{
         state.status = 'failed'
         state.error = action.error.message
         console.log('failed')
     })
   builder.addCase(createBusId.pending, (state)=>{
    state.status = 'loading'
    console.log('pending')
 })
 builder.addCase(createBusId.fulfilled, (state , action)=>{
    state.status = 'succeeded'
    state.bus= action.payload

 })
 builder.addCase(createBusId.rejected, (state, action)=>{ 
     state.status = 'failed'
     state.error = action.error.message
     console.log('failed')
 })
 builder.addCase(deleteABusId.pending, (state)=>{
    state.status = 'loading'
    console.log('pending')
 })
 builder.addCase(deleteABusId.fulfilled, (state , action)=>{
    state.status = 'succeeded'
    console.log('succeeded')

 })
 builder.addCase(deleteABusId.rejected, (state, action)=>{ 
     state.status = 'failed'
 })
  }
});

export const driverActions = {
    fetchASingleBusId, 
    fetchAllBusIds,
    createBusId , 
    deleteABusId
};

export const busReducer = busSlice.reducer;