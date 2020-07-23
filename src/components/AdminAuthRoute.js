import React from 'react';
import {
  useSelector
} from 'react-redux';
import {
  Redirect
} from 'react-router-dom';
import PropTypes from 'prop-types';

function AuthRoute({
  component: Component,
  render,
  ...rest
}) {
  const admin = useSelector((state) => state.admin);

  if (!admin.admin) {
    return <Redirect to="/login-admin" />;
  }

  return render ? render({
    ...rest
  }) : (
    <Component {
    ...rest
  }
    />
  );
}

AuthRoute.propTypes = {
  component: PropTypes.any,
  render: PropTypes.func
};

export default AuthRoute;
