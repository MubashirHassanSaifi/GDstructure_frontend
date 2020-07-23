/* eslint-disable no-underscore-dangle */
import React, {
  useState,
  useEffect,
  useCallback
} from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Box,
  Card,
  CardHeader,
  Divider,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableRow,
  colors,
  makeStyles
} from '@material-ui/core';
import MUIDataTable from 'mui-datatables';
// import axios from 'src/utils/axios';
// import useIsMountedRef from 'src/hooks/useIsMountedRef';
import Label from 'src/components/Label';

const options = {
  filter: true,
  filterType: 'checkbox',
  responsive: 'scrollMaxHeight',
  selectableRows: 'none',
  fixedHeaderOptions: {
    xAxis: false,
    yAxis: true
  }
};

const columns = [{
  name: 'ip',
  label: 'IP Address'
},
{
  name: 'time',
  label: 'Time'
},
{
  name: 'location.region',
  label: 'Region'
},
{
  name: 'location.city',
  label: 'City'
}

];

const useStyles = makeStyles(() => ({
  root: {},
  methodCell: {
    width: 100
  },
  statusCell: {
    width: 64
  }
}));


function Logs({ logs, className, ...rest }) {
  const classes = useStyles();
  const data = logs;
  // const username = logs.map((f) => f.username);


  return (
    <div
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Card>
        <CardHeader title="User login History" />
        <Divider />
        <PerfectScrollbar>
          <MUIDataTable
            columns={columns}
            data={data}
            options={options}
            title="User Logs"
          />
        </PerfectScrollbar>
      </Card>
    </div>
  );
}

Logs.propTypes = {
  className: PropTypes.string,
  logs: PropTypes.object.isRequired

};

export default Logs;
