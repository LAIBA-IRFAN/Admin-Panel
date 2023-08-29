import React from "react";
import { useLocation } from 'react-router-dom';
import Navbar from "../Navbar";
import CssBaseline from '@mui/material/CssBaseline';
import SideBar from "../Sidebar";
import Stack from '@mui/material/Stack';
import DriverStatsTable from './DriverStatsTable'
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { format } from 'date-fns';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Divider, Typography } from "@mui/material";
import dayjs from "dayjs";
import TuneIcon from '@mui/icons-material/Tune';
import IconButton from '@mui/material/IconButton';
import ClearIcon from '@mui/icons-material/Clear';
import Box from '@mui/material/Box';
import { useDispatch, useSelector } from "react-redux";
import { fetchTodaysAttendance , fetchAllDriversAbsentToday , fetchAllDriversLateToday } from "../../stateManagement/driverSlice";
import TodaysAttendanceTable from "./TodaysAttendanceTable";

export default function ViewTodaysAttendance(){

    const dispatch = useDispatch()
    const [filter1 , setFilter1] = React.useState(false)
    const [filter2 , setFilter2] = React.useState(false)
    const [menuClose, setMenuClose] = React.useState(false)

    const ClearFilter=async()=>{
        await dispatch(fetchTodaysAttendance())
        setFilter1(false)
        setFilter2(false)
        setMenuClose(false)
        popupState.close
    }
    const ShowAbsent=async()=>{
        await dispatch(fetchAllDriversAbsentToday())
        setFilter1(true)
        setMenuClose(true)
        popupState.close
    }
    const ShowLate=async()=>{
        await dispatch(fetchAllDriversLateToday())
        setFilter2(true)
        setMenuClose(true)
        popupState.close
        }

    return (
        <>
            <Box sx={{}}>
                <CssBaseline />
                
                <Stack
                direction="row"
                spacing={2}
                sx={{
                    position:'relative',
                    // marginTop:10
                }}
                >
                
                <PopupState variant="popover" popupId="demo-popup-menu">
                {(popupState) => (
                <React.Fragment>
                <Button variant="outlined" {...bindTrigger(popupState)}
                sx={{
                width:180,
                height:45,
                position:'absolute',
                right:0,
                color:'#770043',
                border: '1px solid #770043',
                boxShadow: '0px 0px 20px rgba(28, 18, 23, 0.1)',
                borderRadius: '10px',
                }}>
                <TuneIcon
                    sx={{
                        marginRight:'auto',
                        marginLeft:0
                    }}
                />
                {
                    filter1 ?
                    <>
                    Absent
                    <IconButton onClick={ClearFilter}>
                    <ClearIcon/>
                    </IconButton>
                    </> :
                    filter2 ?
                    <>
                    Late
                    <IconButton onClick={ClearFilter}>
                    <ClearIcon/>
                    </IconButton>
                    </> :
                <Typography
                    sx={{
                        marginRight:'auto',
                        marginLeft:0,
                        // fontFamily: 'Outfit',
                        fontStyle: 'normal',
                        fontWeight: 400,
                        fontSize: '18px',
                        textTransform:'capitalize',
                    }}>
                    Filter

                </Typography>
        }

          </Button>
          {menuClose === false ? 
          <Menu {...bindMenu(popupState)}>
            <MenuItem onClick={ShowLate}>Late</MenuItem>
            <Divider/>
            <MenuItem onClick={ShowAbsent}>Absent</MenuItem>
            
          </Menu>
          : null}
        </React.Fragment>
      )}
    </PopupState>
                </Stack>
                </Box>
                <br></br><br></br>
                <Typography
                variant="h1"
                sx={{
                // fontFamily: 'Outfit',
                fontStyle: 'normal',
                fontWeight: 500,
                fontSize: '27px',
                lineHeight: '30px',
                // marginLeft:'auto',
                // marginRight:2,
                // width: '80%',
                marginTop:'20px',
                marginBottom:'20px',
                }}>Today's Attendance</Typography>
                <TodaysAttendanceTable filter1={filter1} filter2={filter2}/>
                </>
                )
                }