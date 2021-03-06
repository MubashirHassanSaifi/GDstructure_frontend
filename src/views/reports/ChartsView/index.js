import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Breadcrumbs,
  Container,
  Grid,
  Link,
  Typography,
  makeStyles
} from '@material-ui/core';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import Page from 'src/components/Page';
import AreaChart from './AreaChart';
import LineChart from './LineChart';
import RadialChart from './RadialChart';
import Header from './Header';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3)
  }

}));

function ApexChartsView() {
  const classes = useStyles();

  return (
    <Page
      className={classes.root}
      title="Charts"
    >
      <Container maxWidth="lg">

        <Header />

        <Box mt={3}>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              xs={12}
            >
              <LineChart />
            </Grid>
            <Grid
              item
              xs={12}
              md={8}
              // lg={12}
            >
              <AreaChart />
            </Grid>
            <Grid
              item
              xs={12}
              md={4}
            >
              <RadialChart />
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Page>
  );
}

export default ApexChartsView;
