
import CssBaseline from '@mui/material/CssBaseline';
import ConductorTable from './ConductorTable';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import ConductorsonLeave from './ConductorsonLeave';
import AddNewConductor from "./AddNewConductor"
import FormModal from '../../Modals/FormModal';
import { useState } from 'react';

const ConductorList = () => {
  // const navigate = useNavigate();
  const value = true
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const openModal = () => {
      setIsAddModalOpen(true);
  };

  const closeModal = () => {
      setIsAddModalOpen(false);
  };


  const navigate = useNavigate();
  const Click = () => {
      navigate('/markattendanceconductor',
          { state: value }
      )
  }
  return (
    <>
                <Box>
                <CssBaseline />
                <Stack
                    direction="row"
                    spacing={2}
                >
                    <Button variant="outlined" sx={{
                        marginLeft: 'auto',
                        // marginRight:2,
                        color: '#770043',
                        border: '1px solid #770043',
                        boxShadow: '0px 0px 20px rgba(28, 18, 23, 0.1)',
                        borderRadius: '10px',
                        // fontFamily: 'Outfit',
                        fontStyle: 'normal',
                        fontWeight: 400,
                        fontSize: '18px',
                        textAlign: 'center',
                        textTransform: 'capitalize'
                    }}
                        onClick={Click}>Mark Attendance</Button>
                    <Button variant="contained" sx={{
                        color: 'white',
                        backgroundColor: '#770043',
                        marginLeft: 'auto',
                        marginRight: 3,
                        border: '1px solid #770043',
                        boxShadow: '0px 0px 20px rgba(28, 18, 23, 0.1)',
                        borderRadius: '10px',
                        // fontFamily: 'Outfit',
                        fontStyle: 'normal',
                        fontWeight: 400,
                        fontSize: '18px',
                        textAlign: 'center',
                        textTransform: 'inherit',
                        '&:hover': {
                            backgroundColor: '#ffffff',
                            color: "#770043",
                            border: "1px solid #770043"
                          },
                    }}
                    onClick={openModal}
                    >+Add a Conductor</Button>
                </Stack>
                <br></br>


                <ConductorTable />
                <ConductorsonLeave />

            </Box>
            {/* <Box sx={{}}>
                <CssBaseline />
                <Box
                    component="main"
                    sx={{}}
                >
                  <Button variant="contained" sx={{
                color:'white' ,
                backgroundColor:'#770043',
                marginLeft:'auto',
                marginRight:3,
                border: '1px solid #770043',
                boxShadow: '0px 0px 20px rgba(28, 18, 23, 0.1)',
                borderRadius: '10px',
                // fontFamily: 'Outfit',
                fontStyle: 'normal',
                fontWeight: 400,
                fontSize: '18px',
                textAlign:'center',
                float: "right",
                textTransform:'inherit',
                marginBottom : "20px"
                }}
                onClick={() => navigate("/add-conductor")}>+Add a Conductor</Button>
                   <ConductorTable />
                </Box>
            </Box> */}

<FormModal isOpen={isAddModalOpen} onClose={closeModal}>
                    <AddNewConductor closeModal={closeModal} />
                </FormModal>
        </>
  )
}

export default ConductorList
