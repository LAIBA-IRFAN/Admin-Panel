import React, { useEffect , useState } from 'react';
import { Box, Grid, Paper, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import {getDriverOnLeaveToday , getDriverPresentToday , getConductorOnLeaveToday , getConductorPresentToday} from "../../../stateManagement/analyticsSlice"
import { useDispatch, useSelector } from 'react-redux';


const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  color: theme.palette.text.secondary,
}));

const FirstSection = () => {
  const dispatch = useDispatch();
  const analytics = useSelector((state)=> state.analytics)
  const [attendanceData, setAttendanceData] = useState({
    presentConductor: 0,
    presentDriver: 0,
    onLeaveDriver: 0,
    onLeaveConductor: 0,
  });

  useEffect(() => {
    dispatch(getDriverOnLeaveToday());
    dispatch(getDriverPresentToday());
    dispatch(getConductorOnLeaveToday());
    dispatch(getConductorPresentToday());
  }, [dispatch]);

  useEffect(() => {
    // Update the attendance data state whenever analytics state changes
    setAttendanceData({
      presentConductor: analytics?.conductorPresentToday || 0,
      presentDriver: analytics?.driverPresentToday || 0,
      onLeaveDriver: analytics?.driverOnLeaveToday || 0,
      onLeaveConductor: analytics?.conductorOnLeaveToday || 0,
    });
  }, [analytics]);

  return (
    <>
      <Grid item sm={12}>
            <StyledPaper sx={{ padding: "10px 0px",borderRadius: "15px" }}>
             <Box sx={{borderBottom: "2px solid #770043"}}>
             <Typography sx={{padding: "5px 15px" , fontSize: "16px" , fontWeight: "500", fontFamily: "Outfit" , color :"black"}}>
              Today’s Attendance
              </Typography>
             </Box>
          <Box sx={{display: "flex" , padding: "25px"}}>
            
          <Grid item xs={6} sm={3}>
            <StyledPaper sx={{ padding: "10px",backgroundColor: "white" , border:"1px solid #770043" , borderRadius: "10px" , margin:"5px"}}>
            <Box sx={{borderBottom: "1px solid white"}}>
              <Typography variant="p" sx={{ fontFamily: "Outfit", fontSize: "15px" , color: "black" , fontWeight: "500"}}>
                Total no. of Conductor Present Today
              </Typography>
              <Box sx={{ fontSize: "20px" , fontWeight: "600", color: "#770043" }}>
                {attendanceData.presentConductor}
              </Box>
              </Box>
            </StyledPaper>
          </Grid>

          <Grid item xs={6} sm={3}>
            <StyledPaper sx={{ padding: "10px",backgroundColor: "white" , border:"1px solid #770043" , borderRadius: "10px" , margin:"5px"}}>
            <Box sx={{borderBottom: "1px solid white"}}>
              <Typography variant="p" sx={{ fontFamily: "Outfit", fontSize: "15px" , color: "black" , fontWeight: "500"}}>
                Total no. of Driver Present Today
              </Typography>
              <Box sx={{ fontSize: "20px" , fontWeight: "600", color: "#770043" }}>
                {attendanceData.presentDriver}
              </Box>
              </Box>
            </StyledPaper>
          </Grid>

          <Grid item xs={6} sm={3}>
            <StyledPaper sx={{ padding: "10px",backgroundColor: "white" , border:"1px solid #770043" , borderRadius: "10px" , margin:"5px"}}>
            <Box sx={{borderBottom: "1px solid white"}}>
              <Typography variant="p" sx={{ fontFamily: "Outfit", fontSize: "15px" , color: "black" , fontWeight: "500"}}>
                Total no. of Conductor on Leave Today
              </Typography>
              <Box sx={{ fontSize: "20px" , fontWeight: "600", color: "#770043" }}>
                {attendanceData.onLeaveConductor}
              </Box>
              </Box>
            </StyledPaper>
          </Grid>

          <Grid item xs={6} sm={3}>
            <StyledPaper sx={{ padding: "10px",backgroundColor: "white" , border:"1px solid #770043" , borderRadius: "10px" , margin:"5px"}}>
            <Box sx={{borderBottom: "1px solid white"}}>
              <Typography variant="p" sx={{ fontFamily: "Outfit", fontSize: "15px" , color: "black" , fontWeight: "500"}}>
              Total no. of Driver on Leave Today
              </Typography>
              <Box sx={{ fontSize: "20px" , fontWeight: "600", color: "#770043" }}>
                {attendanceData.onLeaveDriver}
              </Box>
              </Box>
            </StyledPaper>
          </Grid>

          
            </Box>
      
            </StyledPaper>
          </Grid>
         
    </>
  )
}

export default FirstSection