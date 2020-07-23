import React from 'react';
import { useDispatch } from 'react-redux';
import { Link as RouterLink, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  AppBar,
  Box,
  Toolbar,
  Hidden,
  IconButton,
  Button,
  makeStyles
} from '@material-ui/core';
import { Menu as MenuIcon } from 'react-feather';
import Logo from 'src/components/Logo';
import { adminLogOut } from 'src/store/actions/adminAction';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.default,
    color: theme.palette.text.primary,
    boxShadow: 'none',
    borderBottom: `1px solid ${theme.palette.divider}`,
    zIndex: theme.zIndex.drawer + 100
  },
  toolbar: {
    height: 64
  },
  link: {
    fontWeight: theme.typography.fontWeightMedium
  }
}));

function TopBar({ onMobileNavOpen }) {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const handleLogOut = async () => {
    console.log('hrer');
    await dispatch(adminLogOut());
    history.push('/');
  };

  return (
    <AppBar className={classes.root}>
      <Toolbar className={classes.toolbar}>
        <Hidden lgUp>
          <IconButton
            className={classes.menuButton}
            color="inherit"
            onClick={onMobileNavOpen}
          >
            <MenuIcon />
          </IconButton>
        </Hidden>
        <Hidden mdDown>
          <RouterLink to="/">
            <Logo />
          </RouterLink>
        </Hidden>
        <Box
          ml={2}
          flexGrow={1}
        />
        <Button
          className={
          classes.link
        }
          color="secondary"
          component={
          RouterLink
        }

          underline="none"
          variant="contained"
          size="small"
          onClick={handleLogOut}
        >
          Log out
        </Button>

      </Toolbar>
    </AppBar>
  );
}

TopBar.propTypes = {
  onMobileNavOpen: PropTypes.func
};

export default TopBar;
