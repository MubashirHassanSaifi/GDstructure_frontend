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
// import axios from 'src/utils/axios';
// import useIsMountedRef from 'src/hooks/useIsMountedRef';
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

function CurrentMeter({ className, ...rest }) {
  const classes = useStyles();
  const energy = useSelector((state) => state.energy.energy);
  const I_upperLmt = energy.map((f) => f.I_upperLmt);
  const Ib = energy.map((f) => f.Ib);
  const dataSource = {
    chart: {
      captionpadding: '0',
      origw: '320',
      origh: '300',
      gaugeouterradius: '115',
      gaugestartangle: '270',
      gaugeendangle: '-25',
      showvalue: '1',
      valuefontsize: '30',
      majortmnumber: '13',
      majortmthickness: '2',
      majortmheight: '13',
      minortmheight: '7',
      minortmthickness: '1',
      minortmnumber: '1',
      showgaugeborder: '0',
      theme: 'candy'
    },
    colorrange: {
      color: [
        {
          minvalue: 0,
          maxvalue: Ib[0],
          code: '#999999'
        },
        {
          minvalue: 0,
          maxvalue: I_upperLmt[0],
          code: '#F6F6F6'
        }
      ]
    },
    dials: {
      dial: [
        {
          value: Ib[0],
          bgcolor: '#F20F2F',
          basewidth: '30'
        }
      ]
    },
    annotations: {
      groups: [
        {
          items: [
            {
              type: 'text',
              id: 'text',
              text: 'Ampere',
              x: '$gaugeCenterX',
              y: '$gaugeCenterY + 55',
              fontsize: '15',
              color: '#555555'
            }
          ]
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
        title="Current  Phase-B"
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

CurrentMeter.propTypes = {
  className: PropTypes.string
};

export default CurrentMeter;
