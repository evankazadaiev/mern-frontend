import React, { useState } from "react";

import './style.scss';


const ToggleSwitch = ({ handleChange, checked, name, disabled, label, ...rest }) => {
 
  
  return (
    <div className="switch-wrapper">
      <span className="switch-label">{ label }</span>
      <div className="toggle-switch small-switch">
        <input
          type="checkbox"
          className="toggle-switch-checkbox"
          checked={checked}
          onChange={handleChange}
          name={name}
          disabled={disabled}
          id={name}
          { ...rest }
        />
        <label className="toggle-switch-label" htmlFor={name}>
          <span className="toggle-switch-inner" />
          <span className="toggle-switch-switch" />
        </label>
      </div>
    </div>
  )
};

export default ToggleSwitch;
