/* eslint-disable no-underscore-dangle */
import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Box,
  Button,
  Card,
  CardHeader,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
  makeStyles
} from '@material-ui/core';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import ReceiptIcon from '@material-ui/icons/ReceiptOutlined';

const useStyles = makeStyles((theme) => ({
  root: {},
  fontWeightMedium: {
    fontWeight: theme.typography.fontWeightMedium
  },
  buttonIcon: {
    marginRight: theme.spacing(1)
  }
}));

function SensorInfo({ className, ...rest }) {
  const classes = useStyles();
  const sensor = useSelector((state) => state.energy.energy);
  // const sensorName = sensor.map((f) => f.userid);
  // const Va = sensor.map((f) => f.Va);
  // const Vb = sensor.map((f) => f.Vb);
  // const Vc = sensor.map((f) => f.Vc);
  // const Ia = sensor.map((f) => f.Ia);
  // const Ib = sensor.map((f) => f.Ib);
  // const Ic = sensor.map((f) => f.Ic);
  // const Pf = sensor.map((f) => f.Pf);
  // const PR = sensor.map((f) => f.PR);
  // const PA = sensor.map((f) => f.PA);
  // const U = sensor.map((f) => f.U);
  // const iUpperLmt = sensor.map((f) => f.I_upperLmt);
  // const vUpperLmt = sensor.map((f) => f.V_upperLmt);
  // const vlowerLmt = sensor.map((f) => f.V_lowerLmt);


  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardHeader title="Sensor Info" />
      <Divider />
      {sensor == null ? (
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>
                <Typography
                  variant="h4"
                >
                  Sorry! no senor is assigned to this user
                </Typography>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      ) : (
        <Table>
          <TableBody>
            <TableRow>
              <TableCell className={
            classes.fontWeightMedium
          }
              >
                Sensor Name
                {' '}
              </TableCell>
              {' '}
              <TableCell>
                <Typography
                  variant="body2"
                  color="textSecondary"
                >
                  {
            sensor.userid
          }
                  {' '}
                  {
            ' '
          }

                </Typography>
              </TableCell>


            </TableRow>
            {' '}
            <TableRow>
              <TableCell className={
            classes.fontWeightMedium
          }
              >
                Phase A - Voltages
                {' '}
              </TableCell>
              {' '}
              <TableCell>
                <Typography
                  variant="body2"
                  color="textSecondary"
                >
                  {
            sensor.Va
          }
                  {' '}
                  {
            ' '
          }
                  {' '}
                  {
            'volt'
          }
                  {' '}

                </Typography>
              </TableCell>
              {' '}

            </TableRow>
            {' '}
            <TableRow>
              <TableCell className={
            classes.fontWeightMedium
          }
              >
                Phase B - Voltages
                {' '}
              </TableCell>

              <TableCell>
                <Typography
                  variant="body2"
                  color="textSecondary"
                >
                  {
            sensor.Vb
          }
                  {' '}
                  {
            ' '
          }
                  {' '}
                  {
            'volt'
          }

                </Typography>
              </TableCell>
            </TableRow>
            {' '}
            <TableRow>
              <TableCell className={
            classes.fontWeightMedium
          }
              >
                Phase C - Voltages
                {' '}
              </TableCell>
              {' '}
              <TableCell>
                <Typography
                  variant="body2"
                  color="textSecondary"
                >
                  {
            sensor.Vc
          }
                  {' '}
                  {
            ' '
          }
                  {' '}
                  {
            'volt'
          }
                  {' '}

                </Typography>
              </TableCell>
              {' '}

            </TableRow>
            {' '}
            <TableRow>
              <TableCell className={
            classes.fontWeightMedium
          }
              >
                Phase A - Current
                {' '}
              </TableCell>
              {' '}
              <TableCell>
                <Typography
                  variant="body2"
                  color="textSecondary"
                >
                  {
            sensor.Ia
          }
                  {' '}
                  {
            ' '
          }
                  {' '}
                  {
            'amp'
          }
                  {' '}

                </Typography>
              </TableCell>
              {' '}

            </TableRow>
            {' '}
            <TableRow>
              <TableCell className={
            classes.fontWeightMedium
          }
              >
                Phase B - Current
                {' '}
              </TableCell>
              {' '}
              <TableCell>
                <Typography
                  variant="body2"
                  color="textSecondary"
                >
                  {
            sensor.Ib
          }
                  {' '}
                  {
            ' '
          }
                  {' '}
                  {
            'amp'
          }
                  {' '}

                </Typography>
              </TableCell>
              {' '}

            </TableRow>
            {' '}
            <TableRow>
              <TableCell className={
            classes.fontWeightMedium
          }
              >
                Phase C - Current
                {' '}
              </TableCell>
              {' '}
              <TableCell>
                <Typography
                  variant="body2"
                  color="textSecondary"
                >
                  {
            sensor.Ic
          }
                  {' '}
                  {
            ' '
          }
                  {' '}
                  {
            'amp'
          }
                  {' '}

                </Typography>
              </TableCell>
              {' '}

            </TableRow>
            {' '}
            <TableRow>
              <TableCell className={
            classes.fontWeightMedium
          }
              >
                Units
                {' '}
              </TableCell>
              {' '}
              <TableCell>
                <Typography
                  variant="body2"
                  color="textSecondary"
                >
                  {
            sensor.U
          }
                  {' '}
                  {
            ' '
          }
                  {' '}
                  {
            'KWH'
          }
                  {' '}

                </Typography>
              </TableCell>
              {' '}

            </TableRow>
            {' '}
            <TableRow>
              <TableCell className={
            classes.fontWeightMedium
          }
              >
                Real Power
                {' '}
              </TableCell>
              {' '}
              <TableCell>
                <Typography
                  variant="body2"
                  color="textSecondary"
                >
                  {
            sensor.PR
          }
                  {' '}
                  {
            ' '
          }
                  {' '}

                </Typography>
              </TableCell>
              {' '}

            </TableRow>
            {' '}
            <TableRow>
              <TableCell className={
            classes.fontWeightMedium
          }
              >
                Apparent Power
                {' '}
              </TableCell>
              {' '}
              <TableCell>
                <Typography
                  variant="body2"
                  color="textSecondary"
                >
                  {
            sensor.PA
          }
                  {' '}
                  {
            ' '
          }

                </Typography>
              </TableCell>
              {' '}

            </TableRow>
            {' '}
            <TableRow>
              <TableCell className={
            classes.fontWeightMedium
          }
              >
                Power Factor

              </TableCell>

              <TableCell>
                <Typography
                  variant="body2"
                  color="textSecondary"
                >
                  {
            sensor.Pf
          }

                </Typography>
              </TableCell>


            </TableRow>
            {' '}
            <TableRow>
              <TableCell className={
            classes.fontWeightMedium
          }
              >
                Current Upper Limit

              </TableCell>

              <TableCell>
                <Typography
                  variant="body2"
                  color="textSecondary"
                >

                  {
            sensor.I_upperLmt
          }


                </Typography>
              </TableCell>
            </TableRow>
            {' '}
            <TableRow>
              <TableCell className={
            classes.fontWeightMedium
          }
              >
                Voltage Upper Limit
                {' '}
              </TableCell>

              <TableCell>
                <Typography
                  variant="body2"
                  color="textSecondary"
                >
                  {
            sensor.V_upperLmt
          }
                </Typography>
              </TableCell>
            </TableRow>
            {' '}

          </TableBody>
          {' '}

        </Table>
      )}

      {/* <Box
        p={1}
        display="flex"
        flexDirection="column"
        alignItems="flex-start"
      >
        <Button>
          <AttachMoneyIcon className={classes.buttonIcon} />
          Create Invoice
        </Button>
        <Button>
          <ReceiptIcon className={classes.buttonIcon} />
          Resend Due Invoices
        </Button>
      </Box> */}
    </Card>
  );
}

SensorInfo.propTypes = {
  className: PropTypes.string,
  // sensor: PropTypes.object.isRequired
};

export default SensorInfo;
