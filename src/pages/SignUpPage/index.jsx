import React from "react";

import './styles.scss';
import PhoneImg from "../../assets/undraw_personalization.svg";

import SignUpForm from "../../components/SignUpForm";



const SignUpPage = () => {
  return (
    <div className="full-height-wrapper">
      <div className="img">
        <img src={PhoneImg} alt=""/>
      </div>
      <SignUpForm/>
    </div>
  );
};


export default SignUpPage
