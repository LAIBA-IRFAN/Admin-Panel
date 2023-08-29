import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { IconButton } from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 350,
  pt: 4,
  pb:4,
  pl:12,
  pr:12,
  textAlign: 'center',
  background: '#770043',
  boxShadow: '50px 50px 50px 2px rgba(28, 18, 23, 0.1)',
  borderRadius: '30px',
  color: 'white',
  fontWeight: 300
};

export default function Attendance({open , handleOpen , handleClose}) {

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <IconButton>
          <CheckCircleIcon fontSize='large' sx={{color:'white'}}/>
        </IconButton>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Successful
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Attendance has been successfully marked for today.
          </Typography>

          <Button variant="outlined" 
                sx={{
                  mt:4,
                  backgroundColor:'white',
                  color:'#770043',
                  textTransform:'capitalize',
                  width:'180px'
                  
                }} 
                onClick={handleClose}>Done</Button> 
        </Box>
      </Modal>
    </div>
  );
}