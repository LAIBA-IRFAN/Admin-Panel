import { Box } from '@mui/material';
import React, { useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import { useDispatch, useSelector } from 'react-redux';
import { getFeesStatus, getAllUsers } from '../../../stateManagement/analyticsSlice';

const PaymentRatioChart = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.analytics.users);
  const StudentfeeStatus = useSelector((state) => state.analytics.feesStatus.studentFees);
  const EmployeefeeStatus = useSelector((state) => state.analytics.feesStatus.employeeFees);

  useEffect(() => {
    dispatch(getFeesStatus());
    dispatch(getAllUsers());
  }, [dispatch]);

  const totalUsers = Number(users.noOfStudents) + Number(users.noOfEmployees);

  const paidData = (StudentfeeStatus?.paid || 0) + (EmployeefeeStatus?.paid || 0);
  const unpaidData = (StudentfeeStatus?.unpaid || 0) + (EmployeefeeStatus?.unpaid || 0);

  const series = [paidData, unpaidData];

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
              position: 'bottom',
              align: 'left',
              formatter: (value, opts) => {
                const seriesIndex = opts.seriesIndex;
                if (seriesIndex === 0) {
                  return 'Paid';a
                } else if (seriesIndex === 1) {
                  return 'Unpaid';
                }
                return "Paid"
              },
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
              formatter: () => {
                const paidPercentage = (paidData / totalUsers) * 100;
                return `${paidPercentage.toFixed(1)}%`; 
              },
            },
            offsetX: 0,
            offsetY: 0,
            position: 'outside',
          },
        },
      },
    },

    dataLabels: {
      enabled: false,
      
    },
    colors: ['#47DF12', '#E40000'],
    legend: {
      position: 'bottom',
      formatter: (val, opts) => {
        const seriesIndex = opts.seriesIndex;
        if (seriesIndex === 0) {
          return `Paid: ${paidData}`;
        } else if (seriesIndex === 1) {
          return `Unpaid: ${unpaidData}`;
        }
      },
    },
    tooltip: {
      enabled: false,
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
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <ReactApexChart options={options} series={series} type="donut" width={250} />
    </Box>
  );
};

export default PaymentRatioChart;
