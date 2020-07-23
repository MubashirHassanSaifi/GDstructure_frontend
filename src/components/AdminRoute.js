import React from 'react';
import {
  useSelector
} from 'react-redux';
import {
  Redirect
} from 'react-router-dom';
import PropTypes from 'prop-types';

function AdminAuthRoute({
  component: Component,
  render,
  ...rest
}) {
  const admin = useSelector((state) => state.admin);

  if (!admin.admin) {
    return <Redirect to="/admin-login" />;
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

AdminAuthRoute.propTypes = {
  component: PropTypes.any,
  render: PropTypes.func
};

export default AdminAuthRoute;
