import React from 'react';
import { Box, Grid, Paper, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import ComplainRatioChart from './charts/ComplainRatioChart';
import PaymentRatioChart from "./charts/PaymentRatioChart"
import RoutesChart from "./charts/RoutesChart"
import NoOfUsersChart from './charts/NoOfUsersChart';
import FirstSection from './Sections/FirstSection';
import NotificationSection from './Sections/NotificationSection';
import ComplainSection from './Sections/ComplainSection';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  color: theme.palette.text.secondary,
}));

const Analytics = () => {
  return (
    <Box sx={{ margin: "30px" }}>
      <Grid container spacing={2}>
        {/* first row */}
        <FirstSection />

        {/* second row */}
        <Grid item sm={12} md={4}>
          <StyledPaper sx={{ padding: "10px  0", borderRadius: "15px" }}>
            <Box sx={{ borderBottom: "2px solid #770043" }}>
              <Typography sx={{ fontFamily: "Outfit", color: "black", padding: "5px 20px", fontWeight: "400" }}>Fees paid in this month</Typography>
            </Box>
            <PaymentRatioChart />
          </StyledPaper>
        </Grid>
        <Grid item sm={12} md={4}>
          <StyledPaper sx={{ padding: "10px  0", borderRadius: "15px" }}>
            <Box sx={{ borderBottom: "2px solid #770043" }}>
              <Typography sx={{ fontFamily: "Outfit", color: "black", padding: "5px 20px", fontWeight: "400" }}>Complaints in this month</Typography>
            </Box>
            <ComplainRatioChart />
          </StyledPaper>
        </Grid>

        <Grid item sm={12} md={4}>
          <StyledPaper sx={{ padding: "10px  0", borderRadius: "15px" }}>
            <Box sx={{ borderBottom: "2px solid #770043" }}>
              <Typography sx={{ fontFamily: "Outfit", color: "black", padding: "5px 20px", fontWeight: "400" }}>Routes</Typography>
            </Box>
            <RoutesChart />
          </StyledPaper>
        </Grid>

        {/* Third Row */}
        <Grid item sm={12}>
          <StyledPaper sx={{borderRadius: "15px" , padding: " 15px 0px"}}>
            <NotificationSection />
          </StyledPaper>
        </Grid>
        {/* <Grid item sm={12} md={6}>
          <StyledPaper>
            <ComplainSection />
          </StyledPaper>
        </Grid> */}
      </Grid>
    </Box>
  );
};

export default Analytics;