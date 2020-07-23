/* eslint-disable camelcase */
import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Box,
  Card,
  CardHeader,
  Divider,
  // Typography,
  makeStyles
} from '@material-ui/core';
// import GenericMoreButton from 'src/components/GenericMoreButton';
import ReactFC from 'react-fusioncharts';
import FusionCharts from 'fusioncharts';
import charts from 'fusioncharts/fusioncharts.widgets';
import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.candy';


ReactFC.fcRoot(FusionCharts, charts, FusionTheme);


const useStyles = makeStyles((theme) => ({
  root: {},
  item: {
    textAlign: 'center',
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: theme.spacing(3, 2),
    '&:not(:last-of-type)': {
      borderRight: `1px solid ${theme.palette.divider}`
    }
  }
}));

function VoltageMeterB({ className, ...rest }) {
  const classes = useStyles();
  const energy = useSelector((state) => state.energy.energy);
  const { Vb } = energy;
  const { V_lowerLmt } = energy;
  const { V_upperLmt } = energy;


  let minvalue;
  let maxvalue;
  let code;
  let Status;

  if (Vb < V_lowerLmt) {
    minvalue = V_lowerLmt;
    maxvalue = V_upperLmt;
    code = '#B22222';
    Status = 'Below from his lowerlimit';
  } else if (Vb > V_upperLmt) {
    minvalue = V_lowerLmt;
    maxvalue = V_upperLmt;
    code = '#FF8C00';
    Status = 'Exceeding above from his upperlimit';
  } else if (Vb <= V_upperLmt && Vb >= V_lowerLmt) {
    minvalue = V_lowerLmt;
    maxvalue = V_upperLmt;
    code = '#FFC533';
    Status = 'Status : OK';
  }

  const dataSource = {
    chart: {
      caption: ` ${Status} `,
      captionfontsize: 12,
      captionontop: '0',
      origw: '400',
      origh: '200',
      gaugestartangle: '135',
      gaugeendangle: '45',
      gaugeoriginx: '200',
      gaugeoriginy: '240',
      gaugeouterradius: '190',
      theme: 'candy',
      showvalue: '1',
      numbersuffix: 'V',
      valuefontsize: '15'
    },
    colorrange: {
      color: [


        {

          minvalue,
          maxvalue,
          code
        }
        // {
        //   minvalue: V_lowerLmt[0],
        //   maxvalue: V_upperLmt[0],
        //   code: '#62B58F'
        // },
        // {
        //   minvalue: V_upperLmt[0],
        //   maxvalue: V_upperLmt[0] + 10,
        //   code: '#F2726F'
        // }
      ]
    },
    dials: {
      dial: [
        {
          value: Vb,
          tooltext: 'Voltages phase-B'
        }
      ]
    }
  };


  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardHeader
        // action={<GenericMoreButton />}
        title="VOLTAGES  (Phase-B)"
      />
      <Divider />
      <Box
        p={1}
        position="relative"
        minHeight={320}
      >
        <ReactFC
          type="angulargauge"
          width="100%"
          height="100%"
          dataFormat="JSON"
          dataSource={dataSource}

        />
      </Box>
      <Divider />
    </Card>
  );
}

VoltageMeterB.propTypes = {
  className: PropTypes.string
};

export default VoltageMeterB;
