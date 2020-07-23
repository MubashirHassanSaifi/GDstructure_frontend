/* eslint-disable no-use-before-define */
/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import { useLocation, matchPath } from 'react-router';
import { Link as RouterLink } from 'react-router-dom';
// import { useSelector } from 'react-redux';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';
import {
  Avatar,
  Box,
  Divider,
  Drawer,
  Hidden,
  Link,
  List,
  ListSubheader,
  Typography,
  makeStyles
} from '@material-ui/core';
import ReceiptIcon from '@material-ui/icons/ReceiptOutlined';
import {
  ShoppingCart as ShoppingCartIcon,
  Users as UsersIcon,
  Folder as FolderIcon,

} from 'react-feather';
import Logo from 'src/components/Logo';
import NavItem from './NavItem';

const navConfig = [
  {
    subheader: 'Management',
    items: [{
      title: 'Users',
      icon: UsersIcon,
      href: '/admin/welcome',
      items: [{
        title: 'List Users',
        href: '/admin/welcome'
      },
      {
        title: 'Create User',
        href: '/admin/userManagement/users/user'
      }
      ]
    },
    {
      title: 'Sensors',
      icon: ShoppingCartIcon,
      href: '/admin/management/sensors',
      items: [{
        title: 'List Sensors',
        href: '/admin/management/sensors'
      },
      {
        title: 'Create Sensor',
        href: '/admin/management/senors/create'
      }
      ]
    },
    {
      title: 'Complaints',
      icon: FolderIcon,
      href: '/admin/management/complaints',
      items: [{
        title: 'List Complaints',
        href: '/admin/management/complaints'
      }
      ]
    },
    {
      title: 'Invoices',
      icon: ReceiptIcon,
      href: '/admin/management/invoices',
      items: [{
        title: 'List Invoices',
        href: '/admin/management/invoices'
      },
      {
        title: 'View Invoice',
        href: '/admin/management/invoices/1'
      }
      ]
    }
    ]
  },


];

function renderNavItems({ items, ...rest }) {
  return (
    <List disablePadding>
      {items.reduce(
        (acc, item) => reduceChildRoutes({ acc, item, ...rest }),
        []
      )}
    </List>
  );
}

function reduceChildRoutes({
  acc,
  pathname,
  item,
  depth = 0
}) {
  const key = item.title + depth;

  if (item.items) {
    const open = matchPath(pathname, {
      path: item.href,
      exact: false
    });

    acc.push(
      <NavItem
        depth={depth}
        icon={item.icon}
        key={key}
        info={item.info}
        open={Boolean(open)}
        title={item.title}
      >
        {renderNavItems({
          depth: depth + 1,
          pathname,
          items: item.items
        })}
      </NavItem>
    );
  } else {
    acc.push(
      <NavItem
        depth={depth}
        href={item.href}
        icon={item.icon}
        key={key}
        info={item.info}
        title={item.title}
      />
    );
  }

  return acc;
}

const useStyles = makeStyles(() => ({
  mobileDrawer: {
    width: 256
  },
  desktopDrawer: {
    width: 256,
    top: 64,
    height: 'calc(100% - 64px)'
  },
  avatar: {
    cursor: 'pointer',
    width: 64,
    height: 64
  }
}));

function NavBar({ openMobile, onMobileClose, }) {
  const classes = useStyles();
  const location = useLocation();
  // const { user } = useSelector((state) => state.account);

  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
    // eslint-disable-next-line
  }, [location.pathname]);

  const content = (
    <Box
      height="100%"
      display="flex"
      flexDirection="column"
    >
      <PerfectScrollbar options={{ suppressScrollX: true }}>
        <Hidden lgUp>
          <Box
            p={2}
            display="flex"
            justifyContent="center"
          >
            <RouterLink to="/">
              <Logo />
            </RouterLink>
          </Box>
        </Hidden>
        <Box p={2}>
          <Box
            display="flex"
            justifyContent="center"
          >
            <RouterLink to="/app/account">
              <Avatar
                alt="Admin"
                className={classes.avatar}
                // src={}
              />
            </RouterLink>
          </Box>
          <Box
            mt={2}
            textAlign="center"
          >
            <Link
              component={RouterLink}
              to="#"
              variant="h5"
              color="textPrimary"
              underline="none"
            >
              {/* {`${user.username}`} */}
              Admin
            </Link>
            <Typography
              variant="body2"
              color="textSecondary"
            >
              {/* {user.bio} */}
            </Typography>
          </Box>
        </Box>
        <Divider />
        <Box p={2}>
          {navConfig.map((config) => (
            <List
              key={config.subheader}
              subheader={(
                <ListSubheader
                  disableGutters
                  disableSticky
                >
                  {config.subheader}
                </ListSubheader>
              )}
            >
              {renderNavItems({ items: config.items, pathname: location.pathname })}
            </List>
          ))}
        </Box>

      </PerfectScrollbar>
    </Box>
  );

  return (
    <>
      <Hidden lgUp>
        <Drawer
          anchor="left"
          classes={{ paper: classes.mobileDrawer }}
          onClose={onMobileClose}
          open={openMobile}
          variant="temporary"
        >
          {content}
        </Drawer>
      </Hidden>
      <Hidden mdDown>
        <Drawer
          anchor="left"
          classes={{ paper: classes.desktopDrawer }}
          open
          variant="persistent"
        >
          {content}
        </Drawer>
      </Hidden>
    </>
  );
}

NavBar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool
};

export default NavBar;
