import React from 'react';
import { useSelector } from 'react-redux';
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
  CardHeader,
  Divider,
  FormHelperText,
  Grid,
  TextField,
  makeStyles
} from '@material-ui/core';
import wait from 'src/utils/wait';
import axios from 'axios';

const useStyles = makeStyles(() => ({
  root: {}
}));

function Security({ className, ...rest }) {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const user = useSelector((state) => state.account.user);

  return (
    <Formik
      initialValues={{
        oldpassword: '',
        newpassword: '',
        passwordConfirm: ''
      }}
      validationSchema={Yup.object().shape({
        oldpassword: Yup.string()
          .min(7, '')
          .max(255)
          .required('Required'),
        newpassword: Yup.string()
          .min(7, 'Must be at least 7 characters')
          .max(255)
          .required('Required'),

        passwordConfirm: Yup.string()
          .oneOf([Yup.ref('newpassword'), null], 'Passwords must match')
          .required('Required')
      })}
      onSubmit={async (values, {
        resetForm,
        setErrors,
        setStatus,
        setSubmitting
      }) => {
        try {
          // Make API request
          const body = {
            oldpassword: values.oldpassword,
            newpassword: values.newpassword,
            userid: user.userid
          };

          const config = {
            headers: {
              'content-type': 'application/json'
            }
          };
          const res = await axios.post(`${process.env.REACT_APP_URL}/user/changePassword`, body, config);
          if (res) {
            console.log(res);
          }
          await wait(500);
          resetForm();
          setStatus({ success: true });
          setSubmitting(false);
          enqueueSnackbar('Password updated', {
            variant: 'success'
          });
        } catch (error) {
          console.log(error.response.data);
          setStatus({ success: false });
          setErrors({ submit: error.response.data });
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
        <form onSubmit={handleSubmit}>
          <Card
            className={clsx(classes.root, className)}
            {...rest}
          >
            <CardHeader title="Change Password" />
            <Divider />
            <CardContent>
              <Grid
                container
                spacing={3}
              >
                <Grid
                  item
                  md={4}
                  sm={6}
                  xs={12}
                >
                  <TextField
                    error={Boolean(touched.oldpassword && errors.oldpassword)}
                    fullWidth
                    helperText={touched.oldpassword && errors.oldpassword}
                    label="Old Password"
                    name="oldpassword"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="password"
                    value={values.oldpassword}
                    variant="outlined"
                  />
                </Grid>
                <Grid
                  item
                  md={4}
                  sm={6}
                  xs={12}
                >
                  <TextField
                    error={Boolean(touched.newpassword && errors.newpassword)}
                    fullWidth
                    helperText={touched.newpassword && errors.newpassword}
                    label="new Password"
                    name="newpassword"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="password"
                    value={values.newpassword}
                    variant="outlined"
                  />
                </Grid>
                <Grid
                  item
                  md={4}
                  sm={6}
                  xs={12}
                >
                  <TextField
                    error={Boolean(touched.passwordConfirm && errors.passwordConfirm)}
                    fullWidth
                    helperText={touched.passwordConfirm && errors.passwordConfirm}
                    label="Password Confirmation"
                    name="passwordConfirm"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="password"
                    value={values.passwordConfirm}
                    variant="outlined"
                  />
                </Grid>
              </Grid>
              {errors.submit && (
                <Box mt={3}>
                  <FormHelperText error>
                    {errors.submit}
                  </FormHelperText>
                </Box>
              )}
            </CardContent>
            <Divider />
            <Box
              p={2}
              display="flex"
              justifyContent="flex-end"
            >
              <Button
                color="secondary"
                enabled={isSubmitting}
                type="submit"
                variant="contained"
              >
                Change Password
              </Button>
            </Box>
          </Card>
        </form>
      )}
    </Formik>
  );
}

Security.propTypes = {
  className: PropTypes.string
};

export default Security;
