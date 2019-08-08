import React from 'react';
import { Link } from 'react-router-dom'
const ConfDialog = props => {

  return (
    <div className="overlay">
      <div className="dialog">
        {props.message}
      </div>
    </div>
  );
};

export default ConfDialog;