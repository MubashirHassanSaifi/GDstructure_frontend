/* eslint-disable no-underscore-dangle */
/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import { Link as RouterLink, useHistory } from 'react-router-dom';
import clsx from 'clsx';
import Label from 'src/components/Label';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { useSnackbar } from 'notistack';
import {
  Avatar,
  Box,
  Button,
  Card,
  Checkbox,
  Divider,
  IconButton,
  InputAdornment,
  Link,
  SvgIcon,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Tabs,
  TextField,
  Typography,
  makeStyles
} from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import {
  Edit as EditIcon,
  ArrowRight as ArrowRightIcon,
  Search as SearchIcon
} from 'react-feather';
import getInitials from 'src/utils/getInitials';

// const tabs = [
//   {
//     value: 'all',
//     label: 'All'
//   },
//   {
//     value: 'acceptsMarketing',
//     label: 'Accepts Marketing'
//   },
//   {
//     value: 'isProspect',
//     label: 'Prospect'
//   },
//   {
//     value: 'isReturning',
//     label: 'Returning'
//   }
// ];

const sortOptions = [
  {
    value: 'updatedAt|desc',
    label: 'Last update (newest first)'
  },
  {
    value: 'updatedAt|asc',
    label: 'Last update (oldest first)'
  },
  // {
  //   value: 'orders|desc',
  //   label: 'Total orders (high to low)'
  // },
  // {
  //   value: 'orders|asc',
  //   label: 'Total orders (low to high)'
  // }
];

function applyFilters(users, query, filters) {
  return users.filter((user) => {
    let matches = true;

    if (query) {
      const properties = ['email', 'name'];
      let containsQuery = false;

      properties.forEach((property) => {
        if (user[property].toLowerCase().includes(query.toLowerCase())) {
          containsQuery = true;
        }
      });

      if (!containsQuery) {
        matches = false;
      }
    }

    Object.keys(filters).forEach((key) => {
      const value = filters[key];

      if (value && user[key] !== value) {
        matches = false;
      }
    });

    return matches;
  });
}

function applyPagination(users, page, limit) {
  return users.slice(page * limit, page * limit + limit);
}

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }

  if (b[orderBy] > a[orderBy]) {
    return 1;
  }

  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySort(users, sort) {
  const [orderBy, order] = sort.split('|');
  const comparator = getComparator(order, orderBy);
  const stabilizedThis = users.map((el, index) => [el, index]);

  stabilizedThis.sort((a, b) => {
    // eslint-disable-next-line no-shadow
    const order = comparator(a[0], b[0]);

    if (order !== 0) return order;

    return a[1] - b[1];
  });

  return stabilizedThis.map((el) => el[0]);
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%'
  },
  queryField: {
    width: 500
  },
  bulkOperations: {
    position: 'relative'
  },
  bulkActions: {
    paddingLeft: 4,
    paddingRight: 4,
    marginTop: 6,
    position: 'absolute',
    width: '100%',
    zIndex: 2,
    backgroundColor: theme.palette.background.default
  },
  bulkAction: {
    marginLeft: theme.spacing(2)
  },
  avatar: {
    height: 42,
    width: 42,
    marginRight: theme.spacing(1),
    backgroundColor: 'Black'
  }
}));

function Results({ className, users, ...rest }) {
  const classes = useStyles();

  // const [currentTab, setCurrentTab] = useState('all');
  const { enqueueSnackbar } = useSnackbar();
  const history = useHistory();
  const [userID, setUserID] = useState(null);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [page, setPage] = useState(0);
  const [selectedAll, setSelectedAll] = useState(false);
  const [index, setIndex] = useState(null);
  const [open, setOpen] = useState(false);
  const [limit, setLimit] = useState(10);
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState(sortOptions[0].value);
  const [filters, setFilters] = useState({
    id: users._id,
    name: users.username,
    email: users.email,
    sensor: users.userid
  });

  // useEffect(() => {
  //   setFilters({
  //     id: users._id,
  //     name: users.username,
  //     email: users.email,
  //     sensor: users.userid
  //   });
  // }, [filters]);

  console.log(filters);
  // const handleTabsChange = (event, value) => {
  //   const updatedFilters = {
  //     ...filters,
  //     isProspect: null,
  //     isReturning: null,
  //     acceptsMarketing: null
  //   };

  //   if (value !== 'all') {
  //     updatedFilters[value] = true;
  //   }

  //   setFilters(updatedFilters);
  //   setSelectedUsers([]);
  //   // setCurrentTab(value);
  // };
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleAgree = () => {
    enqueueSnackbar('All users have been deleted Successfully', { persist: false, variant: 'success' });
    setOpen(false);
  };
  const handleQueryChange = (event) => {
    event.persist();
    setQuery(event.target.value);
  };

  const handleSortChange = (event) => {
    event.persist();
    setSort(event.target.value);
  };

  const handleSelectAllUsers = (event) => {
    setSelectedAll(true);
    setSelectedUsers(event.target.checked
      ? users.map((user) => user._id)
      : []);
  };

  const handleSelectOneUser = async (event, userId) => {
    setSelectedAll(false);
    const i = await users.findIndex((f) => f._id === userId);
    setIndex(i);

    setUserID(users[i]._id);
    console.log(userID);
    if (!selectedUsers.includes(userId)) {
      setSelectedUsers((prevSelected) => [...prevSelected, userId]);
    } else {
      setSelectedUsers((prevSelected) => prevSelected.filter((id) => id !== userId));
    }
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  // Usually query is done on backend with indexing solutions
  const filteredUsers = applyFilters(users, query, filters);
  const sortedUsers = applySort(filteredUsers, sort);
  const paginatedUsers = applyPagination(sortedUsers, page, limit);
  const enableBulkOperations = selectedUsers.length > 0;
  const selectedSomeUsers = selectedUsers.length > 0 && selectedUsers.length < users.length;
  const selectedAllUsers = selectedUsers.length === users.length;

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      {/* <Tabs
        onChange={handleTabsChange}
        scrollButtons="auto"
        textColor="secondary"
        value={currentTab}
        variant="scrollable"
      >
        {tabs.map((tab) => (
          <Tab
            key={tab.value}
            value={tab.value}
            label={tab.label}
          />
        ))}
      </Tabs> */}
      <Divider />
      <Box
        p={2}
        minHeight={56}
        display="flex"
        alignItems="center"
      >
        <TextField
          className={classes.queryField}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SvgIcon
                  fontSize="small"
                  color="action"
                >
                  <SearchIcon />
                </SvgIcon>
              </InputAdornment>
            )
          }}
          onChange={handleQueryChange}
          placeholder="Search Users"
          value={query}
          variant="outlined"
        />
        <Box flexGrow={1} />
        <TextField
          label="Sort By"
          name="sort"
          onChange={handleSortChange}
          select
          SelectProps={{ native: true }}
          value={sort}
          variant="outlined"
        >
          {sortOptions.map((option) => (
            <option
              key={option.value}
              value={option.value}
            >
              {option.label}
            </option>
          ))}
        </TextField>
      </Box>
      {enableBulkOperations && (
        <div className={classes.bulkOperations}>
          <div className={classes.bulkActions}>
            <Checkbox
              checked={selectedAllUsers}
              indeterminate={selectedSomeUsers}
              onChange={handleSelectAllUsers}
            />
            {
              selectedAll ? (
                <Button
                  variant="outlined"
                  className={
                    classes.bulkAction
                  }
                  onClick={
                    handleClickOpen
                  }
                >
                  Delete
                </Button>

              ) : (
                <Button
                  variant="outlined"
                  className={
                  classes.bulkAction
                }
                >
                  Delete
                </Button>
              )
            }
            <Dialog
              open={open}
              onClose={handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
                Delete All Users
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  Are you sure ?
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose} color="primary" autoFocus>
                  Disagree
                </Button>
                <Button onClick={handleAgree} color="primary">
                  Agree
                </Button>
              </DialogActions>
            </Dialog>
          </div>
        </div>
      )}
      <PerfectScrollbar>
        <Box minWidth={700}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedAllUsers}
                    indeterminate={selectedSomeUsers}
                    onChange={handleSelectAllUsers}
                  />
                </TableCell>
                <TableCell>
                  ID
                </TableCell>
                <TableCell>
                  Name
                </TableCell>
                <TableCell>
                  Location
                </TableCell>
                <TableCell>
                  Sensor
                </TableCell>
                <TableCell>
                  Sensor Assigned
                </TableCell>
                <TableCell align="left">
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedUsers.map((user) => {
                const isUserSelected = selectedUsers.includes(user._id);
                return (
                  <TableRow
                    hover
                    key={user._id}
                    selected={isUserSelected}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={isUserSelected}
                        onChange={(event) => handleSelectOneUser(event, user._id)}
                        value={isUserSelected}
                      />
                    </TableCell>
                    <TableCell>
                      {
                        user._id
                      }
                    </TableCell>
                    <TableCell>
                      <Box
                        display="flex"
                        alignItems="center"
                      >
                        <Avatar
                          className={classes.avatar}
                          src={user.avatar}
                        >
                          {getInitials(user.username)}
                        </Avatar>
                        <div>
                          <Link
                            color="inherit"
                            onClick={
                              () => history.push(`/admin/management/users/${userID}`)
                            }

                            variant="h6"
                          >
                            {user.username}
                          </Link>
                          <Typography
                            variant="body2"
                            color="textSecondary"
                          >
                            {user.email}
                          </Typography>
                        </div>
                      </Box>
                    </TableCell>
                    <TableCell>
                      {/* {user.location} */}
                      Pakistan, Lahore
                    </TableCell>
                    <TableCell>
                      {user.userid}
                    </TableCell>
                    {user.sensor ? (
                      <TableCell>
                        <Label color="success">
                          True
                        </Label>
                      </TableCell>

                    ) : (
                      <TableCell>
                        <Label color="error">
                          False
                          {' '}
                        </Label>
                        {' '}

                      </TableCell>
                    )}

                    <TableCell align="left">
                      {isUserSelected ? (
                        <IconButton
                          onClick={
                            () => history.push(`/admin/management/users/${userID}/edit`)
                          }

                        >

                          <SvgIcon fontSize="small">

                            <EditIcon />

                          </SvgIcon>
                        </IconButton>
                      ) : (
                        <IconButton
                          disabled
                        >
                          <SvgIcon fontSize="small">
                            <EditIcon />
                          </SvgIcon>
                          {' '}

                        </IconButton>

                      )}

                      {isUserSelected ? (
                        <IconButton
                          onClick={
                          () => history.push(`/admin/management/users/${userID}`)
                        }
                        >

                          <SvgIcon fontSize="small">

                            <ArrowRightIcon />

                          </SvgIcon>
                        </IconButton>

                      ) : (
                        <IconButton
                          disabled
                          onClick={
                          () => history.push(`/admin/management/users/${userID}`)
                        }
                        >
                          <SvgIcon fontSize="small">
                            <ArrowRightIcon />
                          </SvgIcon>
                          {' '}

                        </IconButton>
                      )}

                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={filteredUsers.length}
        onChangePage={handlePageChange}
        onChangeRowsPerPage={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
}

Results.propTypes = {
  className: PropTypes.string,
  users: PropTypes.array
};

Results.defaultProps = {
  users: []
};

export default Results;
