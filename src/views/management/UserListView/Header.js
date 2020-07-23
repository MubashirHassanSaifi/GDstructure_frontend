import React from 'react';
import { Link as RouterLink, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';

import {
  Box,
  Breadcrumbs,
  Button,
  Grid,
  Link,
  SvgIcon,
  Typography,
  makeStyles
} from '@material-ui/core';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import {
  PlusCircle as PlusCircleIcon,
  Download as DownloadIcon,
  Upload as UploadIcon
} from 'react-feather';
import Result from './Results';

const useStyles = makeStyles((theme) => ({
  root: {},
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

function Header({ className, ...rest }) {
  const classes = useStyles();
  const history = useHistory();

  return (
    <Grid
      className={clsx(classes.root, className)}
      container
      justify="space-between"
      spacing={3}
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
            to="/admin"
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
          All Users
        </Typography>
        <Box mt={2}>

          {/* <PDFDownloadLink
            document={(
              <Result />
              )}
            fileName="User list"
            style={
                {
                  textDecoration: 'none'
                }
              }
          >
            <Button className={classes.action}>
              <SvgIcon
                fontSize="small"
                className={classes.actionIcon}
              >
                <DownloadIcon />
              </SvgIcon>
              Export
            </Button>
          </PDFDownloadLink> */}
        </Box>
      </Grid>
      <Grid item>
        <Button
          color="secondary"
          variant="contained"
          className={classes.action}
          onClick={
            () => { history.push('/admin/userManagement/users/user'); }
          }
        >
          <SvgIcon
            fontSize="small"
            className={classes.actionIcon}
          >
            <PlusCircleIcon />
          </SvgIcon>
          New User
        </Button>
      </Grid>
    </Grid>
  );
}

Header.propTypes = {
  className: PropTypes.string
};

export default Header;
