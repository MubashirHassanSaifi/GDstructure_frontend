import React from 'react';
import {
  Box,
  Container,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import Header from './Header';
import Header2 from './Header2';
import Results from './Results';
import Results2 from './Result2';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingTop: theme.spacing(3),
    paddingBottom: 100
  }
}));

function SensorListView() {
  const classes = useStyles();


  return (
    <Page
      className={classes.root}
      title="Sensor List"
    >
      <Container maxWidth={false}>
        <Header />
        <Box mt={3}>
          <Results />
        </Box>

        <Header2 />
        <Box mt={3}>
          <Results2 />
        </Box>
      </Container>
    </Page>
  );
}

export default SensorListView;
