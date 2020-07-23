import React from 'react';
import { Container, makeStyles } from '@material-ui/core';
import Page from 'src/components/Page';
import Header from './Header';
import SensorAddForm from './SensorAddForm';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingTop: theme.spacing(3),
    paddingBottom: 100
  }
}));

function ProductCreateView() {
  const classes = useStyles();

  return (
    <Page
      className={classes.root}
      title="Sensor Add"
    >
      <Container maxWidth="lg">
        <Header />
        <SensorAddForm />
      </Container>
    </Page>
  );
}

export default ProductCreateView;
