import React from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { IconButton } from "@mui/material";
import Box from '@mui/material/Box';
import { useDispatch } from "react-redux";
import { fetchTodaysAttendance } from "../../stateManagement/conductorSlice";
import ConductorTable from "./ConductorTable";
import ConductorsonLeave from "./ConductorsonLeave";

const MarkAttendanceConductor = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const value = useLocation().state;
    const date = new Date();
    const currentdate = `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`

    const TodaysAttendance=async()=>{
        await dispatch(fetchTodaysAttendance())
        navigate("/viewtodaysattendanceconductor")

    }


    return (
        <>
            <Box sx={{}}>
                <CssBaseline />

                {console.log(value)}


                <Stack
                direction="row"
                spacing={2}
                sx={{
                    position:'relative',
                    // marginTop:10
                }}
                >
                <Button variant="outlined" 
                sx={{
                // marginLeft:'auto',
                // marginRight:'960px',
                color:'black',
                border: '1px solid #770043',
                boxShadow: '0px 0px 20px rgba(28, 18, 23, 0.1)',
                borderRadius: '10px',
                // fontFamily: 'Outfit',
                fontStyle: 'normal',
                fontWeight: 400,
                fontSize: '18px',
                textAlign:'center',
                textTransform:'capitalize'
                
                }}>
                <CalendarMonthIcon sx={{color:'#770043' , marginRight:1}}/>
                {currentdate}</Button> 
                
                <Button variant="outlined" sx={{
                position:'absolute',
                right:0,
                color:'#770043',
                border: '1px solid #770043',
                boxShadow: '0px 0px 20px rgba(28, 18, 23, 0.1)',
                borderRadius: '10px',
                // fontFamily: 'Outfit',
                fontStyle: 'normal',
                fontWeight: 400,
                fontSize: '18px',
                textAlign:'center',
                textTransform:'capitalize'
                }}
                onClick={()=> navigate("/viewattendancestatsconductor")}>View Attendance Stats</Button>

               <Button variant="outlined" sx={{
                position:'absolute',
                right:'240px',
                color:'#770043',
                border: '1px solid #770043',
                boxShadow: '0px 0px 20px rgba(28, 18, 23, 0.1)',
                borderRadius: '10px',
                // fontFamily: 'Outfit',
                fontStyle: 'normal',
                fontWeight: 400,
                fontSize: '18px',
                textAlign:'center',
                textTransform:'capitalize'
                }}
                onClick={TodaysAttendance}>View Today's Attendance</Button>
                </Stack>
                <br></br>

                <Box
                    component="main"
                >
                   <ConductorTable value={value}/>
                </Box>
                <ConductorsonLeave value={value}/>
                
            </Box>
        </>
    )
}

export default MarkAttendanceConductor

