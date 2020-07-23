/* eslint-disable no-underscore-dangle */
import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Card,
  Grid,
  Typography,
  makeStyles
} from '@material-ui/core';
import Label from 'src/components/Label';
import VoltageThreshole from './ThresholeForms/VoltageThreshole';
import CurrentThreshole from './ThresholeForms/CurrentThreshole';
import PowerThreshole from './ThresholeForms/PowerThreshole';
import UnitThreshole from './ThresholeForms/UnitThreshole';

const useStyles = makeStyles((theme) => ({
  root: {},
  item: {
    padding: theme.spacing(3),
    textAlign: 'center',
    [theme.breakpoints.up('md')]: {
      '&:not(:last-of-type)': {
        borderRight: `1px solid ${theme.palette.divider}`
      }
    },
    [theme.breakpoints.down('sm')]: {
      '&:not(:last-of-type)': {
        borderBottom: `1px solid ${theme.palette.divider}`
      }
    }
  },
  valueContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  label: {
    marginLeft: theme.spacing(1)
  }
}));

function Overview({ className, ...rest }) {
  const classes = useStyles();
  const energy = useSelector((state) => state.energy.energy);
  const Iupperlmt = energy.I_upperLmt;
  const Vupperlmt = energy.V_upperLmt;
  const Vlowerlmt = energy.V_lowerLmt;
  const Pflowerlmt = energy.Pf_lowerLmt;
  const Uupperlmt = energy.U_upperLmt;
  const { _id } = energy;

  const overview = {
    Vupperlmt,
    Vlowerlmt,
    Iupperlmt,
    Pflowerlmt,
    Uupperlmt
  };

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Grid
        alignItems="center"
        container
        justify="space-between"
      >
        <Grid
          className={classes.item}
          item
          md={3}
          sm={6}
          xs={12}
        >
          <Typography
            component="h2"
            gutterBottom
            variant="overline"
            color="textSecondary"
          >
            Lower | High voltage Limit
          </Typography>
          <div className={classes.valueContainer}>
            <Typography
              variant="h4"
              color="textPrimary"
            >

              {overview.Vlowerlmt}
              {' '}
              |
              {' '}
              {overview.Vupperlmt}

              <Label
                className={classes.label}
                color="warning"
              >
                volt
              </Label>
            </Typography>
            {/* <Label
              className={classes.label}
              color="primary"
            ></Label> */}
            <div className={classes.valueContainer}>
              <VoltageThreshole id={_id} />
            </div>


          </div>
        </Grid>
        <Grid
          className={classes.item}
          item
          md={3}
          sm={6}
          xs={12}
        >
          <Typography
            component="h2"
            gutterBottom
            variant="overline"
            color="textSecondary"
          >
            Current Upper Limit
          </Typography>
          <div className={classes.valueContainer}>
            <Typography
              variant="h4"
              color="textPrimary"
            >

              {overview.Iupperlmt}
              <Label
                className={classes.label}
                color="warning"
              >
                Ampere
              </Label>


            </Typography>
            <div className={classes.valueContainer}>
              <CurrentThreshole id={_id} />
            </div>

          </div>
        </Grid>
        <Grid
          className={classes.item}
          item
          md={3}
          sm={6}
          xs={12}
        >
          <Typography
            component="h2"
            gutterBottom
            variant="overline"
            color="textSecondary"
          >
            PowerFactor Lower Limt
          </Typography>
          <div className={classes.valueContainer}>
            <Typography
              variant="h3"
              color="textPrimary"
            >
              {overview.Pflowerlmt}
            </Typography>
            <div className={classes.valueContainer}>
              <PowerThreshole id={_id} />
            </div>
          </div>
        </Grid>
        <Grid
          className={classes.item}
          item
          md={3}
          sm={6}
          xs={12}
        >
          <Typography
            component="h2"
            gutterBottom
            variant="overline"
            color="textSecondary"
          >
            Units Upper Limit
          </Typography>
          <div className={classes.valueContainer}>
            <Typography
              variant="h3"
              color="textPrimary"
            >
              {overview.Uupperlmt}

              <Label
                className={classes.label}
                color="warning"
              >
                KWH
              </Label>
            </Typography>
            <div className={classes.valueContainer}>
              <UnitThreshole id={_id} />
            </div>

          </div>
        </Grid>
      </Grid>
    </Card>
  );
}

Overview.propTypes = {
  className: PropTypes.string
};

export default Overview;
