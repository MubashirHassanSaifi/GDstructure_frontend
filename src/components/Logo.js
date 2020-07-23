import React from 'react';

function Logo(props) {
  return (
    <img
      alt="Logo"
      src="/static/logo.png"
      {...props}
      width="200px"
      height="70px"
    />
  );
}

export default Logo;
