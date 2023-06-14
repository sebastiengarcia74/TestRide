import React from 'react';

const PreviousButton = ({ onClick }) => {
  return (
    <button className="btn btn-primary btn-xs" onClick={onClick}>Previous</button>
  );
};

export default PreviousButton;
