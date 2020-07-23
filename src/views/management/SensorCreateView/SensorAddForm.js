import React, { useEffect, useCallback, useState } from 'react';
import { useHistory } from 'react-router';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import axios from 'axios';
import * as Yup from 'yup';
import { Formik } from 'formik';
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import { useSnackbar } from 'notistack';
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

// const categories = [
//   {
//     id: 'shirts',
//     name: 'Shirts'
//   },
//   {
//     id: 'phones',
//     name: 'Phones'
//   },
//   {
//     id: 'cars',
//     name: 'Cars'
//   }
// ];

const useStyles = makeStyles(() => ({
  root: {},
  editor: {
    '& .ql-editor': {
      height: 400
    }
  }
}));


function ProductCreateForm({ className, ...rest }) {
  const classes = useStyles();
  const history = useHistory();
  const [categories, setCategories] = useState([]);
  const [options, setOptions] = useState(null);
  const [userid, setUserid] = useState(null);
  const [username, setUsername] = useState(null);
  const [loading, setLoading] = useState(true);
  const isMountedRef = useIsMountedRef();
  const { enqueueSnackbar } = useSnackbar();
  const getSensors = useCallback(() => {
    axios
      .get('http://localhost:5000/user/sensorAssignedUsers')
      .then((response) => {
        if (isMountedRef.current) {
          setCategories(response.data.sensor);
          // setColumns(response.data.columns);
          // setLoading(false);
        }
      });
  }, [isMountedRef]);

  useEffect(() => {
    getSensors();
  }, []);


  const handldChangeOption = async (event) => {
    setOptions(event.target.value);
    const sensor = event.target.value;
    console.log(sensor);

    const body = {
      sensor
    };
    const config = {
      headers: {
        'content-type': 'application/json'
      }
    };
    try {
      const res = await axios.post('http://localhost:5000/user/sensorAgainstUser', body, config);
      console.log('response', res);
      setUserid(res.data.id);
      setUsername(res.data.name);
      setLoading(false);
    } catch (err) {
      console.log(err.response);
    }
  };


  return (
    <Formik
      initialValues={{
        sensor: '',
        userCode: '',
        userName: '',
      }}
      validationSchema={Yup.object().shape({
        sensor: Yup.string().max(255)
      })}
      onSubmit={async (values, {
        setErrors,
        setStatus,
        setSubmitting
      }) => {
        const body = {
          sensorName: options
        };
        const config = {
          headers: {
            'content-type': 'application/json'
          }
        };
        try {
          const res = await axios.post('http://localhost:5000/energysensor/add', body, config);
          console.log(res);
          setStatus({ success: true });
          setSubmitting(false);
          enqueueSnackbar(res.data, {
            variant: 'success'
          });
          history.push('/admin/management/sensors');
        } catch (err) {
          console.log(err.response.data);
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
              {/* <Card>
                <CardContent>
                  <TextField
                    error={Boolean(touched.name && errors.name)}
                    fullWidth
                    helperText={touched.name && errors.name}
                    label="Product Name"
                    name="name"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.name}
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
              </Card> */}
              {/* <Box mt={3}>
                <Card>
                  <CardHeader title="Upload Images" />
                  <Divider />
                  <CardContent>
                    <FilesDropzone />
                  </CardContent>
                </Card>
              </Box> */}
              {/* <Box mt={3}>
                <Card>
                  <CardHeader title="Prices" />
                  <Divider />
                  <CardContent>
                    <Grid
                      container
                      spacing={3}
                    >
                      <Grid item xs={12} md={6}>
                        <TextField
                          error={Boolean(touched.price && errors.price)}
                          fullWidth
                          helperText={touched.price && errors.price
                            ? errors.price
                            : 'If you have a sale price this will be shown as old price'}
                          label="Price"
                          name="price"
                          type="number"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.price}
                          variant="outlined"
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <TextField
                          error={Boolean(touched.salePrice && errors.salePrice)}
                          fullWidth
                          helperText={touched.salePrice && errors.salePrice}
                          label="Sale price"
                          name="salePrice"
                          type="number"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.salePrice}
                          variant="outlined"
                        />
                      </Grid>
                    </Grid>
                    <Box mt={2}>
                      <FormControlLabel
                        control={(
                          <Checkbox
                            checked={values.isTaxable}
                            onChange={handleChange}
                            value={values.isTaxable}
                            name="isTaxable"
                          />
                        )}
                        label="Product is taxable"
                      />
                    </Box> */}
              {/* <Box mt={2}>
                      <FormControlLabel
                        control={(
                          <Checkbox
                            checked={values.includesTaxes}
                            onChange={handleChange}
                            value={values.includesTaxes}
                            name="includesTaxes"
                          />
                        )}
                        label="Price includes taxes"
                      />
                    </Box> */}
              {/* </CardContent> */}
              {/* </Card> */}
              {/* </Box> */}
            </Grid>
            <Grid
              item
              xs={12}
              lg={6}
            >
              <Card>
                <CardHeader title="Select Sensor Name" />
                <Divider />
                <CardContent>
                  <TextField
                    fullWidth
                    autoFocus="true"
                    label="Sensor"
                    name="Sensor"
                    onChange={
                      handldChangeOption
                    }
                    select
                    SelectProps={{ native: true }}
                    defaultValue=" "
                    value={options}
                    variant="outlined"
                  >
                    <option>
                      Select Sensor
                    </option>
                    {categories.map((category) => (
                      <option
                        key={category.id}
                        value={category.name}
                      >
                        {category.name}
                      </option>
                    ))}

                  </TextField>
                  <Box mt={2}>
                    <TextField
                      // error={Boolean(touched.userCode && errors.userCode)}
                      fullWidth
                      // helperText={touched.userCode && errors.userCode}
                      label="User Id"
                      name="userCode"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      defaultValue=" "
                      value={userid}
                      variant="outlined"
                      disabled={loading}
                      InputProps={
                         {
                           readOnly: true,
                         }
                       }

                    />
                  </Box>
                  <Box mt={2}>
                    <TextField
                      // focused="true"
                      // error={Boolean(touched.userName && errors.userName)}
                      fullWidth
                      helperText={touched.userName && errors.userName}
                      label="User Name"
                      name="userName"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      defaultValue=" "
                      value={username}
                      variant="outlined"
                      disabled={loading}
                      InputProps={
                        {
                          readOnly: true,
                        }
                      }

                    />
                  </Box>
                </CardContent>
              </Card>
            </Grid>
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
              Add Sensor
            </Button>
          </Box>
        </form>
      )}
    </Formik>
  );
}

ProductCreateForm.propTypes = {
  className: PropTypes.string
};

export default ProductCreateForm;
