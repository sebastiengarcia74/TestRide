import React from 'react';

const NextButton = ({ onClick }) => {
  return (
    <button className="btn btn-primary btn-xs" onClick={onClick}>Next</button>
  );
};

export default NextButton;