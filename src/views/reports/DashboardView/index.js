/* eslint-disable camelcase */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Container,
  Grid,
  makeStyles,
  Button,
} from '@material-ui/core';
import { useSnackbar } from 'notistack';
import Page from 'src/components/Page';
import { getEnergyData } from 'src/store/actions/energyAction';
import Header from './Header';
import Vc from './Voltages/VoltagePhaseC';
import Pf from './Powers/Powerfactor';
import PA from './Powers/ApperentPower';
import Vb from './Voltages/VoltagePhaseB';
import Va from './Voltages/VoltagePhaseA';
import Ia from './current/CurrentPhaseA';
import Ib from './current/CurrentPhaseB';
import Ic from './current/CurrentPhaseC';
import VoltMeter from './Meters/VoltageMeters/voltagemeterA';
import VoltMeterB from './Meters/VoltageMeters/voltageMeterB';
import VoltMeterC from './Meters/VoltageMeters/voltageMeterC';
import CurrentMeter from './Meters/CurrentMeters/currentMeter';
import CurrentMeterB from './Meters/CurrentMeters/currentMeterB';
import CurrentMeterC from './Meters/CurrentMeters/currentMeterC';
import PR from './Powers/RealPower';
import U from './Powers/Units';
import Overview from './ThresholeView';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3)
  },
  container: {
    [theme.breakpoints.up('lg')]: {
      paddingLeft: 64,
      paddingRight: 64
    }
  }
}));

function DashboardView() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.account.user);
  const energy = useSelector((state) => state.energy.energy);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const { U_upperLmt } = energy;
  const unit = energy.U;
  const totalUnits = U_upperLmt;
  const percentage = (unit / totalUnits) * 100;

  const action = (key) => (
    <>
      <Button onClick={() => { closeSnackbar(key); }}>
        Dismiss
      </Button>
    </>
  );

  if (percentage === 25) {
    enqueueSnackbar('25% units reached ', {
      variant: 'warning',
      autoHideDuration: '3000',
      action,

    });
  } else if (percentage === 50) {
    enqueueSnackbar('50% units reached ', {
      variant: 'warning',
      autoHideDuration: '3000',
      action
    });
  } else if (percentage === 75) {
    enqueueSnackbar('75% units reached ', {
      variant: 'warning',
      autoHideDuration: '3000',
      action
    });
  } else if (percentage >= 80 && percentage <= 99) {
    enqueueSnackbar('Units are closed to his upperLmt ', {
      variant: 'warning',
      persist: true,
      action,

    });
  }
  const { userid } = user;
  useEffect(() => {
    dispatch(getEnergyData(userid));
  }, []);


  return (
    <Page
      className={classes.root}
      title="Dashboard"
    >
      <Container
        maxWidth={false}
        className={classes.container}
      >
        <Header />
        <Grid
          container
          spacing={4}
        >
          <Grid
            item
            lg={4}
            sm={6}
            xs={12}
          >
            <Va />
          </Grid>
          <Grid
            item
            lg={4}
            sm={6}
            xs={12}
          >
            <Vb />
          </Grid>
          <Grid
            item
            lg={4}
            sm={6}
            xs={12}
          >
            <Vc />
          </Grid>
          <Grid
            item
            lg={4}
            sm={6}
            xs={12}
          >
            <Ia />
          </Grid>
          <Grid
            item
            lg={4}
            sm={6}
            xs={12}
          >
            <Ib />
          </Grid>
          <Grid
            item
            lg={4}
            sm={6}
            xs={12}
          >
            <Ic />
          </Grid>
          <Grid
            item
            lg={6}
            sm={6}
            xs={12}
          >
            <Pf />
          </Grid>
          <Grid
            item
            lg={6}
            sm={6}
            xs={12}
          >
            <PA />
          </Grid>
          <Grid
            item
            lg={6}
            sm={12}
            xs={12}
          >
            <PR />
          </Grid>
          <Grid
            item
            lg={6}
            sm={12}
            xs={12}
          >
            <U />
          </Grid>
          <Grid
            item
            lg={12}
            sm={12}
          >
            <Overview />
          </Grid>
          <Grid
            item
            lg={4}
            sm={6}
            xs={12}
          >
            <VoltMeter />
          </Grid>
          <Grid
            item
            lg={4}
            sm={6}
            xs={12}
          >
            <VoltMeterB />
          </Grid>
          <Grid
            item
            lg={4}
            sm={6}
            xs={12}
          >
            <VoltMeterC />
          </Grid>
          <Grid
            item
            lg={4}
            sm={6}
            xs={12}
          >
            <CurrentMeter />
          </Grid>
          <Grid
            item
            lg={4}
            sm={6}
            xs={12}
          >
            <CurrentMeterB />
          </Grid>
          <Grid
            item
            lg={4}
            sm={6}
            xs={12}
          >
            <CurrentMeterC />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}

export default DashboardView;
