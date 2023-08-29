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

export default function DeleteBus({deleteModal , setDeleteModal , selectedId , setShift1Table, setShift2Table , shift}) {

    const dispatch = useDispatch()

    const Delete=async()=>{
        console.log(selectedId)
        const response = await dispatch(deleteABus(selectedId))
        if(response && shift===1){
            setDeleteModal(false)
            await dispatch(fetchAllBuses(1))
            setShift1Table(true)
        }
        else if(response && shift===2){
          setDeleteModal(false)
          await dispatch(fetchAllBuses(2))
          setShift2Table(true)
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