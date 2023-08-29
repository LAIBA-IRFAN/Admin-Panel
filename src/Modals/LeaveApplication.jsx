import * as React from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { IconButton } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Box from '@mui/material/Box';
import dayjs from 'dayjs';
import { useDispatch } from 'react-redux';
import { createLeave } from '../stateManagement/driverSlice';
import { createLeaveConductor } from '../stateManagement/conductorSlice';

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

export default function LeaveApplication({viewModal , setViewModal , driverinfo ,singleDriver , conductorinfo , singleConductor }) {

    const dispatch = useDispatch()
    const [leaveType, setLeaveType] = React.useState('');
    const [startDate , setStartDate] = React.useState(dayjs('***-**-**'))
    const [endDate , setEndDate] = React.useState(dayjs('***-**-**'))

    const handleChange = (event) => {
        setLeaveType(event.target.value);
      };
      const LeaveSubmit=async()=>{
        console.log(startDate)
        console.log(endDate)
        driverinfo ? 
        await dispatch(createLeave({driver:singleDriver.driver._id,leaveType,startDate ,endDate })) :
        await dispatch(createLeaveConductor({conductor:singleConductor.conductor._id,leaveType,startDate ,endDate })) 

        setViewModal(false)
      }


  return (
    <div>
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
          {driverinfo ?
          driverinfo.name : 
          conductorinfo.name
          }
          </Typography>
          <Typography id="modal-modal-title" variant="h6" component="h2"
          sx={{
            color:'#770043'
          }}>
          {driverinfo ?
            driverinfo.driver_id : 
            conductorinfo.conductor_id}
          </Typography>

          <Typography
          sx={{
            color:'black',
            fontWeight:400,
            fontSize:'18px',
            mt:2
          }}>
            Create a new Application
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
            Leave type
          </Typography>
          <FormControl fullWidth
          sx={{
            mt:1
          }}>
        <InputLabel id="demo-simple-select-label"
        sx={{
            position:'absolute',
        }}>
        Select a leave type
        </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={leaveType}
          label="Select a leave type"
          onChange={(e) => handleChange(e)}
          sx={{
            textAlign:'left'
          }}
        >
          <MenuItem value={"Sick"}>Sick</MenuItem>
          <MenuItem value={"Personal"}>Personal</MenuItem>
          <MenuItem value={"Travel"}>Travel</MenuItem>
          <MenuItem value={"Other"}>Other</MenuItem>
        </Select>
      </FormControl>
    </Box>

    <Typography
    sx={{
        color:'#770043',
        mt:1,
        textAlign:'left',
        fontWeight:500,
        fontSize:'17px'
    }}>
        Date
    </Typography>
    <Stack
    direction={'row'}>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DatePicker']}>
        <DatePicker label="Start Date"
        value={startDate}
        onChange={(date)=> setStartDate(date)}
            sx={{
                width:'50%'
            }}
        />
      </DemoContainer>
    </LocalizationProvider>

    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DatePicker']}>
        <DatePicker label="End Date" 
        minDate={startDate}
        value={endDate}
        onChange={(date)=> setEndDate(date)}
        />
      </DemoContainer>
    </LocalizationProvider>

    </Stack>

          <Button variant="contained" 
                sx={{
                  mt:8,
                  backgroundColor:'#770043',
                  color:'white',
                  textTransform:'capitalize',
                  width:'200px',
                  fontWeight:500,
                  fontSize:'19px'
                }} 
                onClick={()=>LeaveSubmit()}
            >Submit</Button> 
        </Box>
      </Modal>
    </div>
  );
}