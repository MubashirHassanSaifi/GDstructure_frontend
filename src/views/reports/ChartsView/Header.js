import React, { useRef, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { getChartData } from 'src/store/actions/energyAction';
import {
  Breadcrumbs,
  Button,
  Grid,
  Link,
  Menu,
  MenuItem,
  SvgIcon,
  Typography,
  makeStyles
} from '@material-ui/core';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import { Calendar as CalendarIcon } from 'react-feather';

const timeRanges = [
  {
    value: 'week',
    text: 'Last Week'
  },
  {
    value: 'month',
    text: 'Last Month'
  },
  {
    value: 'year',
    text: 'Last Year'
  }
];

const useStyles = makeStyles((theme) => ({
  root: {},
  actionIcon: {
    marginRight: theme.spacing(1)
  }
}));

function Header({ className, ...rest }) {
  const classes = useStyles();
  const actionRef = useRef(null);
  const user = useSelector((state) => state.account.user);
  const { userid } = user;
  const dispatch = useDispatch();
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [timeRange, setTimeRange] = useState(timeRanges[0].value);
  useEffect(() => {
    dispatch(getChartData(timeRange, userid));
  }, [timeRange]);

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
            to="/app"
            component={RouterLink}
          >
            Dashboard
          </Link>
          <Typography
            variant="body1"
            color="textPrimary"
          >
            Charts
          </Typography>
        </Breadcrumbs>
        <Typography
          variant="h3"
          color="textPrimary"
        >
          Graphs
        </Typography>
      </Grid>
      <Grid item>
        <Button
          ref={actionRef}
          onClick={() => setMenuOpen(true)}
        >
          <SvgIcon
            fontSize="small"
            className={classes.actionIcon}
          >
            <CalendarIcon />
          </SvgIcon>
          {timeRange}
        </Button>
        <Menu
          anchorEl={actionRef.current}
          onClose={() => setMenuOpen(false)}
          open={isMenuOpen}
          PaperProps={{ className: classes.menu }}
          getContentAnchorEl={null}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center'
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center'
          }}
        >
          {timeRanges.map((t) => (
            <MenuItem
              key={t.text}
              onClick={() => setTimeRange(t.value)}
            >
              {t.text}
            </MenuItem>
          ))}
        </Menu>
      </Grid>
    </Grid>
  );
}

Header.propTypes = {
  className: PropTypes.string
};

Header.defaultProps = {};

export default Header;
