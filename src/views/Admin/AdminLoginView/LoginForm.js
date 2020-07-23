import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  useHistory
} from 'react-router';
import clsx from 'clsx';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import {
  Box,
  Button,
  TextField,
  FormHelperText,
  makeStyles
} from '@material-ui/core';
import {
  adminLogin
} from 'src/store/actions/adminAction';

const useStyles = makeStyles(() => ({
  root: {}
}));

function LoginForm({ className, onSubmitSuccess, ...rest }) {
  const classes = useStyles();
  const error = useSelector((state) => state.error.message);
  // const errMessage = error.map((f) => f.message);
  const dispatch = useDispatch();
  // console.log("err", error.message);

  return (
    <Formik
      initialValues={{
        username: '',
        password: ''
      }}
      validationSchema={Yup.object().shape({
        username: Yup.string().max(255).required('User Name is required'),
        password: Yup.string().max(255).required('Password is required')
      })}
      onSubmit={async (values, {
        setErrors,
        setStatus,
        setSubmitting
      }) => {
        try {
          await dispatch(adminLogin(values.username, values.password));
          onSubmitSuccess();
        } catch (err) {
          setStatus({ success: false });
          setErrors({ submit: err });
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
          noValidate
          className={clsx(classes.root, className)}
          onSubmit={handleSubmit}
          {...rest}
        >
          <TextField
            error={Boolean(touched.username && errors.username)}
            fullWidth
            autoFocus
            helperText={touched.username && errors.username}
            label="User Name"
            margin="normal"
            name="username"
            onBlur={handleBlur}
            onChange={handleChange}
            type="text"
            value={values.username}
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
              Log In
            </Button>
            {errors.submit && (
              <Box mt={3}>
                <FormHelperText error>
                  {error}
                </FormHelperText>
              </Box>
            )}
          </Box>
        </form>
      )}
    </Formik>
  );
}

LoginForm.propTypes = {
  className: PropTypes.string,
  onSubmitSuccess: PropTypes.func
};

LoginForm.defaultProps = {
  onSubmitSuccess: () => {}
};

export default LoginForm;
