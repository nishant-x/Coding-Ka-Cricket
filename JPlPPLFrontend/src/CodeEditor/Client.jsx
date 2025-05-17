/* eslint-disable react/prop-types */
import React from 'react';
import Avatar from 'react-avatar';

function Client({ username }) {
  return (
    <div className="d-flex align-items-center mb-3">
      <Avatar
        name={username.toString()}
        size="50"
        round="14px"
        className="me-2"
      />
      <span>{username.toString()}</span>
    </div>
  );
}

export default Client;
