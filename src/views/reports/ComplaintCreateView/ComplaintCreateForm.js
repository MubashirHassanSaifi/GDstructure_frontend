/* eslint-disable no-underscore-dangle */
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { useSnackbar } from 'notistack';
import ImageUploader from 'react-images-upload';
import axios from 'axios';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Checkbox,
  Divider,
  FormControlLabel,
  FormHelperText,
  Grid,
  Paper,
  TextField,
  Typography,
  makeStyles
} from '@material-ui/core';
import QuillEditor from 'src/components/QuillEditor';
import FilesDropzone from 'src/components/FilesDropzone';


const useStyles = makeStyles(() => ({
  root: {},
  editor: {
    '& .ql-editor': {
      height: 400
    }
  },
  image: {
    width: 130
  }
}));

function ComplaintCreateForm({ className, ...rest }) {
  const classes = useStyles();
  const [pictures, setPictures] = useState([]);
  const { enqueueSnackbar } = useSnackbar();
  const user = useSelector((state) => state.account.user);

  const onDrop = (picture) => {
    setPictures(pictures.concat(picture));
  };

  return (
    <Formik
      initialValues={{
        description: '',
        images: [],
        // subject: '',
        // sensor: user.userid,
        // username: user.username,
        // userid: user._id


      }}
      validationSchema={Yup.object().shape({
        description: Yup.string().max(5000),
        images: Yup.array(),
        subject: Yup.string().max(255).required(),
      })}
      onSubmit={async (values, {
        setErrors,
        setStatus,
        setSubmitting
      }) => {
        const body = {
          subject: values.subject,
          userid: user._id,
          username: user.username,
          sensor: user.userid,
          description: values.description
        };

        const config = {
          headers: {
            'content-type': 'application/json'
          }
        };

        try {
          const res = await axios.post('http://localhost:5000/admin/newComplaint', body, config);
          console.log(res);
          setStatus({ success: true });
          setSubmitting(false);
          enqueueSnackbar(res.data, {
            variant: 'success'
          });
        } catch (err) {
          setErrors({ submit: err.response.data });
          setStatus({ success: false });
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
        setFieldValue,
        touched,
        values
      }) => (
        <form
          onSubmit={handleSubmit}
          className={clsx(classes.root, className)}
          {...rest}
        >
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              xs={12}
              lg={8}
            >
              <Card>
                <CardContent>
                  <TextField
                    error={Boolean(touched.subject && errors.subject)}
                    fullWidth
                    helperText={touched.subject && errors.subject}
                    label="Complaint Subject"
                    name="subject"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.subject}
                    variant="outlined"
                  />
                  <Box
                    mt={3}
                    mb={1}
                  >
                    <Typography
                      variant="subtitle2"
                      color="textSecondary"
                    >
                      Description
                    </Typography>
                  </Box>
                  <Paper variant="outlined">
                    <QuillEditor
                      className={classes.editor}
                      value={values.description}
                      onChange={(value) => setFieldValue('description', value)}
                    />
                  </Paper>
                  {(touched.description && errors.description) && (
                    <Box mt={2}>
                      <FormHelperText error>
                        {errors.description}
                      </FormHelperText>
                    </Box>
                  )}
                </CardContent>
              </Card>
              <Box mt={3}>
                <Card>
                  <CardHeader title="Upload Snapshots" />
                  <Divider />
                  <CardContent>
                    {/* <FilesDropzone /> */}

                    <img
                      alt="Select file"
                      className={
                      classes.image
                      }
                      src="/static/images/undraw_add_file2_gvbb.svg"
                    />


                    <ImageUploader
                      withIcon={false}
                      buttonText="Choose images"
                      onChange={onDrop}
                      imgExtension={['.jpg', '.gif', '.png', '.gif']}
                      maxFileSize={5242880}
                    />
                  </CardContent>
                </Card>
              </Box>

            </Grid>
            {/* <Grid
              item
              xs={12}
              lg={4}
            >
              <Card>
                <CardHeader title="User" />
                <Divider />
                <CardContent>
                  <Box mt={2}>
                    <TextField
                      fullWidth
                      label="Senosor"
                      name="sensor"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={user.userid}
                      inputProps={
                        { readOnly: true }
                      }
                      variant="outlined"
                    />
                  </Box>

                  <Box mt={2}>
                    <TextField
                      fullWidth
                      label="User ID"
                      name="userid"
                      value={user._id}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      InputProps={
                        {
                          readOnly: true,
                        }
                      }
                      variant="outlined"
                    />
                  </Box>
                  <Box mt={2}>
                    <TextField
                      fullWidth
                      label="User Name"
                      name="username"
                      value={user.username}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      InputProps={
                        {
                          readOnly: true
                        }
                      }
                      variant="outlined"
                    />
                  </Box>
                </CardContent>
              </Card>
            </Grid> */}
          </Grid>
          {errors.submit && (
            <Box mt={3}>
              <FormHelperText error>
                {errors.submit}
              </FormHelperText>
            </Box>
          )}
          <Box mt={2}>
            <Button
              color="secondary"
              variant="contained"
              type="submit"
              disabled={isSubmitting}
            >
              Submit Complaint
            </Button>
          </Box>
        </form>
      )}
    </Formik>
  );
}

ComplaintCreateForm.propTypes = {
  className: PropTypes.string
};

export default ComplaintCreateForm;
