import { Box } from '@mui/material';
import React from 'react';
import ReactApexChart from 'react-apexcharts';

const RoutesChart = () => {
  const series = [17];

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
              formatter: () => 'Operational'  // Explicitly set label text
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
                const totalPercentage = series.reduce((total) => total);
                return totalPercentage;
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
          return 'Routes: ' + series[seriesIndex];
        } else if (seriesIndex === 1) {
          return 'Operational Routes: ' + series[seriesIndex];
        }
      },
    },
    tooltip: {
      enabled: false,
      y: {
        formatter: function (val, opts) {
          const seriesIndex = opts.seriesIndex;
          if (seriesIndex === 0) {
            return 'Routes: ' + val;
          } else if (seriesIndex === 1) {
            return 'Operational Routes: ' + val;
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

export default RoutesChart;
