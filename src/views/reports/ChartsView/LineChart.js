import React from 'react';
import { useSelector } from 'react-redux';
import Chart from 'react-apexcharts';
import {
  Card,
  CardContent,
  Typography,
  useTheme,
  // CircularProgress
} from '@material-ui/core';

function LineChart() {
  const theme = useTheme();
  // const chartloading = useSelector((state) => state.energy.chartloading);
  const chartDataIc = useSelector((state) => state.energy.chartData_Ic);
  const chartDataIa = useSelector((state) => state.energy.chartData_Ia);
  const chartDataIb = useSelector((state) => state.energy.chartData_Ib);
  const chartLabels = useSelector((state) => state.energy.chartLabels);
  const d = chartDataIc.map((F) => F);
  console.log('type', d);

  const chart = {
    options: {
      chart: {

        background: theme.palette.background.paper,
        stacked: false,
        toolbar: {
          show: false
        },

        zoom: false
      },
      plotOptions: {
        bar: {
          columnWidth: '25%'
        }
      },
      colors: ['#1f87e6', '#E14827', '#1fe647'],
      dataLabels: {
        enabled: false
      },
      grid: {
        borderColor: theme.palette.divider,
        yaxis: {
          lines: {
            show: false
          }
        }
      },
      legend: {
        show: true,
        position: 'top',
        horizontalAlign: 'center',
        labels: {
          colors: theme.palette.text.secondary
        }
      },
      markers: {
        size: 4,
        strokeColors: ['#1f87e6', '#27c6db', '#112F4D'],
        strokeWidth: 0,
        shape: 'circle',
        radius: 3,
        hover: {
          size: undefined,
          sizeOffset: 3
        }
      },
      stroke: {
        width: [4, 4, 4],
        curve: 'smooth',

      },
      theme: {
        mode: theme.palette.type
      },
      tooltip: {
        theme: theme.palette.type
      },
      xaxis: {
        axisBorder: {
          color: theme.palette.divider
        },
        axisTicks: {
          show: true,
          color: theme.palette.divider
        },
        categories: chartLabels,
        labels: {
          style: {
            colors: theme.palette.text.secondary
          }
        }
      },
      yaxis: [
        {
          axisBorder: {
            show: true,
            color: theme.palette.divider
          },
          axisTicks: {
            show: true,
            color: theme.palette.divider
          },
          labels: {
            style: {
              colors: theme.palette.text.secondary
            }
          }
        },
        {
          axisTicks: {
            show: true,
            color: theme.palette.divider
          },
          axisBorder: {
            show: true,
            color: theme.palette.divider
          },
          labels: {
            style: {
              colors: theme.palette.text.secondary
            }
          },
          opposite: true
        }
      ]
    },
    series:
      [
        {
          type: 'line',
          name: 'Phase-A',
          data: chartDataIa
        },
        {
          type: 'line',
          name: 'Phase-B',
          data: chartDataIb
        },
        {

          name: 'Phase-C',
          data: chartDataIc
        },

      ],


  };

  return (
    <Card>
      <CardContent>
        <Typography
          variant="h4"
          color="textPrimary"
        >
          Current
        </Typography>


        <Chart
          type="line"
          height="300"
          {...chart}
        />

      </CardContent>
    </Card>
  );
}

export default LineChart;
