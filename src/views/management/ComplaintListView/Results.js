/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */
import React, { useState } from 'react';
import { Link as RouterLink, useHistory } from 'react-router-dom';
import clsx from 'clsx';
import moment from 'moment';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Box,
  Card,
  CardHeader,
  Checkbox,
  Divider,
  IconButton,
  SvgIcon,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  makeStyles
} from '@material-ui/core';
import {
  Edit as EditIcon,
  ArrowRight as ArrowRightIcon
} from 'react-feather';
import Label from 'src/components/Label';
import GenericMoreButton from 'src/components/GenericMoreButton';
import BulkOperations from './BulkOperations';

function applyPagination(complaints, page, limit) {
  return complaints.slice(page * limit, page * limit + limit);
}

const complaintStatusColors = {
  canceled: 'error',
  pending: 'warning',
  completed: 'success',
  rejected: 'error'
};

const useStyles = makeStyles(() => ({
  root: {}
}));

function Results({ className, complaints, ...rest }) {
  const classes = useStyles();
  const history = useHistory();
  const [selectedComplaints, setSelectedComplaints] = useState([]);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [complaint_Id, setComplaint_Id] = useState(null);

  const handleSelectAllComplaints = (event) => {
    setSelectedComplaints(event.target.checked
      ? complaints.map((complaint) => complaint._id)
      : []);
  };

  const handleSelectOneComplaint = (event, complaintId) => {
    setComplaint_Id(complaintId);
    if (!selectedComplaints.includes(complaintId)) {
      setSelectedComplaints((prevSelected) => [...prevSelected, complaintId]);
    } else {
      setSelectedComplaints((prevSelected) => prevSelected.filter((id) => id !== complaintId));
    }
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const paginatedComplaints = applyPagination(complaints, page, limit);
  const enableBulkOperations = selectedComplaints.length > 0;
  const selectedSomeComplaints = selectedComplaints.length > 0 && selectedComplaints.length < complaints.length;
  const selectedAllComplaints = selectedComplaints.length === complaints.length;
  return (
    <div
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Typography
        color="textSecondary"
        gutterBottom
        variant="body2"
      >
        {complaints.length}
        {' '}
        Records found. Page
        {' '}
        {page + 1}
        {' '}
        of
        {' '}
        {Math.ceil(complaints.length / limit)}
      </Typography>
      <Card>
        <CardHeader
          action={<GenericMoreButton />}
          title="complaints"
        />
        <Divider />
        <PerfectScrollbar>
          <Box minWidth={1150}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedAllComplaints}
                      indeterminate={selectedSomeComplaints}
                      onChange={handleSelectAllComplaints}
                    />
                  </TableCell>
                  <TableCell>
                    Complaint Subject
                  </TableCell>
                  <TableCell>
                    Registered At
                  </TableCell>
                  <TableCell>
                    User
                  </TableCell>
                  <TableCell>
                    Sensor
                  </TableCell>
                  <TableCell>
                    Status
                  </TableCell>
                  <TableCell>
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedComplaints.map((complaint) => {
                  const isComplaintSelected = selectedComplaints.includes(complaint._id);

                  return (
                    <TableRow
                      key={complaint._id}
                      selected={selectedComplaints.indexOf(complaint._id) !== -1}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={isComplaintSelected}
                          onChange={(event) => handleSelectOneComplaint(event, complaint._id)}
                          value={isComplaintSelected}
                        />
                      </TableCell>
                      <TableCell>

                        <Typography
                          variant="body2"
                          color="textSecondary"
                        >
                          {
                            complaint.subject
                          }
                        </Typography>
                      </TableCell>
                      <TableCell>

                        {
                          moment(complaint.createdAt).format(
                            'DD MMM YYYY | hh:mm'
                          )
                        }


                      </TableCell>

                      <TableCell>{complaint.username}</TableCell>
                      <TableCell>{complaint.sensor}</TableCell>

                      <TableCell>
                        <Label color={complaintStatusColors[complaint.status]}>
                          {complaint.status}
                        </Label>
                      </TableCell>
                      {isComplaintSelected ? (
                        <TableCell align="left">
                          <IconButton
                            onClick={
                              () => history.push(`/admin/management/complaints/${complaint_Id}`)
                            }
                          >
                            <SvgIcon fontSize="small">
                              <ArrowRightIcon />
                            </SvgIcon>
                          </IconButton>
                        </TableCell>
                      ) : (
                        <TableCell align="left">
                          <IconButton
                            component={RouterLink}
                            to="/admin/management/complaints/1"
                            disabled
                          >
                            <SvgIcon fontSize="small">
                              <ArrowRightIcon />
                            </SvgIcon>
                          </IconButton>
                          {' '}

                        </TableCell>

                      )}
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </Box>
        </PerfectScrollbar>
        <TablePagination
          component="div"
          count={complaints.length}
          onChangePage={handlePageChange}
          onChangeRowsPerPage={handleLimitChange}
          page={page}
          rowsPerPage={limit}
          rowsPerPageOptions={[5, 10, 25]}
        />
      </Card>
      <BulkOperations
        open={enableBulkOperations}
        selected={selectedComplaints}
      />
    </div>
  );
}

Results.propTypes = {
  className: PropTypes.string,
  complaints: PropTypes.array
};

Results.defaultProps = {
  complaints: []
};

export default Results;
