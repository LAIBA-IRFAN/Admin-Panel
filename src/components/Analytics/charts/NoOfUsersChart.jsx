import React from 'react';
import ReactApexChart from 'react-apexcharts';
import { Box, Typography } from '@mui/material';

const NoOfUsersChart = () => {
  const seriesData = [
    {
      data: [1400, 430, 748, 170, 540, 1280, 690, 1100, 200, 1380, 470, 240],
    },
  ];

  const options = {
    chart: {
      type: 'bar',
      height: 300,
      fontFamily: 'Outfit',
    },
    title: {},
    colors: ['#770043'],
    dataLabels: {
      enabled: false,
    },
    plotOptions: {
      bar: {
        borderRadius: 8, 
      },
    },
    xaxis: {
      categories: [
        'JAN ',
        'FEB',
        'MAR',
        'APR',
        'MAY',
        'JUN',
        'JUL',
        'AUG',
        'SEP',
        'OCT',
        'NOV',
        'DEC',
      ],
    },
  };

  return (
    <Box>
        <Typography sx={{ fontFamily: 'Outfit' , fontWeight: "600" , margin:"14px"}}>
            No. Of Users in 2023
        </Typography>
      <ReactApexChart options={options} series={seriesData} type="bar" height={300} />
    </Box>
  );
};

export default NoOfUsersChart;
