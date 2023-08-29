import baseURL from "../utils/baseURL"
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


const initialState = {
  conductors: [],
  selectedConductor: null,
  attendance:[],
  conductorsOnLeave:[],
  singleConductor:[],
  allConductorsAttendance:[],
  todaysAttendance:[],
  conductorsAbsentToday:[],
  conductorsLateToday:[],
  AttendanceBelowAvgCount:[],
  status: 'idle',
  loading: false,
  error: null,
}
export const addConductor = createAsyncThunk('conductor/addConductor', async (conductorData) => {
  try {
    const response = await axios.post(`${baseURL}/conductor`, conductorData);

    if (response.status !== 200) {
      throw new Error('Failed to add conductor.');
    }

    return response.data;
  } catch (error) {
    throw new Error('Failed to add conductor.');
  }
});

export const getAllConductors = createAsyncThunk('conductor/getAllConductors', async () => {
  try {
    const response = await axios.get(`${baseURL}/conductor`);

    if (response.status !== 200) {
      throw new Error('Failed to fetch conductors.');
    }

    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch conductors.');
  }
});

export const getSingleConductor = createAsyncThunk('conductor/getSingleConductor', async (conductorId) => {
  try {
    const response = await axios.get(`${baseURL}/conductor/${conductorId}`);

    if (response.status !== 200) {
      throw new Error('Failed to fetch conductor.');
    }

    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch conductor.');
  }
});

export const updateConductor = createAsyncThunk('conductor/updateConductor', async ({ conductorId, conductorData }) => {
  try {
    const response = await axios.put(`${baseURL}/conductor/${conductorId}`, conductorData);
    if (response.status !== 200) {
      throw new Error('Failed to update conductor.');
    }
    return response.data;
  } catch (error) {
    throw new Error('Failed to update conductor.');
  }
});

export const deleteConductor = createAsyncThunk('conductor/deleteConductor', async (conductorId) => {
  try {
    const response = await axios.delete(`${baseURL}/conductor/${conductorId}`);

    if (response.status !== 200) {
      throw new Error('Failed to delete conductor.');
    }
  } catch (error) {
    throw new Error('Failed to delete conductor.');
  }
});
export const markPresent = createAsyncThunk('conductor/markPresent',async({conductor})=>{
  try{
      console.log('markPresent')
      const response = await axios.post(`${baseURL}/condAtt/present/${conductor}` , {conductor})
      return response.data
  }
  catch(error){
      throw new Error("Attendance is already marked")
  }
})

export const markAbsent = createAsyncThunk('conductor/markAbsent',async({conductor})=>{
  try{
      console.log('markAbsent')
      const response = await axios.post(`${baseURL}/condAtt/absent/${conductor}` , {conductor})
      return response.data

  }
  catch(error){
      throw new Error("Attendance is already marked")
  }
})

export const markLeave = createAsyncThunk('conductor/markLeave',async({conductor})=>{
  try{
      console.log('markLeave')
      const response = await axios.post(`${baseURL}/condAtt/leave/${conductor}` , {conductor})
      return response.data

  }
  catch(error){
      throw new Error("Leave is already marked")
  }
})

export const fetchSingleConductorAttendance = createAsyncThunk('conductor/fetchSingleConductorAttendance',async(conductor)=>{
  try{
      console.log(`${baseURL}/condAttCount/${conductor}`)
      const response = await axios.get(`${baseURL}/condAttCount/${conductor}`)
      return response.data

  }
  catch(error){
      throw new Error("Error fetching single conductor attendance")
  }
})

export const fetchAllConductorsAttendance = createAsyncThunk('conductor/fetchAllConductorsAttendance',async()=>{
  try{
      console.log('fetchAllConductorsAttendance')
      const response = await axios.get(`${baseURL}/condAttCount`)
      return response.data

  }
  catch(error){
      throw new Error("Error fetching all conductors attendance")
  }
})

export const createLeaveConductor = createAsyncThunk('conductor/createLeaveConductor',async({conductor,leaveType,startDate ,endDate})=>{
  try{
      console.log('createLeaveConductor')
      const response = await axios.post(`${baseURL}/condLeave/${conductor}`, {leaveType,startDate,endDate} )
      return response.data

  }
  catch(error){
      throw new Error("Error creating leave")
  }
})

export const fetchAllConductorsOnLeave = createAsyncThunk('conductor/fetchAllConductorsOnLeave',async()=>{
  try{
      console.log('fetchAllConductorsOnLeave')
      const response = await axios.get(`${baseURL}/condLeave`)
      return response.data
  }
  catch(error){
      throw new Error("Error fetching all conductors on leave")
  }
})
export const fetchAttendanceBelowAvgCount = createAsyncThunk('conductor/fetchAttendanceBelowAvgCount',async()=>{
  try{
      console.log('/condAttCount/filterBelowAvg')
      const response = await axios.get(`${baseURL}/condAttCount/filterBelowAvg`)
      return response.data
  }
  catch(error){
      throw new Error("Error fetching Attendance below avg count")
  }
})

export const fetchTodaysAttendance = createAsyncThunk('conductor/fetchTodaysAttendance',async()=>{
  try{
      console.log('fetchTodaysAttendance')
      const response = await axios.get(`${baseURL}/condAtt/today`)
      return response.data
  }
  catch(error){
      throw new Error("Error fetching today's Attendance")
  }
})

export const fetchAllConductorsAbsentToday = createAsyncThunk('conductor/fetchAllConductorsAbsentToday',async()=>{
  try{
      console.log('fetchAllConductorsAbsentToday')
      const response = await axios.get(`${baseURL}/condAtt/absent`)
      return response.data
  }
  catch(error){
      throw new Error("Error fetching All Conductors Absent Today")
  }
})

export const fetchAllConductorsLateToday = createAsyncThunk('conductor/fetchAllConductorsLateToday',async()=>{
  try{
      console.log('fetchAllConductorsLateToday')
      const response = await axios.get(`${baseURL}/condAtt/late`)
      return response.data
  }
  catch(error){
      throw new Error("Error fetching All Conductors Late Today")
  }
})

const conductorSlice = createSlice({
  name: 'conductor',
  initialState ,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addConductor.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(addConductor.fulfilled, (state, action) => {
      state.loading = false;
      state.conductors.push(action.payload);
    });
    builder.addCase(addConductor.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    builder.addCase(getAllConductors.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getAllConductors.fulfilled, (state, action) => {
      state.loading = false;
      state.conductors = action.payload;
    });
    builder.addCase(getAllConductors.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    builder.addCase(getSingleConductor.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getSingleConductor.fulfilled, (state, action) => {
      state.loading = false;
      state.selectedConductor = action.payload;
    });
    builder.addCase(getSingleConductor.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    builder.addCase(updateConductor.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(updateConductor.fulfilled, (state, action) => {
      state.loading = false;
      const updatedConductor = action.payload;
      const index = state.conductors.findIndex((conductor) => conductor.id === updatedConductor.id);
      if (index !== -1) {
        state.conductors[index] = updatedConductor;
      }
      if (state.selectedConductor && state.selectedConductor.id === updatedConductor.id) {
        state.selectedConductor = updatedConductor;
      }
    });
    builder.addCase(updateConductor.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    builder.addCase(deleteConductor.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(deleteConductor.fulfilled, (state, action) => {
      state.loading = false;
      const conductorId = action.meta.arg;
      state.conductors = state.conductors.filter((conductor) => conductor.id !== conductorId);
      if (state.selectedConductor && state.selectedConductor.id === conductorId) {
        state.selectedConductor = null;
      }
    });
    builder.addCase(deleteConductor.rejected, (state, action) => {
      state.loading = false;
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
       builder.addCase(fetchSingleConductorAttendance.pending, (state)=>{
       state.status = 'loading'
       console.log('pending')
    })
    builder.addCase(fetchSingleConductorAttendance.fulfilled, (state , action)=>{
       state.status = 'succeeded'
       state.singleConductor= action.payload
       console.log(action.payload)
  
    })
    builder.addCase(fetchSingleConductorAttendance.rejected, (state, action)=>{
        state.status = 'failed'
        state.error = action.error.message
        console.log('failed')
    })
    builder.addCase(fetchAllConductorsAttendance.pending, (state)=>{
      state.status = 'loading'
   })
   builder.addCase(fetchAllConductorsAttendance.fulfilled, (state , action)=>{
      state.status = 'succeeded'
      state.allConductorsAttendance = action.payload
 
   })
   builder.addCase(fetchAllConductorsAttendance.rejected, (state, action)=>{
       state.status = 'failed'
       state.error = action.error.message
   })
    builder.addCase(createLeaveConductor.pending, (state)=>{
      state.status = 'loading'
      console.log('pending')
   })
   builder.addCase(createLeaveConductor.fulfilled, (state , action)=>{
      state.status = 'succeeded'
      console.log(action.payload)
 
   })
   builder.addCase(createLeaveConductor.rejected, (state, action)=>{
       state.status = 'failed'
       state.error = action.error.message
       console.log('failed')
   })
   builder.addCase(fetchAllConductorsOnLeave.pending, (state)=>{
    state.status = 'loading'
    console.log('pending')
 })
 builder.addCase(fetchAllConductorsOnLeave.fulfilled, (state , action)=>{
    state.status = 'succeeded'
    state.conductorsOnLeave = action.payload
    console.log(action.payload)

 })
 builder.addCase(fetchAllConductorsOnLeave.rejected, (state, action)=>{ 
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
builder.addCase(fetchAllConductorsAbsentToday.pending, (state)=>{
  state.status = 'loading'
  console.log('pending')
})
builder.addCase(fetchAllConductorsAbsentToday.fulfilled, (state , action)=>{
  state.status = 'succeeded'
  state.conductorsAbsentToday= action.payload

})
builder.addCase(fetchAllConductorsAbsentToday.rejected, (state, action)=>{
   state.status = 'failed'
   state.error = action.error.message
   console.log('failed')
})
builder.addCase(fetchAllConductorsLateToday.pending, (state)=>{
  state.status = 'loading'
  console.log('pending')
})
builder.addCase(fetchAllConductorsLateToday.fulfilled, (state , action)=>{
  state.status = 'succeeded'
  state.conductorsLateToday = action.payload

})
builder.addCase(fetchAllConductorsLateToday.rejected, (state, action)=>{
   state.status = 'failed'
   state.error = action.error.message
   console.log('failed')
})
  },
});

export const conductorActions = {
  addConductor,
  getAllConductors,
  getSingleConductor,
  updateConductor,
  deleteConductor,
  markPresent,
  markAbsent,
  markLeave ,
  fetchSingleConductorAttendance ,
  fetchAllConductorsAttendance ,
  createLeaveConductor,
  fetchAllConductorsOnLeave , 
  fetchAttendanceBelowAvgCount , 
  fetchTodaysAttendance, 
  fetchAllConductorsAbsentToday,
  fetchAllConductorsLateToday
};

export const conductorReducer = conductorSlice.reducer;
