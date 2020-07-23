/* eslint-disable no-nested-ternary */
/* eslint-disable max-len */
import React, {
  useState,
  useEffect,
  useCallback
} from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import MUIDataTable from 'mui-datatables';
import axios from 'axios';
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import {
  Grid,
  LinearProgress,
  Typography,
  makeStyles
} from '@material-ui/core';

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
  label: 'Complaint_ID'
},
{
  name: 'subject',
  label: 'Complaint Subject',
},
{
  name: 'status',
  label: 'Status'
},
{
  name: 'registered_At',
  label: 'Registered'
},
  // {
  //   name: 'userid',
  //   label: 'Delete',
  //   options: {
  //     filter: false,
  //     customBodyRender: (val, tableMeta, updataValue) => (
  //       <Delete value={
  //           val
  //         }
  //       />
  //     )


  //   }
  // }

];

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: theme.spacing(3)
  }
}));


function Results() {
  const { userId } = useParams();
  const isMountedRef = useIsMountedRef();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const getComplaints = useCallback(() => {
    const body = {
      userid: userId
    };
    axios
      .post('http://localhost:5000/admin/userComplaint', body)
      .then((response) => {
        console.log(response);
        if (isMountedRef.current) {
          setData(response.data);
          // setColumns(response.data.columns);
          setLoading(false);
        }
      });
  }, [isMountedRef]);

  useEffect(() => {
    getComplaints();
  }, []);

  if (!data) {
    return null;
  }

  return (
    <>
      {' '}
      {
      loading ? (
        <Grid
          container
          justify="center"
          alignItems="center"
        >
          <Grid
            item
            xs={
          12
        }
            md={
          12
        }
            xl={
          12
        }
            lg={
          12
        }
          >
            <LinearProgress color="secondary" />
          </Grid>
          {' '}

        </Grid>
      ) : !loading && data.length === 0 ? (
        <Typography variant="h5">
          {' '}
          {
          ' '
        }
          No Complaint Found
          {' '}
          {
          ' '
        }
          {' '}

        </Typography>
      ) : (
        <Grid
          item
          xs={
          12
        }
          md={
          12
        }
          xl={
          12
        }
          lg={
          12
        }
          alignItems="center"
        >

          <MUIDataTable
            columns={columns}
            data={data}
            options={options}
            title="User Complaint"
          />
        </Grid>
      )
    }
      {' '}


    </>
  );
}

// Results.propTypes = {
//   className: PropTypes.string,
// };


export default Results;
