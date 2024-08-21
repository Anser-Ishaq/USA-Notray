import React from 'react';
import './Switch.css'; 

const Switch = () => {
  return (
    <div className="switch">
      <input id="toggle" type="checkbox" />
      <label className="toggle" htmlFor="toggle">
        <i></i>
      </label>
    </div>
  );
};

export default Switch;
