import React from 'react';
import { useSelector } from 'react-redux';
// import { getChartData } from 'src/store/actions/energyAction';
import Chart from 'react-apexcharts';
// import moment from 'moment';
import {
  Card,
  CardContent,
  Typography,
  useTheme
} from '@material-ui/core';

function AreaChart() {
  const theme = useTheme();
  const chartDataVa = useSelector((state) => state.energy.chartData_Va);
  const chartDataVb = useSelector((state) => state.energy.chartData_Vb);
  const chartDataVc = useSelector((state) => state.energy.chartData_Vc);
  const chartLabels = useSelector((state) => state.energy.chartLabels);
  const data = {
    options: {
      chart: {
        background: theme.palette.background.paper,
        toolbar: {
          show: false
        }
      },
      colors: ['#13affe', '#fbab49', '#55fb49'],
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
        labels: {
          colors: theme.palette.text.secondary
        }
      },
      plotOptions: {
        bar: {
          columnWidth: '100%'
        }
      },
      stroke: {
        show: true,
        width: 1,
        colors: ['transparent']
      },
      theme: {
        mode: theme.palette.type
      },
      tooltip: {
        theme: theme.palette.type
      },
      xaxis: {
        axisBorder: {
          show: true,
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
      yaxis: {
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
      }
    },
    series: [
      {
        name: 'Phase-A',
        data: chartDataVa
      },
      {
        name: 'Phase-B',
        data: chartDataVb
      },
      {
        name: 'Phase-C',
        data: chartDataVc
      }
    ]
  };

  return (
    <Card>
      <CardContent>
        <Typography
          variant="h4"
          color="textPrimary"
        >
          Voltages
        </Typography>
        <Chart
          options={data.options}
          series={data.series}
          type="bar"
          height="300"
        />
      </CardContent>
    </Card>
  );
}

export default AreaChart;
