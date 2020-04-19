import React, {useCallback, useContext, useState} from "react";
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';


import AvatarImg from '../../assets/undraw_profile_pic_ic5t.svg';

import FormWrapper from '../FormWrapper/index';

import FormInput from "../UI/FormInput";
import Row from "../UI/Row";
import CustomButton from "../UI/CustomButton";

import {Formik, Form, Field} from 'formik';
import LOGIN_SCHEMA from "../../validation/LoginSchema";

import { signInStart } from "../../redux/auth/actions";
import { authRequestsLoading } from '../../redux/progress/selectors';

import './styles.scss';

const LoginForm = ({ signInStart, loading }) => {
    const history = useHistory();
    const handleSubmit = (values) => signInStart(values);

    return (
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={LOGIN_SCHEMA}
        onSubmit={handleSubmit}>
        { ({ isSubmitting }) => {
          return (
            <div className="login-wrapper">
              <Form>
                <img className="avatar" src={AvatarImg} alt=""/>
                <h2>Welcome</h2>
                  <Row>
                    <Field
                    type="email"
                    name="email"
                    title="Email"
                    icon="fa fa-envelope"
                    as={FormInput}
                    />
                  </Row>
          
                  <Row>
                    <Field
                      as={FormInput}
                      icon="fa fa-key"
                      type="password"
                      name="password"
                      title="Password"/>
                  </Row>
          
                  <a rel="noopener noreferrer" href="#">Forgot password?</a>
                  <a onClick={() => history.push('/sign-up')} rel="noopener noreferrer" href="#">Don't have an account?</a>
          
                  <Row className="centered">
                    <CustomButton
                      disabled={isSubmitting}
                      isLoading={loading}>Login</CustomButton>
                  </Row>
              </Form>
            </div>
          )
        } }
        
      </Formik>
    );
};


const mapStateToProps = state => ({
  loading: authRequestsLoading(state)
});

const mapDispatchToProps = dispatch => ({
  signInStart: (data) => dispatch(signInStart(data))
});


export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
