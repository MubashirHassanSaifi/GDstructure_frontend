import React from 'react';
import { useDispatch } from 'react-redux';
import clsx from 'clsx';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import {
  Box,
  Button,
  TextField,
  makeStyles
} from '@material-ui/core';
import { register } from 'src/store/actions/accountActions';

const useStyles = makeStyles(() => ({
  root: {}
}));

function RegisterForm({ className, onSubmitSuccess, ...rest }) {
  const classes = useStyles();
  const dispatch = useDispatch();

  return (
    <Formik
      initialValues={{
        username: '',
        userid: '',
        email: '',
        password: '',
      }}
      validationSchema={Yup.object().shape({
        username: Yup.string().max(255).required('User name is required'),
        userid: Yup.string().max(255).required('UserID is required'),
        email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
        password: Yup.string().min(7).max(255).required('Password is required'),

      })}
      onSubmit={async (values, {
        setErrors,
        setStatus,
        setSubmitting
      }) => {
        try {
          await dispatch(register(values));
          onSubmitSuccess();
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

          <TextField
            error={Boolean(touched.username && errors.username)}
            fullWidth
            helperText={touched.username && errors.username}
            label="User Name"
            margin="normal"
            name="username"
            onBlur={handleBlur}
            onChange={handleChange}
            type="username"
            value={values.username}
            variant="outlined"
          />
          <TextField
            error={Boolean(touched.userid && errors.userid)}
            fullWidth
            helperText={touched.userid && errors.userid}
            label="UserID"
            margin="normal"
            name="userid"
            onBlur={handleBlur}
            onChange={handleChange}
            type="userid"
            value={values.userid}
            variant="outlined"
          />
          <TextField
            error={Boolean(touched.email && errors.email)}
            fullWidth
            helperText={touched.email && errors.email}
            label="Email Address"
            margin="normal"
            name="email"
            onBlur={handleBlur}
            onChange={handleChange}
            type="email"
            value={values.email}
            variant="outlined"
          />
          <TextField
            error={Boolean(touched.password && errors.password)}
            fullWidth
            helperText={touched.password && errors.password}
            label="Password"
            margin="normal"
            name="password"
            onBlur={handleBlur}
            onChange={handleChange}
            type="password"
            value={values.password}
            variant="outlined"
          />

          <Box mt={2}>
            <Button
              color="secondary"
              enabled={isSubmitting}
              fullWidth
              size="large"
              type="submit"
              variant="contained"
            >
              Create account
            </Button>
          </Box>
        </form>
      )}
    </Formik>
  );
}

RegisterForm.propTypes = {
  className: PropTypes.string,
  onSubmitSuccess: PropTypes.func
};

RegisterForm.default = {
  onSubmitSuccess: () => {}
};

export default RegisterForm;
