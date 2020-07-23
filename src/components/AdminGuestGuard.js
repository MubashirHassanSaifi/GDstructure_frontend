import React from 'react';
import {
  useSelector
} from 'react-redux';
import {
  Redirect
} from 'react-router-dom';
import PropTypes from 'prop-types';

function GuestGuard({
  children
}) {
  const admin = useSelector((state) => state.admin);

  if (admin.admin) {
    return <Redirect to="/admin/welcome" />;
  }

  return children;
}

GuestGuard.propTypes = {
  children: PropTypes.any
};

export default GuestGuard;
