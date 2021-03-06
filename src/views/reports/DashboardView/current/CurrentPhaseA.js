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
// import FolderOpenIcon from '@material-ui/icons/FolderOpenOutlined';
import Label from 'src/components/Label';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  label: {
    marginLeft: theme.spacing(1)
  },
  avatar: {
    backgroundColor: theme.palette.success.main,
    color: theme.palette.secondary.contrastText,
    height: 48,
    width: 48
  }
}));

function Vb({ className, ...rest }) {
  const classes = useStyles();
  const energy = useSelector((state) => state.energy.energy);
  const { Ia } = energy;


  const data = {
    value: Ia,
    unit: 'Amp',

  };

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Box flexGrow={1}>
        <Typography
          component="h3"
          gutterBottom
          variant="overline"
          color="textSecondary"
        >
          PHASE-A CURRENT
        </Typography>
        <Box
          display="flex"
          alignItems="center"
          flexWrap="wrap"
        >
          <Typography
            variant="h4"
            color="textPrimary"
          >
            {data.value}

          </Typography>
          <Label
            className={classes.label}
            color="error"
          >

            {data.unit}

          </Label>
        </Box>
      </Box>
      <Avatar className={classes.avatar}>
        <img src="/static/energy_monitor_icons/bolt.png" height="30px" width="29px" alt="voltages" />
        {/* <FolderOpenIcon /> */}
      </Avatar>
    </Card>
  );
}

Vb.propTypes = {
  className: PropTypes.string
};

export default Vb;
