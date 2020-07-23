import React from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import * as Yup from 'yup';
import {
  Formik
} from 'formik';
import {
  useSnackbar
} from 'notistack';
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  FormHelperText,
  makeStyles,

} from '@material-ui/core';
import wait from 'src/utils/wait';

const useStyles = makeStyles(() => ({
  root: {}
}));


function UserCreateForm({
  className,
  ...rest
}) {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const history = useHistory();
  return (
    <Formik
      initialValues={
      {
        country: '',
        email: '',
        fullName: '',
        sensorName: '',
        password: '',
        phone: '',
        state: '',
        region: ''

      }
    }
      validationSchema={
      Yup.object().shape({
        country: Yup.string().max(255),
        sensorName: Yup.string().lowercase().max(255).required(),
        email: Yup.string().email('Must be a valid email').max(255).required(),
        fullName: Yup.string().max(255).required(),
        password: Yup.string().min(8).max(255).required(),
        phone: Yup.string().max(15).min(11),
        state: Yup.string().max(255),
        region: Yup.string().max(255)
      })
    }
      onSubmit={
      async (values, {
        resetForm,
        setErrors,
        setStatus,
        setSubmitting
      }) => {
        try {
          const body = {
            username: values.fullName,
            userid: values.sensorName,
            email: values.email,
            password: values.password,
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
          const res = await axios.post('http://localhost:5000/user/register', body, config);
          await wait(300);
          resetForm();
          setStatus({
            success: true
          });
          setSubmitting(false);

          enqueueSnackbar('User is Added', {
            //
            variant: 'success',
            // autoHideDuration: 1000,
            action: <Button onClick={() => { history.push('/admin/welcome'); }}>See All</Button>
          });
        } catch (error) {
          console.log(error.response.data);
          setStatus({
            success: false
          });
          setErrors({
            submit: error.response.data
          });
          setSubmitting(false);
        }
      }
    }
    >
      {
      ({
        errors,
        handleBlur,
        handleChange,
        handleSubmit,
        isSubmitting,
        touched,
        values
      }) => (
        <form
          className={
          clsx(classes.root, className)
        }
          onSubmit={
          handleSubmit
        }
          {
          ...rest
        }
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
                    error={Boolean(touched.sensorName && errors.sensorName)}
                    fullWidth
                    helperText={touched.sensorName && errors.sensorName}
                    label="Sensor name"
                    name="sensorName"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    required
                    value={values.sensorName}
                    variant="outlined"
                  />
                </Grid>
                {' '}
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
                {' '}
                <Grid
                  item
                  md={6}
                  xs={12}
                >
                  <TextField
                    error={Boolean(touched.password && errors.password)}
                    fullWidth
                    helperText={touched.password && errors.password}
                    type="password"
                    label="Password"
                    name="password"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    required
                    value={values.password}
                    variant="outlined"
                  />
                </Grid>
                {' '}
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
                {' '}
                <Grid
                  item
                  md={6}
                  xs={12}
                >
                  <TextField
                    error={Boolean(touched.state && errors.state)}
                    fullWidth
                    helperText={touched.state && errors.state}
                    label="State"
                    name="state"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.state}
                    variant="outlined"
                  />
                </Grid>
                {' '}
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
                {' '}
                <Grid
                  item
                  md={6}
                  xs={12}
                >
                  <TextField
                    error={Boolean(touched.region && errors.region)}
                    fullWidth
                    helperText={touched.region && errors.region}
                    label="Region"
                    name="region"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.region}
                    variant="outlined"
                  />
                </Grid>


              </Grid>
              <Box mt={2}>

                <Button
                  variant="contained"
                  color="secondary"
                  type="submit"
                  disabled={isSubmitting}
                >
                  Create User
                  {' '}
                </Button>
                {
                  errors.submit && (
                  <Box mt={3}>
                    <FormHelperText error>
                      {errors.submit}
                    </FormHelperText>
                    {' '}
                  </Box>
                  )
                }
              </Box>
              {' '}

            </CardContent>
          </Card>
          {' '}

        </form>
      )
    }
    </Formik>
  );
}

UserCreateForm.propTypes = {
  className: PropTypes.string

};

export default UserCreateForm;
