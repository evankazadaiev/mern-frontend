import React from "react";
import './style.scss'

const Loader = () => (
  <div className="loader">
    <span className="loader__ball loader__ball--1" />
    <span className="loader__ball loader__ball--2" />
    <span className="loader__ball loader__ball--3" />
  </div>
);

export default React.memo(Loader);
