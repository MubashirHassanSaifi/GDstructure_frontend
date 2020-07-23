/* eslint-disable no-nested-ternary */
/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
// import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import MUIDataTable from 'mui-datatables';
import PropTypes from 'prop-types';
import { getLogData } from 'src/store/actions/logsAction';
import {
  Box,
  Card,
  Grid,
  TextField,
  makeStyles,

} from '@material-ui/core';
import { KeyboardDatePicker } from '@material-ui/pickers';
// import { findChildren } from '@fullcalendar/core';
// import Label from 'src/components/Label';


const avalabilityOptions = [
  {
    id: 'Va',
    name: 'Phase_A Voltage'
  },
  {
    id: 'Vb',
    name: 'Phase_B Voltage'
  },
  {
    id: 'Vc',
    name: 'Phase_C Voltage'
  },
  {
    id: 'Ia',
    name: 'Phase_A Current'
  },
  {
    id: 'Ib',
    name: 'Phase_B Current'
  },
  {
    id: 'Ic',
    name: 'Phase_C Current'
  },
  {
    id: 'Pf',
    name: 'Power Factor'
  },
  {
    id: 'PR',
    name: 'Real Power'
  },
  {
    id: 'PA',
    name: 'Apperent Power'
  },
  {
    id: 'U',
    name: 'Units'
  }

];
const options = {
  filter: true,
  filterType: 'dropdown',
  responsive: 'scrollMaxHeight',
  selectableRows: 'none',
  fixedHeaderOptions: {
    xAxis: false,
    yAxis: true
  }
};


const useStyles = makeStyles((theme) => ({
  root: {},
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
  availabilityField: {
    marginLeft: theme.spacing(2),
    flexBasis: 200
  },
  searchField: {
    width: 500
  },
  datePicker: {
    '& + &': {
      marginLeft: theme.spacing(2)
    }

  }
}));

function Results({ className, products, ...rest }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.account.user);
  const columns = useSelector((state) => state.logs.columns);
  const data = useSelector((state) => state.logs.logs);
  const { userid } = user;
  // const [tabletype, setTabletype] = useState('Va');
  const [startDate, setStartDate] = useState(moment().subtract(7, 'days'));
  const [endDate, setEndDate] = useState(moment());
  // const [selectEdge, setSelectEdge] = useState(null);
  // const [calendarDate, setCalendarDate] = useState(moment());
  const [filters, setFilters] = useState({
    category: null,
    availability: 'Va',
  });
  const type = filters.availability;


  const handleLogTypeChange = (event) => {
    event.persist();
    let value = null;
    value = event.target.value;

    setFilters((prevFilters) => ({
      ...prevFilters,
      availability: value
    }));
    // setTabletype(filters.availability);
  };


  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
  };


  useEffect(() => {
    dispatch(getLogData(filters.availability, userid, startDate, endDate));
  }, [filters.availability, startDate, endDate]);


  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Box p={2}>
        <Box
          display="flex"
          alignItems="center"
        >
          {/* <Grid container justify="center"> */}
          <Grid item xs={12} sm={12} lg={6} xl={6} alignItems="left">
            <TextField
              className={classes.searchField}
              label="Log Type"
              name="availability"
              onChange={handleLogTypeChange}
              select
              SelectProps={{ native: true }}
              value={filters.availability || 'Phase_A Voltage'}
              variant="outlined"
            >
              {avalabilityOptions.map((avalabilityOption) => (
                <option
                  key={avalabilityOption.id}
                  value={avalabilityOption.id}
                >
                  {avalabilityOption.name}
                </option>
              ))}
            </TextField>

          </Grid>

          {/* </Grid> */}

          <Box flexGrow={1} />
          <Box
            mt={3}
            display="flex"
            alignItems="center"
          >
            {/* <Grid item xs={12} sm={12} lg={6} xl={6} alignItems="right"> */}
            <KeyboardDatePicker
              className={classes.datePicker}
              label="Start Date"
              format="MM/DD/YYYY"
              name="startDate"
              inputVariant="outlined"
              value={startDate}
              onChange={handleStartDateChange}
            />
            {/* </Grid>
            <Grid item xs={12} sm={12} lg={3} xl={3} alignItems=""> */}
            <KeyboardDatePicker
              className={classes.datePicker}
              label="End Date"
              format="MM/DD/YYYY"
              name="endDate"
              inputVariant="outlined"
              value={endDate}
              onChange={handleEndDateChange}
            />
            {/* </Grid> */}
          </Box>


        </Box>

      </Box>

      <Grid item xs={12} md={12} xl={12} lg={12} alignItems="center">
        <MUIDataTable
          columns={columns}
          data={data}
          options={options}
        />
      </Grid>


    </Card>
  );
}

Results.propTypes = {
  className: PropTypes.string,
  products: PropTypes.array
};

Results.defaultProps = {
  products: []
};

export default Results;
