import React from 'react';
import {
  useSelector
} from 'react-redux';
import {
  Redirect
} from 'react-router-dom';
import PropTypes from 'prop-types';

function AdminAuthGuard({
  children
}) {
  const admin = useSelector((state) => state.admin);

  if (!admin.admin) {
    return <Redirect to="/admin-login" />;
  }

  return children;
}

AdminAuthGuard.propTypes = {
  children: PropTypes.any
};

export default AdminAuthGuard;
