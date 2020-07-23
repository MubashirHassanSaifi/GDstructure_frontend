import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { Grid, makeStyles } from '@material-ui/core';
import {
  getEnergyData
} from 'src/store/actions/energyAction';
import UserInfo from './UserInfo';
import Emails from './Emails';
import Sensor from './sensorInfo';
import OtherActions from './OtherActions';

const useStyles = makeStyles(() => ({
  root: {}
}));


function Details({
  user, className, ...rest
}) {
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getEnergyData(user.userid));
  }, []);

  return (
    <Grid
      className={clsx(classes.root, className)}
      container
      spacing={3}
      {...rest}
    >
      <Grid
        item
        lg={4}
        md={6}
        xl={3}
        xs={12}
      >
        <UserInfo user={user} />
      </Grid>
      <Grid
        item
        lg={4}
        md={6}
        xl={3}
        xs={12}
      >

        <Sensor />
      </Grid>
      {/* <Grid
        item
        lg={4}
        md={6}
        xl={3}
        xs={12}
      >
        <Emails />
      </Grid> */}
      <Grid
        item
        lg={4}
        md={6}
        xl={3}
        xs={12}
      >
        <OtherActions />
      </Grid>
    </Grid>
  );
}

Details.propTypes = {
  className: PropTypes.string,
  user: PropTypes.object.isRequired

};

export default Details;
