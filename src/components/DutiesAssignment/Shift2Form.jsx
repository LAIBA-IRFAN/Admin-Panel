import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TableRow from '@mui/material/TableRow';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import CancelIcon from '@mui/icons-material/Cancel';
import Select from '@mui/material/Select';
import { createBus, fetchAllBuses, verifyUpdates } from '../../stateManagement/timetableSlice';
import Shift1Duties from './Shift1Duties';

const style = {
  position: 'relative',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 470,
  pt: 4,
  pb:4,
  pl:3,
  pr:3,
  textAlign: 'center',
  background: 'white',
  boxShadow: '50px 50px 50px 2px rgba(28, 18, 23, 0.1)',
  borderRadius: '30px',
  color: 'white',
  fontWeight: 300
};

const Shift2Form = ({viewModal , setViewModal , setShift2Form , setShift2Table}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const {drivers} = useSelector((state) => state.driver);
  const {conductors} = useSelector((state) => state.conductor);
  const {busIds , routes} = useSelector((state) => state.timetable);
  
  const [count , setCount] = React.useState(1)
  const [busId, setBusId] = React.useState(0);
  const [driverId, setDriverId] = React.useState(0);
  const [conductorId, setConductorId] = React.useState(0);
  const [shift1Info , setShift1Info] = React.useState([]);

  const handleChangeBus = (e) => {
    setBusId(e.target.value)
    console.log(busId)
  };

  const handleChangeDriver = (e) => {
    setDriverId(e.target.value)
  };

  const handleChangeConductor = (e) => {
    setConductorId(e.target.value)
  };

  const VerifyUpdates=async()=>{
    const response = await dispatch(verifyUpdates())
  }

  const CreateBus = async(routeId,routeNo,index)=>{
    try{
      const response = await dispatch(createBus({routeId,busId,driverId,conductorId,shift:2}))
      if(response){
        if(routes.length !== index+1){
          const filteredRoute = routes[index+1]
          setCount(filteredRoute.routeNo)
          await setBusId('')
          await setDriverId('')
          await setConductorId('')
        }

        else{
          setViewModal(false)
          await dispatch(fetchAllBuses(2))
          setShift2Table(true)
          setShift2Form(false)
        }
      }
    }
    catch(error){
      console.log(error)
    }
  }

const [leaveType, setLeaveType] = React.useState('');

  return (
    <>
    {routes.map((route,index)=>{
      if(route.routeNo === count){
        return(
          <Modal
        open={viewModal}
        onClose={()=> setViewModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
              <Box sx={style}>
        <IconButton
        sx={{
            position:'absolute',
            right:0,
            top:0
        }}
        onClick={()=> setViewModal(false)}>
          <CancelIcon fontSize='large' 
          sx={{
            color:'#770043'
            }}/>
        </IconButton>
          <Typography id="modal-modal-title" variant="h6" component="h2"
          sx={{
            color:'#770043'
          }}>
          Create a bus
          </Typography>

          <Box 
          sx={{ 
            minWidth: 120,
            mt:2
          }}>
          <Typography
          sx={{
            color:'#770043',
            textAlign:'left',
            fontWeight:500,
            fontSize:'17px'
          }}>
            Routes
          </Typography>
          <TextField id="outlined-basic" 
          label={`Route ${route.routeNo}`}
           variant="outlined" disabled='true'
            sx={{
              width:'100%',
              mt:1
            }}
          />
          <Typography
          sx={{
            color:'#770043',
            textAlign:'left',
            fontWeight:500,
            fontSize:'17px',
            mt:2
          }}>
            Bus No.
          </Typography>
          <FormControl fullWidth
          sx={{
            mt:1
          }}>
        <InputLabel id="demo-simple-select-label"
        sx={{
            position:'absolute',
        }}>
        Select Bus
        </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={busId}
          label="Select a leave type"
          onChange={(e) => handleChangeBus(e)}
          sx={{
            textAlign:'left'
          }}
        >
        {busIds.map((bus)=>
          <MenuItem value={bus._id}>{bus.busNo}</MenuItem>
        )}
        </Select>
      </FormControl>
      <Typography
          sx={{
            color:'#770043',
            textAlign:'left',
            fontWeight:500,
            fontSize:'17px',
            mt:2
          }}>
            Driver Name
          </Typography>
          <FormControl fullWidth
          sx={{
            mt:1
          }}>
        <InputLabel id="demo-simple-select-label"
        sx={{
            position:'absolute',
        }}>
        Select Driver
        </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={driverId}
          label="Select a leave type"
          onChange={(e) => handleChangeDriver(e)}
          sx={{
            textAlign:'left'
          }}
        >
        {drivers.map((driver)=>
          <MenuItem value={driver._id}>{driver.name}</MenuItem>
        )}
        </Select>
      </FormControl>
      <Typography
          sx={{
            color:'#770043',
            textAlign:'left',
            fontWeight:500,
            fontSize:'17px',
            mt:2
          }}>
            Conductor Name
          </Typography>
          <FormControl fullWidth
          sx={{
            mt:1
          }}>
        <InputLabel id="demo-simple-select-label"
        sx={{
            position:'absolute',
        }}>
        Select Conductor
        </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={conductorId}
          label="Select a leave type"
          onChange={(e) => handleChangeConductor(e)}
          sx={{
            textAlign:'left'
          }}
        >
        {conductors.map((conductor)=>
          <MenuItem value={conductor._id}>{conductor.name}</MenuItem>
        )}
        </Select>
      </FormControl>
    </Box>

             <Button variant="contained" 
                sx={{
                  mt:6,
                  backgroundColor:'#770043',
                  color:'white',
                  textTransform:'capitalize',
                  width:'200px',
                  fontWeight:500,
                  fontSize:'19px'
                }} 
                onClick={()=>CreateBus(route._id,route.routeNumber, index)}
            >Submit</Button> 
        </Box>
      </Modal>

        )
      }
      
      
    })}
    </>
  );
};

export default Shift2Form;