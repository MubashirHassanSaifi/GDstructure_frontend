/* eslint-disable no-nested-ternary */
/* eslint-disable max-len */
import React, {
  useState,
  useEffect,
  useCallback
} from 'react';
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import MUIDataTable from 'mui-datatables';
import axios from 'axios';
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import {
  Box,
  Grid,
  LinearProgress,
  Typography,
  makeStyles
} from '@material-ui/core';
// import {
//   Image as ImageIcon,
//   Edit as EditIcon,
//   ArrowRight as ArrowRightIcon,
//   Search as SearchIcon
// } from 'react-feather';
import Label from 'src/components/Label';
import Delete from './DeleteSensor';


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
  name: '_id',
  label: 'Sensor_ID'
},
{
  name: 'userid',
  label: 'Sensor Name',
},
{
  name: 'username',
  label: 'Assigned To'
},
{
  name: 'createdAt',
  label: 'Created_At'
},
{
  name: 'userid',
  label: 'Delete',
  options: {
    filter: false,
    customBodyRender: (val, tableMeta, updataValue) => (
      <Delete value={val} />
    )


  }
}

];

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: theme.spacing(3)
  }
}));


function Results({
  className, ...rest
}) {
  const classes = useStyles();
  const isMountedRef = useIsMountedRef();
  const [data, setData] = useState(null);
  // const [columns, setColumns] = useState(null);
  const [loading, setLoading] = useState(true);

  const getSensors = useCallback(() => {
    axios
      .get('http://localhost:5000/energysensor/getAllSensors')
      .then((response) => {
        if (isMountedRef.current) {
          setData(response.data.data);
          // setColumns(response.data.columns);
          setLoading(false);
          console.log(response);
        }
      });
  }, [isMountedRef]);

  useEffect(() => {
    getSensors();
  }, []);

  if (!data) {
    return null;
  }
  return (
    <>
      {
      loading ? (
        <Grid
          container
          justify="center"
          alignItems="center"
        >
          <Grid
            item
            xs={12}
            md={12}
            xl={12}
            lg={12}
          >
            <LinearProgress
              color="secondary"
            />
          </Grid>
        </Grid>
      ) : !loading && data.length === 0 ? (
        <Typography variant="h5">
          {' '}
          No Sensors Found
          {' '}
        </Typography>
      ) : (
        <Grid
          item
          xs={12}
          md={12}
          xl={12}
          lg={12}
          alignItems="center"
        >
          <MUIDataTable
            columns={columns}
            data={data}
            options={options}
            title="Assigned Sensor Users"
          />
        </Grid>
      )
    }
    </>
  );
}

Results.propTypes = {
  className: PropTypes.string,
};


export default Results;
