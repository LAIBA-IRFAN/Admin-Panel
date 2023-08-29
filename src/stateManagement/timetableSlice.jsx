import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import baseURL from "../utils/baseURL"


const initialState = {
    singleBus:[],
    buses:[],
    bus:[],
    busIds:[],
    routes:[],
    verify:[],
    status: 'idle',
    error: null
};

export const fetchASingleBus = createAsyncThunk('timetable/fetchASingleBus',async({id ,shiftNumber})=>{
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

  export const updateASingleBus = createAsyncThunk('timetable/updateASingleBus',async({id,busId,driverId,conductorId,shiftNumber})=>{
    try{
        console.log('updateASingleBus')
        const response = await axios.put(`${baseURL}/bus/${id}?shift=${shiftNumber}`, {busId,driverId,conductorId})
        return response.data
    }
    catch(error){
        throw new Error("Error updating A Single Bus")
    }
  })

export const fetchAllBuses = createAsyncThunk('timetable/fetchAllBuses',async(shiftNumber)=>{
    try{
        console.log('fetchAllBuses')
        const response = await axios.get(`${baseURL}/bus?shift=${shiftNumber}`)
        return response.data
    }
    catch(error){
        throw new Error("Error fetching all Buses")
    }
  })

export const fetchAllBusIds = createAsyncThunk('timetable/fetchAllBusIds',async(shiftNumber)=>{
    try{
        console.log('fetchAllBusIds')
        const response = await axios.get(`${baseURL}/busId`)
        return response.data
   
    }
    catch(error){
        throw new Error("Error fetching all Bus Ids")
    }
  })

  export const fetchAllRoutes = createAsyncThunk('timetable/fetchAllRoutes',async()=>{
    try{
        console.log('fetchAllRoutes')
        const response = await axios.get(`${baseURL}/busRoute`)
        return response.data
    }
    catch(error){
        throw new Error("Error fetching all Routes")
    }
  })

  export const verifyUpdates = createAsyncThunk('timetable/verifyUpdates',async()=>{
    try{
        console.log('verifyUpdates')
        const response = await axios.get(`${baseURL}/bus/verify`)
        return response.data
    }
    catch(error){
        if (error.response && error.response.data && error.response.data.message) {
            const errorMessage = error.response.data.message;
            return {error:errorMessage};
          } else {
            throw new Error("Error verifying updates");
          }
    }
  })

  export const createBus = createAsyncThunk('timetable/createBus',async({routeId,busId,driverId,conductorId,shift})=>{
    try{
        console.log(`${routeId},${busId},${driverId},${conductorId},${shift}`)
        const response = await axios.post(`${baseURL}/bus` , {routeId,busId,driverId,conductorId,shift})
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

  export const deleteABus = createAsyncThunk('timetable/deleteABus',async(id)=>{
    try{
        console.log('deleteABus')
        const response = await axios.delete(`${baseURL}/bus/${id}`)
        return response.data
    }
    catch(error){
        throw new Error("Error deleting a bus")
    }
  })

const timetableSlice = createSlice({
  name: 'timetable',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchASingleBus.pending, (state)=>{
        state.status = 'loading'
     })
     builder.addCase(fetchASingleBus.fulfilled, (state , action)=>{
            state.status = 'succeeded'
            state.singleBus = action.payload
            console.log(state.singleBus)
   
     })
     builder.addCase(fetchASingleBus.rejected, (state, action)=>{
         state.status = 'failed'
         console.log('failed')
     })
    builder.addCase(updateASingleBus.pending, (state)=>{
        state.status = 'loading'
     })
     builder.addCase(updateASingleBus.fulfilled, (state , action)=>{
        state.status = 'succeeded'
        console.log('succeeded')
   
     })
     builder.addCase(updateASingleBus.rejected, (state, action)=>{
         state.status = 'failed'
         console.log('failed')
     })
    builder.addCase(fetchAllBuses.pending, (state)=>{
        state.status = 'loading'
     })
     builder.addCase(fetchAllBuses.fulfilled, (state , action)=>{
        state.status = 'succeeded'
        state.buses = action.payload
   
     })
     builder.addCase(fetchAllBuses.rejected, (state, action)=>{
         state.status = 'failed'
         state.error = action.error.message
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
     builder.addCase(fetchAllRoutes.pending, (state)=>{
        state.status = 'loading'
        console.log('pending')
     })
     builder.addCase(fetchAllRoutes.fulfilled, (state , action)=>{
        state.status = 'succeeded'
        state.routes= action.payload
    
     })
     builder.addCase(fetchAllRoutes.rejected, (state, action)=>{ 
         state.status = 'failed'
         state.error = action.error.message
         console.log('failed')
     })
     builder.addCase(verifyUpdates.pending, (state)=>{
      state.status = 'loading'
      console.log('pending')
   })
   builder.addCase(verifyUpdates.fulfilled, (state , action)=>{
      state.status = 'succeeded'
      if(action.payload && action.payload.error){
        state.error = action.payload.error 
      }
      else{
        state.verify= action.payload
      }
  
   })
   builder.addCase(verifyUpdates.rejected, (state, action)=>{ 
       state.status = 'failed'
       console.log('test')
   })
   builder.addCase(createBus.pending, (state)=>{
    state.status = 'loading'
    console.log('pending')
 })
 builder.addCase(createBus.fulfilled, (state , action)=>{
    state.status = 'succeeded'
    state.bus= action.payload

 })
 builder.addCase(createBus.rejected, (state, action)=>{ 
     state.status = 'failed'
     state.error = action.error.message
     console.log('failed')
 })
 builder.addCase(deleteABus.pending, (state)=>{
    state.status = 'loading'
    console.log('pending')
 })
 builder.addCase(deleteABus.fulfilled, (state , action)=>{
    state.status = 'succeeded'
    console.log('succeeded')

 })
 builder.addCase(deleteABus.rejected, (state, action)=>{ 
     state.status = 'failed'
 })
  }
});

export const driverActions = {
    fetchASingleBus, 
    updateASingleBus, 
    fetchAllBuses,
    fetchAllBusIds,
    fetchAllRoutes, 
    verifyUpdates,
    createBus , 
    deleteABus
};

export const timetableReducer = timetableSlice.reducer;