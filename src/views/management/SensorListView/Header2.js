import React from 'react';
import {
  Link as RouterLink
} from 'react-router-dom';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Breadcrumbs,
  Button,
  Grid,
  Link,
  SvgIcon,
  Typography,
  makeStyles
} from '@material-ui/core';
import {
  PlusCircle as PlusCircleIcon,

} from 'react-feather';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(2),
  },
  action: {
    marginBottom: theme.spacing(1),
    '& + &': {
      marginLeft: theme.spacing(1)
    }
  },
  actionIcon: {
    marginRight: theme.spacing(1)
  }
}));

function Header2({
  className,
  ...rest
}) {
  const classes = useStyles();

  return (
    <Grid
      container
      spacing={3}
      justify="space-between"
      className={
      clsx(classes.root, className)
    }
      {
      ...rest
    }
    >
      <Grid item>

        <Breadcrumbs
          separator={
            <NavigateNextIcon fontSize="small" />
    }
          aria-label="breadcrumb"
        >
          {/* <Typography
            variant="body1"
            color="textPrimary"
          >
            Sensor is not Assigned
            {' '}
          </Typography>
          {' '} */}

        </Breadcrumbs>
        {' '}
        <Typography
          variant="h3"
          color="textPrimary"
        >
          Not Assigned Sensors
          {' '}
        </Typography>
        {' '}

      </Grid>
      {' '}
      <Grid item>
        <Button
          color="secondary"
          variant="contained"
          className={
      classes.action
    }
          component={
      RouterLink
    }
          to="/admin/management/senors/create"
        >
          <SvgIcon
            fontSize="small"
            className={
      classes.actionIcon
    }
          >
            <PlusCircleIcon />
          </SvgIcon>
          Assigned Sensor
          {' '}
        </Button>
      </Grid>
      {' '}
    </Grid>
  );
}

Header2.propTypes = {
  className: PropTypes.string
};

export default Header2;
