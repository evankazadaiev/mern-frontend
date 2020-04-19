import React, {useEffect, useMemo, useState} from "react";

import { useField } from "formik";

import './styles.scss';

const FormInput = ({ name, strict = false, className, icon, title, style, value, ...props }) => {
  const [field, meta] = useField(name);
  const [focus, setFocus] = useState(false);
  
  useEffect(() => {
    if(value && value.length && !focus) setFocus(true);
  }, []);
  
  const onFocusHandler = (e) => {
    setFocus(true);
  };
  const onBlurHandler = (e) => {
    const { onBlur } = field;
    onBlur(e);
    if(e.target.value.length <= 0) {
      setFocus(false)
    }
  };
  const hasError = meta.touched && meta.error;
  
  const inputClasses = useMemo(() => `input-div ${focus ? 'focus' : ''} ${hasError ? 'error-field' : ''} ${className}`,
    [className, hasError, focus]);
  
  
  return (
    <div className={inputClasses} style={style}>
      <div className="i"><i className={icon}/></div>
      <div>
        <h5>{ hasError ? meta.error : title }</h5>
        <input
          { ...field }
          { ...props }
          onFocus={onFocusHandler}
          onBlur={onBlurHandler}
          className="input"
        />
      </div>
    </div>
  );
};

export default FormInput;


/*
*     */
