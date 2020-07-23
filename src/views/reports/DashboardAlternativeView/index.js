import React from 'react';
import {
  Container,
  Grid,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';

import Header from './Header';
import Overview from './Overview';
import VoltMeter from './Meters/VoltageMeters/voltagemeterA';
import VoltMeterB from './Meters/VoltageMeters/voltageMeterB';
import VoltMeterC from './Meters/VoltageMeters/voltageMeterC';
import CurrentMeter from './Meters/CurrentMeters/currentMeter';
import CurrentMeterB from './Meters/CurrentMeters/currentMeterB';
import CurrentMeterC from './Meters/CurrentMeters/currentMeterC';


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

function DashboardAlternativeView() {
  const classes = useStyles();

  return (
    <Page
      className={classes.root}
      title="Dashboard Alternative"
    >
      <Container
        maxWidth={false}
        className={classes.container}
      >
        <Header />
        <Grid
          container
          spacing={3}
        >
          <Grid
            item
            xs={12}
          >
            <Overview />
          </Grid>
          <Grid
            item
            lg={4}
            xs={12}
          >
            <VoltMeter />
          </Grid>
          <Grid
            item
            lg={4}
            xs={12}
          >
            <VoltMeterB />
          </Grid>
          <Grid
            item
            lg={4}
            xs={12}
          >
            <VoltMeterC />
          </Grid>
          <Grid
            item
            lg={4}
            xs={12}
          >
            <CurrentMeter />
          </Grid>
          <Grid
            item
            lg={4}
            xs={12}
          >
            <CurrentMeterB />
          </Grid>
          <Grid
            item
            lg={4}
            xs={12}
          >
            <CurrentMeterC />
          </Grid>
          {/* <Grid
            item
            lg={8}
            xl={9}
            xs={12}
          >
            <FinancialStats />
          </Grid>
          <Grid
            item
            lg={4}
            xl={3}
            xs={12}
          >
            <EarningsSegmentation />
          </Grid>
          <Grid
            item
            lg={8}
            xs={12}
          >
            <LatestOrders />
          </Grid>
          <Grid
            item
            lg={4}
            xs={12}
          >
            <CustomerActivity />
          </Grid>
          <Grid
            item
            lg={8}
            xs={12}
          >
            <MostProfitableProducts />
          </Grid>
          <Grid
            item
            lg={4}
            xs={12}
          >
            <TopReferrals />
          </Grid> */}
        </Grid>
      </Container>
    </Page>
  );
}

export default DashboardAlternativeView;
