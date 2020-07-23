/* eslint-disable no-sequences */
/* eslint-disable no-nested-ternary */
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getEnergyAlerts } from 'src/store/actions/energyAction';
import { CircularProgress, Typography, Grid } from '@material-ui/core';
import MUIDataTable from 'mui-datatables';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: theme.spacing(3)
  }
}));

const options = {
  filter: true,
  filterType: 'dropdown',
  responsive: 'scrollMaxHeight',
  selectableRows: 'none',
  fixedHeaderOptions: {
    xAxis: false,
    yAxis: true
  }
};


export default function Alerts() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const columns = useSelector((state) => state.energy.alertColumn);
  const data = useSelector((state) => state.energy.alertData);
  const loading = useSelector((state) => state.energy.alertloading);
  const user = useSelector((state) => state.account.user);

  const id = user.userid;
  useEffect(() => {
    dispatch(getEnergyAlerts(id));


    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>

      {loading ? (
        <Grid container justify="center" alignItems="center">
          <Grid item xs={12} md={12} xl={12} lg={12}>
            <CircularProgress className={classes.progress} color="secondary" />
          </Grid>
        </Grid>
      ) : !loading && data.length === 0 ? (
        <Typography variant="h5">No Recent Alerts</Typography>
      ) : (
        <Grid item xs={12} md={12} xl={12} lg={12} alignItems="center">
          <MUIDataTable
            columns={columns}
            data={data}
            options={options}
            title="Recent Alerts"
          />
        </Grid>
      )}
    </>
  );
}
