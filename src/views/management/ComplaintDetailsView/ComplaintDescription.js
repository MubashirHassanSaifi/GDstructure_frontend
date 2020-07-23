import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Box,
  Card,
  CardHeader,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  makeStyles
} from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {}
}));

function ComplaintDesc({ complaint, className, ...rest }) {
  const classes = useStyles();
  console.log(complaint);
  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardHeader title="complaint description" />
      <Divider />
      <PerfectScrollbar>
        <Box minWidth={700}>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell>
                  {
                    complaint.description
                  }
                </TableCell>
              </TableRow>

            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
    </Card>
  );
}

ComplaintDesc.propTypes = {
  className: PropTypes.string,
  complaint: PropTypes.object.isRequired
};

export default ComplaintDesc;
