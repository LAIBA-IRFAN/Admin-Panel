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
import Checkbox from '@mui/material/Checkbox';
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
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Grid from '@mui/material/Grid';
import { createBus, fetchAllBuses, verifyUpdates } from '../../stateManagement/timetableSlice';
import { addStudent, getPendingFeesStudents } from '../../stateManagement/studentSlices';
import { createBusId, fetchAllBusIds } from '../../stateManagement/busSlice';

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

const AddBus = ({viewModal , setViewModal }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [info , setInfo] = React.useState({busNo:''})
  

  const handleChange = (e) => {
    setInfo((oldObject)=>{
        return {...oldObject , 
            [e.target.name]: e.target.value 
        }
    })
  };

  const SubmitBus = async()=>{
    try{
      console.log(info)
      const response = await dispatch(createBusId(info))
      if(response){
        await dispatch(fetchAllBusIds())
        setViewModal(false)
      }
    }
    catch(error){
      console.log(error)
    }
  }

  return (
    <>
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
          Add Bus ID
          </Typography>

          <Box 
          sx={{ 
            minWidth: 120,
            mt:2
          }}>
          <Grid container spacing={2}>
              <Grid item xs={6}>
          <Typography
          sx={{
            color:'#770043',
            textAlign:'left',
            fontWeight:500,
            fontSize:'17px'
          }}>
            Name
          </Typography>
          <TextField id="outlined-basic" 
          name='busNo'
          value={info.busNo}
          onChange={(e) => handleChange(e)}
           variant="outlined" 
            sx={{
              mt:1

            }}
          />
          </Grid>
         
      </Grid>
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
                onClick={()=>SubmitBus()}
            >Submit</Button> 
        </Box>
      </Modal>
    </>
  );
};

export default AddBus;