
import CssBaseline from '@mui/material/CssBaseline';
import DriverTable from './DriverTable';
import Stack from '@mui/material/Stack';
import DriversonLeave from "./DriversonLeave";
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import FormModal from '../../Modals/FormModal'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react';
import AddNewDriver from "./AddNewDriver"
import { resetCount , updateCount } from '../../stateManagement/driverSlice';
import { useDispatch } from 'react-redux';

const DriverList = () => {
    const value = true
    const dispatch = useDispatch()
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    const openModal = () => {
        setIsAddModalOpen(true);
    };

    const Reset=async()=>{
        const response = await dispatch(resetCount())
        console.log(response)
        if(response){
            console.log('RESET DONE')
            toast.success("Reset Done")
        }
        else{
            toast.error('Error resetting')
        }


    }

    const updateCountFunction=async()=>{
        const response = await dispatch(updateCount())
        console.log(response)
        if(response){
            console.log('RESET DONE')
            toast.success("Update Done")
        }
        else{
            toast.error('Error Updating')
        }

    }

    const closeModal = () => {
        setIsAddModalOpen(false);
    };

    const navigate = useNavigate();
    const Click = () => {
        navigate('/markattendance',
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
                        onClick={Reset}>Reset</Button>
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
                        onClick={updateCountFunction}>Update Days Count</Button>
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
                        marginRight: 5,
                        marginBottom: 3,
                        border: '1px solid #770043',
                        boxShadow: '0px 0px 20px rgba(28, 18, 23, 0.1)',
                        borderRadius: '10px',
                        fontFamily: 'Outfit',
                        fontStyle: 'normal',
                        fontWeight: 400,
                        fontSize: '18px',
                        textAlign: 'center',
                        textTransform: 'inherit',
                        float: "right",
                        '&:hover': {
                            backgroundColor: '#ffffff',
                            color: "#770043",
                            border: "1px solid #770043"
                        },
                    }}
                        onClick={openModal}
                    >+Add a Driver</Button>
                </Stack>
                <br></br>
                <FormModal isOpen={isAddModalOpen} onClose={closeModal}>
                    <AddNewDriver closeModal={closeModal} />
                </FormModal>
                <DriverTable />
                <DriversonLeave />
                <ToastContainer/>

            </Box>
        </>
    )
}

export default DriverList
