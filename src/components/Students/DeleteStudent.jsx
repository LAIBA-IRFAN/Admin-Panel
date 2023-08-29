import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { IconButton } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import { useDispatch } from 'react-redux';
import { deleteABus, fetchAllBuses } from '../../stateManagement/timetableSlice';
import { getPaidFeesStudents, getPendingFeesStudents, getUnpaidFeesStudents } from '../../stateManagement/studentSlices';

const style = {
  position: 'relative',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 350,
  pt: 4,
  pb:4,
  pl:3,
  pr:3,
  textAlign: 'center',
  background: '#770043',
  boxShadow: '50px 50px 50px 2px rgba(28, 18, 23, 0.1)',
  borderRadius: '30px',
  color: 'white',
  fontWeight: 300
};

export default function DeleteStudent({deleteModal , setDeleteModal , selectedId}) {

    const dispatch = useDispatch()

    const Delete=async()=>{
        const response = await dispatch(deleteABus(selectedId))
        if(response && response.payload){
            setDeleteModal(false)
            await dispatch(getPendingFeesStudents())
            await dispatch(getPaidFeesStudents())
            await dispatch(getUnpaidFeesStudents())
        }
        else{
          console.log('TEST')
      }
    }

  return (
    <div>
      <Modal
      open={deleteModal}
        onClose={()=> setDeleteModal(false)}
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
        onClick={()=> setDeleteModal(false)}>
          <CancelIcon fontSize='large' 
          sx={{
            color:'white'
            }}/>
        </IconButton>
          <Typography id="modal-modal-title" variant="h6" component="h2">
          Are you sure you want to delete this ?
          </Typography>
          

          <Button variant="outlined" 
                sx={{
                  mt:4,
                  backgroundColor:'white',
                  color:'#770043',
                  textTransform:'capitalize',
                  
                }} 
                onClick={()=> Delete()}
            >Delete</Button> 
        </Box>
      </Modal>
    </div>
  );
}