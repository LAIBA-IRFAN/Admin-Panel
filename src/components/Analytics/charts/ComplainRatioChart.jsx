import { Box } from '@mui/material';
import React, { useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import { useDispatch, useSelector } from 'react-redux';
import { getComplaintStatus } from '../../../stateManagement/analyticsSlice';

const ComplainRatioChart = () => {

  const dispatch = useDispatch();
  const complains = useSelector((state) => state.analytics.complaintStatus);

  useEffect(() => {
    dispatch(getComplaintStatus());
  }, [dispatch]);

  const unResolvedComplaints = complains.employeeComplaints + complains.studentComplaints + complains.conductorComplaints + complains.driverComplaints
  const resolvedComplaints = complains.employeeResolvedComplaints + complains.studentResolvedComplaints + complains.conductorResolvedComplaints + complains.driverResolvedComplaints
  console.log(unResolvedComplaints , resolvedComplaints)
  const series = [resolvedComplaints, unResolvedComplaints];

  const options = {
    chart: {
      width: 250,
      type: 'donut',
      fontFamily: 'Outfit',
    },
    plotOptions: {
      pie: {
        startAngle: -90,
        endAngle: 270,
        donut: {
          labels: {
            show: true,
            name: {
              fontSize: '18px',
              fontFamily: 'Outfit',
              fontWeight: 600,
              color: undefined,
              offsetY: -10,
              position: 'bottom',  // Position label at the bottom
              align: 'left',       // Align label to the left
              formatter: () => 'Resolved'  // Explicitly set label text
            },
            value: {
              fontSize: '16px',
              padding: '0px',
              fontFamily: 'Outfit',
              fontWeight: 400,
              color: undefined,
              offsetY: 16,
            },
            total: {
              show: true,
              label: 'Total',
              color: '#373d3f',
              formatter: function () {
                const totalPercentage = (resolvedComplaints / (resolvedComplaints + unResolvedComplaints)*100)
                console.log( " total per" , totalPercentage)
                return totalPercentage + '%';
              },
            },
          },
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    colors: ['#47DF12', '#FAB615'],
    legend: {
      position: 'bottom',
      formatter: function (val, opts) {
        const seriesIndex = opts.seriesIndex;
        if (seriesIndex === 0) {
          return 'Resolved: ' + series[seriesIndex];
        } else if (seriesIndex === 1) {
          return 'Unresolved: ' + series[seriesIndex]
        }
      },
    },
    tooltip: {
      enabled: false,
      y: {
        formatter: function (val, opts) {
          const seriesIndex = opts.seriesIndex;
          if (seriesIndex === 0) {
            return 'Resolved: ' + val + '%';
          } else if (seriesIndex === 1) {
            return 'Unresolved: ' + val + '%';
          }
        },
      },
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: 'bottom',
          },
        },
      },
    ],
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
      <ReactApexChart options={options} series={series} type="donut" width={250} />
    </Box>
  );
};

export default ComplainRatioChart;
