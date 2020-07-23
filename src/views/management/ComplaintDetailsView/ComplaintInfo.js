/* eslint-disable no-underscore-dangle */
import React, { useState } from 'react';
import { Link as RouterLink, useParams, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import moment from 'moment';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import {
  Button,
  Card,
  CardActions,
  CardHeader,
  Divider,
  Link,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TextField,
  makeStyles,
  SvgIcon
} from '@material-ui/core';
import {
  Edit as EditIcon
} from 'react-feather';
import ReceiptIcon from '@material-ui/icons/ReceiptOutlined';


const useStyles = makeStyles((theme) => ({
  root: {},
  actionIcon: {
    marginRight: theme.spacing(1)
  }
}));

const statusOptions = ['Pending', 'Completed', 'Rejected'];

function ComplaintInfo({ complaint, className, ...rest }) {
  const classes = useStyles();
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();
  const { complaintId } = useParams();
  const [status, setStatus] = useState(statusOptions[0]);
  const [selectedItems, setSelectedItems] = useState([complaintId]);
  const handleChange = (event) => {
    event.persist();
    setStatus(event.target.value);
  };

  const handleStatus = async () => {
    const body = {
      status,
      selectedItems
    };
    const config = {
      headers: {
        'content-type': 'application/json'
      }
    };
    try {
      const res = await axios.post('http://localhost:5000/admin/complaintStatus', body, config);
      enqueueSnackbar(res.data, {
        variant: 'success'
      });
      history.push('/admin/management/complaints');
    } catch (err) {
      console.log(err);
    }
  };


  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardHeader title="complaint info" />
      <Divider />
      <Table>
        <TableBody>
          <TableRow>
            <TableCell>User</TableCell>
            <TableCell>
              <Link
                component={RouterLink}
                to="/admin/management/customers/1"
              >
                {/* {complaint.userid} */}
              </Link>
              <div>{complaint.username}</div>
              {/* <div>{complaint.customer.country}</div> */}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              ID
            </TableCell>
            <TableCell>
              {complaint._id.split('-').shift()}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              Subject
            </TableCell>
            <TableCell>
              {complaint.subject}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Registered</TableCell>
            <TableCell>
              {moment(complaint.createdAt).format('LLLL')}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Status</TableCell>
            <TableCell>
              <TextField
                fullWidth
                name="option"
                onChange={handleChange}
                select
                SelectProps={{ native: true }}
                value={status}
                variant="outlined"
              >
                {statusOptions.map((option) => (
                  <option
                    key={option}
                    value={option}
                  >
                    {option}
                  </option>
                ))}
              </TextField>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <CardActions>
        <Button
          color="secondary"
          variant="outlined"
          onClick={handleStatus}
        >
          <SvgIcon
            fontSize="small"
            className={
             classes.actionIcon
           }
          >
            <EditIcon />
          </SvgIcon>
          Change Status
        </Button>
      </CardActions>
    </Card>
  );
}

ComplaintInfo.propTypes = {
  className: PropTypes.string,
  complaint: PropTypes.object.isRequired
};

export default ComplaintInfo;
