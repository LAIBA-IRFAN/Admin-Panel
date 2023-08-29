import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { IconButton } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';

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

export default function View({viewModal , setViewModal , driverinfo , singleDriver , conductorinfo , singleConductor}) {

  return (
    <div>
    {console.log(singleConductor)}
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
            color:'white'
            }}/>
        </IconButton>
          <Typography id="modal-modal-title" variant="h6" component="h2">
          {driverinfo ?
          driverinfo.name : 
          conductorinfo.name
          }
          </Typography>
          <Typography id="modal-modal-title" variant="h6" component="h2">
          {driverinfo ?
            driverinfo.driver_id : 
            conductorinfo.conductor_id}
          </Typography>
          <Box
          sx={{
            backgroundColor: '#770043',
            border: '1px solid #FFFFFF',
            boxShadow: '0px 0px 20px rgba(28, 18, 23, 0.1)',
            borderRadius: '10px',
            mt:4
          }}>
                    
          <Typography 
          sx={{
            fontFamily: 'Outfit',
            fontStyle: 'normal',
            fontWeight: 400,
            fontSize: '18px',
            color:'white',
            height:40,
            textAlign:'left',
            pt:1,
            pl:2
            }}>
            No of days present: 
            {singleDriver ? 
              singleDriver.totalCount : 
              singleConductor.totalCount}
          </Typography>

          </Box>

          <Box
          sx={{
            backgroundColor: '#770043',
            border: '1px solid #FFFFFF',
            boxShadow: '0px 0px 20px rgba(28, 18, 23, 0.1)',
            borderRadius: '10px',
            mt:2
          }}>
                    
          <Typography 
          sx={{
            fontFamily: 'Outfit',
            fontStyle: 'normal',
            fontWeight: 400,
            fontSize: '18px',
            color:'white',
            height:40,
            textAlign:'left',
            pt:1,
            pl:2
            // position:'absolute',
            // alignItems:'center'
            }}>
            No of days absent: 
            {singleDriver ? 
              singleDriver.absent : 
              singleConductor.absent}
          </Typography>

          </Box>

          <Box
          sx={{
            backgroundColor: '#770043',
            border: '1px solid #FFFFFF',
            boxShadow: '0px 0px 20px rgba(28, 18, 23, 0.1)',
            borderRadius: '10px',
            mt:2
          }}>
                    
          <Typography 
          sx={{
            fontFamily: 'Outfit',
            fontStyle: 'normal',
            fontWeight: 400,
            fontSize: '18px',
            color:'white',
            height:40,
            textAlign:'left',
            pt:1,
            pl:2
            // position:'absolute',
            // alignItems:'center'
            }}>
            Attendance Percentage: 
            {singleDriver ? 
              singleDriver.percentage : 
              singleConductor.percentage}
          </Typography>

          </Box>

          <Button variant="outlined" 
                sx={{
                  mt:4,
                  backgroundColor:'white',
                  color:'#770043',
                  textTransform:'capitalize',
                  
                }} 
                onClick={()=> setViewModal("next")}
            >Create Leave Application</Button> 
        </Box>
      </Modal>
    </div>
  );
}