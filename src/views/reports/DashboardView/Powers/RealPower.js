import React from 'react';
import { useSelector } from 'react-redux';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  Avatar,
  Box,
  Card,
  Typography,
  makeStyles
} from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
  root: {
    color: theme.palette.secondary.contrastText,
    backgroundColor: theme.palette.success.dark,
    padding: theme.spacing(3),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  avatar: {
    backgroundColor: theme.palette.secondary.contrastText,
    color: theme.palette.secondary.main,
    height: 48,
    width: 48
  }
}));

function RealPower({ className, ...rest }) {
  const classes = useStyles();
  const energy = useSelector((state) => state.energy.energy);
  const { PR } = energy;
  const data = {
    value: PR,
    currency: ''
  };

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Box flexGrow={1}>
        <Typography
          color="inherit"
          component="h3"
          gutterBottom
          variant="overline"
        >
          REAL POWER
        </Typography>
        <Box
          display="flex"
          alignItems="center"
          flexWrap="wrap"
        >
          <Typography
            color="inherit"
            variant="h3"
          >
            {data.currency}
            {data.value}
          </Typography>
        </Box>
      </Box>
      <Avatar
        className={classes.avatar}
        color="inherit"
      >
        {/* <AttachMoneyIcon /> */}
        <img src="/static/energy_monitor_icons/power-tower.png" height="30px" width="29px" alt="voltages" />
      </Avatar>
    </Card>
  );
}

RealPower.propTypes = {
  className: PropTypes.string
};

export default RealPower;
