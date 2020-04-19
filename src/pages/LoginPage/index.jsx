import React from 'react';
import LoginForm from "../../components/LoginForm/";
import PhoneImg from '../../assets/undraw_personalization.svg';
import WaveImg from '../../assets/Liquid-Cheese.svg';

import './styles.scss';



const LoginPage = () => {
  return (
    <div className="full-height-wrapper">
      <img src={WaveImg} alt="" className="wave"/>
      <div className="img">
        <img src={PhoneImg} alt=""/>
      </div>
      <LoginForm/>
    </div>
  )
};


export default LoginPage;
