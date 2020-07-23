import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Divider, Grid, Container } from '@material-ui/core';
import Page from 'src/components/Page';
import Alerts from './Alerts';
import Header from './Header';

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
  },
  alerts: {
    marginTop: 20
  }
}));

export default function General() {
  const classes = useStyles();


  return (
    <Page
      className={classes.root}
      title="Alerts"
    >
      <Container
        maxWidth={false}
        className={classes.container}
      >
        <Header />

        <Grid
          container
          alignItems="center"
          justify="center"
          className={classes.alerts}
        >


          <Grid item sm={11} lg={11} md={11} xl={11}>

            <Alerts />
            <Divider />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
