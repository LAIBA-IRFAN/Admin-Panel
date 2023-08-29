import React from "react";
import { useLocation } from 'react-router-dom';
import Navbar from "../Navbar";
import CssBaseline from '@mui/material/CssBaseline';
import SideBar from "../Sidebar";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ClearIcon from '@mui/icons-material/Clear';
import { format } from 'date-fns';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Divider, IconButton, Typography } from "@mui/material";
import dayjs from "dayjs";
import TuneIcon from '@mui/icons-material/Tune';
import Box from '@mui/material/Box';
import { useDispatch, useSelector } from "react-redux";
import { fetchAllConductorsAttendance , fetchAttendanceBelowAvgCount } from "../../stateManagement/conductorSlice";
import ConductorStatsTable from "./ConductorStatsTable";

export default function ViewAttendanceStatsConductor(){

    const dispatch = useDispatch()
    const [filter , setFilter] = React.useState(false)
    const [menuClose, setMenuClose] = React.useState(false)
    const [date,setDate] = React.useState('')
    const [selectedDate, setSelectedDate] = React.useState(null);
    const [selectedMonth, setSelectedMonth] = React.useState(null);
    const currentDate = new Date();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const day = currentDate.getDate().toString().padStart(2, '0');
    const year = currentDate.getFullYear().toString().slice(-2);

    const formattedDate = `${month}-${day}-${year}`;
    // const [startDate , setStartDate] = React.useState(dayjs('01-01-23'))
    const [endDate , setEndDate] = React.useState(dayjs(formattedDate))

    const dateChange=async(date)=>{
        setSelectedDate(date)
        setSelectedMonth(date.$M+1)
        await dispatch(fetchAllConductorsAttendance())
        }
    const ClearFilter=async()=>{
        await dispatch(fetchAllConductorsAttendance())
        setFilter(false)
        setMenuClose(false)
        popupState.close
    }
    const Below20Attendance=async()=>{
        await dispatch(fetchAttendanceBelowAvgCount())
        setFilter(true)
        setMenuClose(true)
        popupState.close
    }

    return (
        <>
            <Box sx={{}}>
                <CssBaseline />
                {/* {console.log(selectedDate.$M+1)} */}

                <Stack
                direction="row"
                spacing={2}
                sx={{
                    position:'relative',
                    // marginTop:10
                }}
                >
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DatePicker']}>
                <DatePicker
                value={selectedDate} 
                maxDate={endDate}
                onChange={dateChange}
                views={['month', 'year']}

                    sx={{
                        // marginLeft:'250px',
                        color:'#770043',
                        border: '1px solid #770043',
                        boxShadow: '0px 0px 20px rgba(28, 18, 23, 0.1)',
                        borderRadius: '10px'

                    }}
                />
                </DemoContainer>
                </LocalizationProvider>
                
                <PopupState variant="popover" popupId="demo-popup-menu">
                {(popupState) => (
                <React.Fragment>
                <Button variant="outlined" {...bindTrigger(popupState)}
                sx={{
                width:200,
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
                    filter ?
                    <>
                    Below 20%
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
            <Menu {...bindMenu(popupState)}
          sx={{
                    // border: '1px solid #770043'
          }}>
            
            <MenuItem onClick={Below20Attendance}>Below 20%</MenuItem>
            
          </Menu> 
          : null}
        </React.Fragment>
      )}
    </PopupState>
                </Stack>
                </Box>
                <br></br>
                <ConductorStatsTable selectedMonth={selectedMonth} filter={filter}/>
                </>
                )
                }