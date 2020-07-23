import React from 'react';
import { Link as RouterLink, useParams, useHistory } from 'react-router-dom';
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
import { Edit as EditIcon } from 'react-feather';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';

const useStyles = makeStyles((theme) => ({
  root: {},
  actionIcon: {
    marginRight: theme.spacing(1)
  }
}));

function Header({ className, customer, ...rest }) {
  const classes = useStyles();
  const { userId } = useParams();
  const history = useHistory();

  return (
    <Grid
      container
      spacing={3}
      justify="space-between"
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Grid item>
        <Breadcrumbs
          separator={<NavigateNextIcon fontSize="small" />}
          aria-label="breadcrumb"
        >
          <Link
            variant="body1"
            color="inherit"
            to="/admin/welcome"
            component={RouterLink}
          >
            Management
          </Link>
          {/* <Link
            variant="body1"
            color="inherit"
            to="/admin/management"
            component={RouterLink}
          >
            Management
          </Link> */}
          <Typography
            variant="body1"
            color="textPrimary"
          >
            Users
          </Typography>
        </Breadcrumbs>
        <Typography
          variant="h3"
          color="textPrimary"
        >
          {customer.username}
        </Typography>
      </Grid>
      <Grid item>
        <Button
          color="secondary"
          variant="contained"
          onClick={
            () => history.push(`/admin/management/users/${userId}/edit`)
          }
        >
          <SvgIcon
            fontSize="small"
            className={classes.actionIcon}
          >
            <EditIcon />
          </SvgIcon>
          Edit
        </Button>
      </Grid>
    </Grid>
  );
}

Header.propTypes = {
  className: PropTypes.string,
  customer: PropTypes.object.isRequired
};

export default Header;
