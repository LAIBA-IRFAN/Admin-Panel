import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import baseURL from "../utils/baseURL"


const initialState = {
  drivers: [],
  attendance:[],
  driversOnLeave:[],
  singleDriver:null,
  allDriversAttendance:[],
  todaysAttendance:[],
  driversAbsentToday:[],
  driversLateToday:[],
  AttendanceBelowAvgCount:[],
  status: 'idle',
  error: null
};

export const getAllDrivers = createAsyncThunk('driver/getAll', async () => {
  try {
    const response = await axios.get(`${baseURL}/driver`);
    return response.data;
  } catch (error) {
    throw new Error('Error fetching drivers');
  }
});


export const addDriver = createAsyncThunk('driver/add', async (driverData) => {
  try {
    const response = await axios.post(`${baseURL}/driver`, driverData);
        return response.data;
  } catch (error) {
    throw new Error('Error adding driver');
  }
});


export const getSingleDriver = createAsyncThunk('driver/getSingle', async (driverId) => {
  try {
    const response = await axios.get(`${baseURL}/driver/${driverId}`);
    return response.data;
  } catch (error) {
    throw new Error('Error fetching single driver');
  }
});


export const updateDriver = createAsyncThunk('driver/update', async ({driverId, driverData}) => {
  try {
    const response = await axios.put(`${baseURL}/driver/${driverId}`, driverData);
    return response.data;
  } catch (error) {
    throw new Error('Error updating driver');
  }
});

export const deleteDriver = createAsyncThunk('driver/delete', async (driverId) => {
  try {
    await axios.delete(`${baseURL}/driver/${driverId}`);
    return driverId;
  } catch (error) {
    throw new Error('Error deleting driver');
  }
});

export const markPresent = createAsyncThunk('driver/markPresent',async({driver})=>{
  try{
      console.log('markPresent')
      const response = await axios.post(`${baseURL}/driverAtt/present/${driver}` , {driver})
      return response.data
  }
  catch(error){
      throw new Error("Attendance is already marked")
  }
})

export const markAbsent = createAsyncThunk('driver/markAbsent',async({driver})=>{
  try{
      console.log('markAbsent')
      const response = await axios.post(`${baseURL}/driverAtt/absent/${driver}` , {driver})
      return response.data

  }
  catch(error){
      throw new Error("Attendance is already marked")
  }
})

export const markLeave = createAsyncThunk('driver/markLeave',async({driver})=>{
  try{
      console.log('markLeave')
      const response = await axios.post(`${baseURL}/driverAtt/leave/${driver}` , {driver})
      return response.data

  }
  catch(error){
      throw new Error("Leave is already marked")
  }
})

export const fetchSingleDriverAttendance = createAsyncThunk('driver/fetchSingleDriverAttendance',async(driver)=>{
  try{
      console.log('fetchSingleDriverAttendance')
      const response = await axios.get(`${baseURL}/driverAttCount/${driver}`)
      return response.data

  }
  catch(error){
      throw new Error("Error fetching single driver attendance")
  }
})

export const fetchAllDriversAttendance = createAsyncThunk('driver/fetchAllDriversAttendance',async()=>{
  try{
      console.log('fetchAllDriversAttendance')
      const response = await axios.get(`${baseURL}/driverAttCount`)
      return response.data

  }
  catch(error){
      throw new Error("Error fetching all drivers attendance")
  }
})

export const createLeave = createAsyncThunk('driver/createLeave',async({driver,leaveType,startDate ,endDate})=>{
  try{
      console.log('createLeave')
      const response = await axios.post(`${baseURL}/driverLeave/${driver}`, {leaveType,startDate,endDate} )
      return response.data

  }
  catch(error){
      throw new Error("Error creating leave")
  }
})

export const fetchAllDriversOnLeave = createAsyncThunk('driver/fetchAllDriversOnLeave',async()=>{
  try{
      console.log('fetchAllDriversOnLeave')
      const response = await axios.get(`${baseURL}/driverLeave`)
      return response.data
  }
  catch(error){
      throw new Error("Error fetching all drivers on leave")
  }
})
export const fetchAttendanceBelowAvgCount = createAsyncThunk('driver/fetchAttendanceBelowAvgCount',async()=>{
  try{
      console.log('/driverAttCount/filterBelowAvg')
      const response = await axios.get(`${baseURL}/driverAttCount/filterBelowAvg`)
      return response.data
  }
  catch(error){
      throw new Error("Error fetching Attendance below avg count")
  }
})

export const fetchTodaysAttendance = createAsyncThunk('driver/fetchTodaysAttendance',async()=>{
  try{
      console.log('fetchTodaysAttendance')
      const response = await axios.get(`${baseURL}/driverAtt/today`)
      return response.data
  }
  catch(error){
      throw new Error("Error fetching today's Attendance")
  }
})

export const fetchAllDriversAbsentToday = createAsyncThunk('driver/fetchAllDriversAbsentToday',async()=>{
  try{
      console.log('fetchAllDriversAbsentToday')
      const response = await axios.get(`${baseURL}/driverAtt/absent`)
      return response.data
  }
  catch(error){
      throw new Error("Error fetching All Drivers Absent Today")
  }
})

export const fetchAllDriversLateToday = createAsyncThunk('driver/fetchAllDriversLateToday',async()=>{
  try{
      console.log('fetchAllDriversLateToday')
      const response = await axios.get(`${baseURL}/driverAtt/late`)
      return response.data
  }
  catch(error){
      throw new Error("Error fetching All Drivers Late Today")
  }
})

export const resetCount = createAsyncThunk('driver/resetCount',async()=>{
  try{
      console.log('resetCount')
      const response = await axios.put(`${baseURL}/reset`)
      return response.data
  }
  catch(error){
      throw new Error("Error resetting count")
  }
})

export const updateCount = createAsyncThunk('driver/updateCount',async()=>{
  try{
      console.log('updateCount')
      const response = await axios.put(`${baseURL}/daysCount`)
      return response.data
  }
  catch(error){
      throw new Error("Error updating count")
  }
})

const driverSlice = createSlice({
  name: 'driver',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllDrivers.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(getAllDrivers.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.drivers = action.payload;
    });
    builder.addCase(getAllDrivers.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    });
    builder.addCase(addDriver.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(addDriver.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.drivers.push(action.payload);
    });
    builder.addCase(addDriver.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    });

    builder.addCase(getSingleDriver.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(getSingleDriver.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const driver = action.payload;
        const index = state.drivers.findIndex((d) => d.id === driver.id);
        if (index !== -1) {
          state.drivers[index] = driver;
        } else {
          state.drivers.push(driver);
        }
      });
    builder.addCase(getSingleDriver.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    });
    builder.addCase(updateDriver.pending, (state) => {
      state.status = 'loading';
    });

    builder.addCase(updateDriver.fulfilled, (state, action) => {
      state.status = 'succeeded';
      const index = state.drivers.findIndex((driver) => driver.id === action.payload.id);
      if (index !== -1) {
        state.drivers[index] = action.payload;
      }
    });
    builder.addCase(updateDriver.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    });
    builder.addCase(deleteDriver.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(deleteDriver.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.drivers = state.drivers.filter((driver) => driver.id !== action.payload);
    });
    builder.addCase(deleteDriver.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    });
    builder.addCase(markPresent.pending, (state)=>{
      state.status = 'loading'
  })
  builder.addCase(markPresent.fulfilled, (state , action)=>{
      state.status = 'succeeded'
      state.attendance.push(action.payload)
      console.log(action.payload)
  
  })
  builder.addCase(markPresent.rejected, (state ,action)=>{
      state.status = 'failed'
      state.error = action.error.message
  })
  builder.addCase(markAbsent.pending, (state)=>{
      state.status = 'loading'
  })
  builder.addCase(markAbsent.fulfilled, (state , action)=>{
      state.status = 'succeeded'
      state.attendance.push(action.payload)
      console.log(action.payload)
  })
  builder.addCase(markAbsent.rejected, (state,action)=>{
      state.status = 'failed'
      state.error = action.error.message;
  })
  builder.addCase(markLeave.pending, (state)=>{
      state.status = 'loading'
      console.log('pending')
  })
  builder.addCase(markLeave.fulfilled, (state , action)=>{
      state.status = 'succeeded'
      state.attendance.push(action.payload)
      console.log(action.payload)
   })
   builder.addCase(markLeave.rejected, (state, action)=>{
      state.status = 'failed'
      state.error = action.error.message
      console.log('failed')
    })
       builder.addCase(fetchSingleDriverAttendance.pending, (state)=>{
       state.status = 'loading'
    })
    builder.addCase(fetchSingleDriverAttendance.fulfilled, (state , action)=>{
       state.status = 'succeeded'
       state.singleDriver = action.payload
  
    })
    builder.addCase(fetchSingleDriverAttendance.rejected, (state, action)=>{
        state.status = 'failed'
        state.error = action.error.message
    })
    builder.addCase(fetchAllDriversAttendance.pending, (state)=>{
      state.status = 'loading'
   })
   builder.addCase(fetchAllDriversAttendance.fulfilled, (state , action)=>{
      state.status = 'succeeded'
      state.allDriversAttendance = action.payload
 
   })
   builder.addCase(fetchAllDriversAttendance.rejected, (state, action)=>{
       state.status = 'failed'
       state.error = action.error.message
   })
    builder.addCase(createLeave.pending, (state)=>{
      state.status = 'loading'
      console.log('pending')
   })
   builder.addCase(createLeave.fulfilled, (state , action)=>{
      state.status = 'succeeded'
      console.log(action.payload)
 
   })
   builder.addCase(createLeave.rejected, (state, action)=>{
       state.status = 'failed'
       state.error = action.error.message
       console.log('failed')
   })
   builder.addCase(fetchAllDriversOnLeave.pending, (state)=>{
    state.status = 'loading'
    console.log('pending')
 })
 builder.addCase(fetchAllDriversOnLeave.fulfilled, (state , action)=>{
    state.status = 'succeeded'
    state.driversOnLeave = action.payload

 })
 builder.addCase(fetchAllDriversOnLeave.rejected, (state, action)=>{ 
     state.status = 'failed'
     state.error = action.error.message
     console.log('failed')
 })
 builder.addCase(fetchAttendanceBelowAvgCount.pending, (state)=>{
  state.status = 'loading'
  console.log('pending')
})
builder.addCase(fetchAttendanceBelowAvgCount.fulfilled, (state , action)=>{
  state.status = 'succeeded'
  state.AttendanceBelowAvgCount = action.payload

})
builder.addCase(fetchAttendanceBelowAvgCount.rejected, (state, action)=>{
   state.status = 'failed'
   state.error = action.error.message
   console.log('failed')
})
builder.addCase(fetchTodaysAttendance.pending, (state)=>{
  state.status = 'loading'
  console.log('pending')
})
builder.addCase(fetchTodaysAttendance.fulfilled, (state , action)=>{
  state.status = 'succeeded'
  state.todaysAttendance= action.payload
  console.log("TODAY'S ATTENDANCE FETCHED")

})
builder.addCase(fetchTodaysAttendance.rejected, (state, action)=>{
   state.status = 'failed'
   state.error = action.error.message
   console.log('failed')
})
builder.addCase(fetchAllDriversAbsentToday.pending, (state)=>{
  state.status = 'loading'
  console.log('pending')
})
builder.addCase(fetchAllDriversAbsentToday.fulfilled, (state , action)=>{
  state.status = 'succeeded'
  state.driversAbsentToday= action.payload

})
builder.addCase(fetchAllDriversAbsentToday.rejected, (state, action)=>{
   state.status = 'failed'
   state.error = action.error.message
   console.log('failed')
})
builder.addCase(fetchAllDriversLateToday.pending, (state)=>{
  state.status = 'loading'
  console.log('pending')
})
builder.addCase(fetchAllDriversLateToday.fulfilled, (state , action)=>{
  state.status = 'succeeded'
  state.driversLateToday = action.payload

})
builder.addCase(fetchAllDriversLateToday.rejected, (state, action)=>{
   state.status = 'failed'
   state.error = action.error.message
   console.log('failed')
})

builder.addCase(resetCount.pending, (state)=>{
  state.status = 'loading'
  console.log('pending')
})
builder.addCase(resetCount.fulfilled, (state , action)=>{
  state.status = 'succeeded'
  console.log('succeeded')

})
builder.addCase(resetCount.rejected, (state, action)=>{
   state.status = 'failed'
   state.error = action.error.message
   console.log('failed')
})

builder.addCase(updateCount.pending, (state)=>{
  state.status = 'loading'
  console.log('pending')
})
builder.addCase(updateCount.fulfilled, (state , action)=>{
  state.status = 'succeeded'
  console.log('succeeded')

})
builder.addCase(updateCount.rejected, (state, action)=>{
   state.status = 'failed'
   state.error = action.error.message
   console.log('failed')
})

  
  }
});

export const driverActions = {
  getAllDrivers,
  addDriver,
  getSingleDriver,
  updateDriver,
  deleteDriver , 
  markPresent,
  markAbsent,
  markLeave ,
  fetchSingleDriverAttendance ,
  fetchAllDriversAttendance ,
  createLeave,
  fetchAllDriversOnLeave , 
  fetchAttendanceBelowAvgCount , 
  fetchTodaysAttendance, 
  fetchAllDriversAbsentToday,
  fetchAllDriversLateToday, 
  resetCount , 
  updateCount
};

export const driverReducer = driverSlice.reducer;
