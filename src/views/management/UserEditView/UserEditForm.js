import React, { useState } from 'react';
import {
  useHistory,
  useParams
} from 'react-router-dom';
import axios from 'axios';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { useSnackbar } from 'notistack';
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Switch,
  TextField,
  Typography,
  makeStyles,

} from '@material-ui/core';
import wait from 'src/utils/wait';

const useStyles = makeStyles(() => ({
  root: {}
}));


function UserEditForm({
  className,
  user,
  ...rest
}) {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const history = useHistory();
  const { userId } = useParams();

  const handleViewUser = () => {
    history.push('/admin/welcome');
  };

  return (
    <Formik
      initialValues={{
        country: user.location.country || '',
        email: user.email || '',
        fullName: user.username || '',
        phone: user.phone || '',
        state: user.location.state || '',
        region: user.location.region || ''

      }}
      validationSchema={Yup.object().shape({
        country: Yup.string().max(255),
        email: Yup.string().email('Must be a valid email').max(255),
        fullName: Yup.string().max(255),
        phone: Yup.string().max(15),
        state: Yup.string().max(255),
        region: Yup.string().max(255)
      })}
      onSubmit={async (values, {
        resetForm,
        setErrors,
        setStatus,
        setSubmitting
      }) => {
        try {
          const body = {
            username: values.fullName,
            email: values.email,
            phone: values.phone,
            country: values.country,
            region: values.region,
            state: values.state
          };
          const config = {
            headers: {
              'content-type': 'application/json'
            }
          };
          const res = axios.post(`http://localhost:5000/user/update/${userId}`, body, config);
          await wait(300);
          resetForm();
          setStatus({ success: true });
          setSubmitting(false);

          enqueueSnackbar('Customer updated', {
            //
            variant: 'success',
            // autoHideDuration: 1000,
            action: <Button onClick={
                handleViewUser
              }
            >
              see all
            </Button>,
          });
        } catch (error) {
          setStatus({ success: false });
          setErrors({ submit: error.message });
          setSubmitting(false);
        }
      }}
    >
      {({
        errors,
        handleBlur,
        handleChange,
        handleSubmit,
        isSubmitting,
        touched,
        values
      }) => (
        <form
          className={clsx(classes.root, className)}
          onSubmit={handleSubmit}
          {...rest}
        >

          <Card>
            <CardContent>

              <Grid
                container
                spacing={3}
              >
                <Grid
                  item
                  md={6}
                  xs={12}
                >
                  <TextField
                    error={Boolean(touched.email && errors.email)}
                    fullWidth
                    helperText={touched.email && errors.email}
                    label="Email address"
                    name="email"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    required
                    value={values.email}
                    variant="outlined"
                  />
                </Grid>
                <Grid
                  item
                  md={6}
                  xs={12}
                >
                  <TextField
                    error={Boolean(touched.fullName && errors.fullName)}
                    fullWidth
                    helperText={touched.fullName && errors.fullName}
                    label="Full name"
                    name="fullName"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    required
                    value={values.fullName}
                    variant="outlined"
                  />
                </Grid>
                <Grid
                  item
                  md={6}
                  xs={12}
                >
                  <TextField
                    error={Boolean(touched.phone && errors.phone)}
                    fullWidth
                    helperText={touched.phone && errors.phone}
                    label="Phone number"
                    name="phone"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.phone}
                    variant="outlined"
                  />
                </Grid>
                <Grid
                  item
                  md={6}
                  xs={12}
                >
                  <TextField
                    error={Boolean(touched.state && errors.state)}
                    fullWidth
                    helperText={touched.state && errors.state}
                    label="State/Region"
                    name="state"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.state}
                    variant="outlined"
                  />
                </Grid>
                <Grid
                  item
                  md={6}
                  xs={12}
                >
                  <TextField
                    error={Boolean(touched.country && errors.country)}
                    fullWidth
                    helperText={touched.country && errors.country}
                    label="Country"
                    name="country"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.country}
                    variant="outlined"
                  />
                </Grid>
                {/* <Grid
                  item
                  md={6}
                  xs={12}
                >
                  <TextField
                    error={Boolean(touched.address1 && errors.address1)}
                    fullWidth
                    helperText={touched.address1 && errors.address1}
                    label="Address 1"
                    name="address1"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.address1}
                    variant="outlined"
                  />
                </Grid> */}
                {/* <Grid
                  item
                  md={6}
                  xs={12}
                >
                  <TextField
                    error={Boolean(touched.address2 && errors.address2)}
                    fullWidth
                    helperText={touched.address2 && errors.address2}
                    label="Address 2"
                    name="address2"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.address2}
                    variant="outlined"
                  />
                </Grid> */}
                <Grid item />
                {/* <Grid
                  item
                  md={6}
                  xs={12}
                >
                  <Typography
                    variant="h5"
                    color="textPrimary"
                  >
                    Email Verified
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                  >
                    Disabling this will automatically send the user a verification
                    email
                  </Typography>
                  <Switch
                    checked={values.verified}
                    color="secondary"
                    edge="start"
                    name="verified"
                    onChange={handleChange}
                    value={values.verified}
                  />
                </Grid> */}
                {/* <Grid
                  item
                  md={6}
                  xs={12}
                >
                  <Typography
                    variant="h5"
                    color="textPrimary"
                  >
                    Discounted Prices
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                  >
                    This will give the user discountedprices for all products
                  </Typography>
                  <Switch
                    checked={values.discountedPrices}
                    color="secondary"
                    edge="start"
                    name="discountedPrices"
                    onChange={handleChange}
                    value={values.discountedPrices}
                  />
                </Grid> */}
              </Grid>
              <Box mt={2}>

                <Button
                  variant="contained"
                  color="secondary"
                  type="submit"
                  disabled={isSubmitting}

                >
                  Update User
                </Button>
              </Box>
            </CardContent>
          </Card>
        </form>
      )}
    </Formik>
  );
}

UserEditForm.propTypes = {
  className: PropTypes.string,
  user: PropTypes.object.isRequired
};

export default UserEditForm;
