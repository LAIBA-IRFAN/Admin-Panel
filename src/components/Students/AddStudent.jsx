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

const AddStudent = ({viewModal , setViewModal }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [info , setInfo] = React.useState({name:'',
    email:'' , password:'',phone:'', categoryId:'', gender:'', studentId:'',
    profilePhoto:'' , batch:'' , discipline:'' , rollNo:'' , level:'' , pointUser:false})

  const {categories} = useSelector((state)=> state.category)
  const {batches , disciplines} = useSelector((state)=> state.student)
  

  const handleChange = (e) => {
    setInfo((oldObject)=>{
        return {...oldObject , 
            [e.target.name]:e.target.name !== 'pointUser'? e.target.value : e.target.checked
        }
    })
  };

  const CreateStudent = async()=>{
    try{
      console.log(info)
      const response = await dispatch(addStudent(info))
      if(response){
        await dispatch(getPendingFeesStudents())
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
          Add Student
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
          name='name'
          value={info.name}
          onChange={(e) => handleChange(e)}
           variant="outlined" 
            sx={{
              mt:1

            }}
          />
          </Grid>
          <Grid item xs={6}>
        <Typography
          sx={{
            color:'#770043',
            textAlign:'left',
            fontWeight:500,
            fontSize:'17px'
          }}>
            Email
          </Typography>
          <TextField id="outlined-basic" 
           variant="outlined" 
           name='email'
           value={info.email}
           onChange={(e) => handleChange(e)}
            sx={{
              mt:1
            }}
          />
          </Grid>
          <Grid item xs={6}>
          <Typography
          sx={{
            color:'#770043',
            textAlign:'left',
            fontWeight:500,
            fontSize:'17px'
          }}>
            Password
          </Typography>
          <TextField id="outlined-basic" 
           variant="outlined" 
           name='password'
           value={info.password}
           onChange={(e) => handleChange(e)}
            sx={{
              mt:1

            }}
          />
          </Grid>
          <Grid item xs={6}>
        <Typography
          sx={{
            color:'#770043',
            textAlign:'left',
            fontWeight:500,
            fontSize:'17px'
          }}>
            Phone
          </Typography>
          <TextField id="outlined-basic" 
           variant="outlined" 
           name='phone'
           value={info.phone}
           onChange={(e) => handleChange(e)}
            sx={{
              mt:1
            }}
          />
          </Grid>
          {/* <Grid item xs={6}>
          <Typography
          sx={{
            color:'#770043',
            textAlign:'left',
            fontWeight:500,
            fontSize:'17px'
          }}>
            Date of Birth
          </Typography>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DatePicker']}>
        <DatePicker name='dateOfBirth' value={info.dateOfBirth} label="MM/DD/YYYY" 
          onChange={(date) => handleChange(e , date)}
        />
      </DemoContainer>
    </LocalizationProvider>
          </Grid> */}
          <Grid item xs={6}>
        <Typography
          sx={{
            color:'#770043',
            textAlign:'left',
            fontWeight:500,
            fontSize:'17px'
          }}>
            Batch
          </Typography>
          <FormControl fullWidth
          sx={{
            mt:1
          }}>
        <InputLabel id="demo-simple-select-label"
        sx={{
            position:'absolute',
        }}>
        Select Batch
        </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          name='batch'
          value={info.batch}
          label="Select a leave type"
          onChange={(e) => handleChange(e)}
          sx={{
            textAlign:'left'
          }}
        >
        {batches.map((batch)=>
            <MenuItem value={batch._id}>{batch.batch}</MenuItem>
        )}
        
        </Select>
      </FormControl>
          </Grid>
          <Grid item xs={6}>
          <Typography
          sx={{
            color:'#770043',
            textAlign:'left',
            fontWeight:500,
            fontSize:'17px'
          }}>
            Department
          </Typography>
          <FormControl fullWidth
          sx={{
            mt:1
          }}>
        <InputLabel id="demo-simple-select-label"
        sx={{
            position:'absolute',
        }}>
        Select Department
        </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          name='discipline'
          value={info.discipline}
          label="Select a leave type"
          onChange={(e) => handleChange(e)}
          sx={{
            textAlign:'left'
          }}
        >
        {disciplines.map((discipline)=>
            <MenuItem value={discipline._id}>{discipline.discipline}</MenuItem>
        )}
        
        </Select>
      </FormControl>
          </Grid>
          <Grid item xs={6}>
        <Typography
          sx={{
            color:'#770043',
            textAlign:'left',
            fontWeight:500,
            fontSize:'17px'
          }}>
            Category
          </Typography>
          <FormControl fullWidth
          sx={{
            mt:1
          }}>
        <InputLabel id="demo-simple-select-label"
        sx={{
            position:'absolute',
        }}>
        Select Catory
        </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          name='categoryId'
          value={info.categoryId}
          label="Select a leave type"
          onChange={(e) => handleChange(e)}
          sx={{
            textAlign:'left'
          }}
        >
        {categories.map((category)=>
            <MenuItem value={category._id}>{category.categoryDescription}</MenuItem>
        )}
        
        </Select>
      </FormControl>
          </Grid>
          <Grid item xs={6}>
          <Typography
          sx={{
            color:'#770043',
            textAlign:'left',
            fontWeight:500,
            fontSize:'17px'
          }}>
            Gender
          </Typography>
          <FormControl fullWidth
          sx={{
            mt:1
          }}>
        <InputLabel id="demo-simple-select-label"
        sx={{
            position:'absolute',
        }}>
        Select Gender
        </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          name='gender'
          value={info.gender}
          label="Select a leave type"
          onChange={(e) => handleChange(e)}
          sx={{
            textAlign:'left'
          }}
        >
          <MenuItem value='Male'>Male</MenuItem>
          <MenuItem value='Female'>Female</MenuItem>
        
        </Select>
      </FormControl>
          </Grid>
          <Grid item xs={6}>
        <Typography
          sx={{
            color:'#770043',
            textAlign:'left',
            fontWeight:500,
            fontSize:'17px'
          }}>
            Student ID
          </Typography>
          <TextField id="outlined-basic" 
           variant="outlined" 
           name='studentId'
           value={info.studentId}
           onChange={(e) => handleChange(e)}
            sx={{
              mt:1
            }}
          />
          </Grid>
          <Grid item xs={6}>
          <Typography
          sx={{
            color:'#770043',
            textAlign:'left',
            fontWeight:500,
            fontSize:'17px'
          }}>
            Roll Number
          </Typography>
          <TextField id="outlined-basic" 
           variant="outlined"
           name='rollNo' 
           value={info.rollNo}
           onChange={(e) => handleChange(e)}
            sx={{
              mt:1,
              width:'100%'

            }}
          />
          </Grid>
          <Grid item xs={6}>
          <Typography
          sx={{
            color:'#770043',
            textAlign:'left',
            fontWeight:500,
            fontSize:'17px'
          }}>
            Profile Photo
          </Typography>
          <TextField id="outlined-basic" 
           variant="outlined" 
           name='profilePhoto'
           value={info.profilePhoto}
           onChange={(e) => handleChange(e)}
            sx={{
              mt:1,
              width:'100%'

            }}
          />
          </Grid>
          <Grid item xs={6}>
          <Typography
          sx={{
            color:'#770043',
            textAlign:'left',
            fontWeight:500,
            fontSize:'17px'
          }}>
            Level
          </Typography>
          <FormControl fullWidth
          sx={{
            mt:1
          }}>
        <InputLabel id="demo-simple-select-label"
        sx={{
            position:'absolute',
        }}>
        Select Level
        </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          name='level'
          value={info.level}
          label="Select a leave type"
          onChange={(e) => handleChange(e)}
          sx={{
            textAlign:'left'
          }}
        >
          <MenuItem value='Undergraduate'>Undergraduate</MenuItem>
          <MenuItem value='Postgraduate'>Postgraduate</MenuItem>
        
        </Select>
      </FormControl>
          </Grid>
          <Grid item xs={6} sx={{display:'flex'}}>
          <Checkbox
          name='pointUser'
          checked={info.pointUser}
          onChange={(e) => handleChange(e)}
       
          />
          <Typography
          sx={{
            color:'#770043',
            textAlign:'left',
            fontWeight:500,
            fontSize:'17px',
            
          }}>
            Point User
          </Typography>
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
                onClick={()=>CreateStudent()}
            >Submit</Button> 
        </Box>
      </Modal>
    </>
  );
};

export default AddStudent;