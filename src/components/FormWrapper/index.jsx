import React from "react";

import './styles.scss';

const FormWrapper = ({ children, handleSubmit, ...rest }) => {
  return (
    <form onSubmit={handleSubmit} { ...rest }>
      { children }
    </form>
  )
};

export default FormWrapper;
