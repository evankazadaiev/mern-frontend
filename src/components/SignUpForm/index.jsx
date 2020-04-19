import React from "react";
import { connect } from 'react-redux';
import { signUpStart } from '../../redux/auth/actions';
import { useHistory } from 'react-router-dom';

import SIGN_UP_SCHEMA from "../../validation/SignUpSchema";
import AvatarImg from "../../assets/undraw_profile_pic_ic5t.svg";
import Row from "../UI/Row";
import FormInput from "../UI/FormInput";
import CustomButton from "../UI/CustomButton";

import {Field, Form, Formik} from "formik";

import { authRequestsLoading } from '../../redux/progress/selectors';

import './styles.scss';

const SignUpForm = ({ signUp, isLoading }) => {
  const history = useHistory();
  
  return (
    <Formik
      initialValues={{ username: '', name: '', surname: '', email: '', password: '', passwordConfirmation: '' }}
      validationSchema={SIGN_UP_SCHEMA}
      onSubmit={(values) => signUp(values)}>
      { ({ isSubmitting }) => {
        return (
          <div className="login-wrapper">
            <Form>
              <img className="avatar" src={AvatarImg} alt=""/>
              <h2>Sign up</h2>
              <Row>
                <Field
                  type="text"
                  name="username"
                  title="Username"
                  icon="fa fa-user"
                  as={FormInput}
                />
              </Row>
  
              <Row>
                <Field
                  type="text"
                  name="email"
                  title="Email"
                  icon="fa fa-envelope"
                  as={FormInput}
                />
              </Row>
  
              <Row>
                <Field
                  type="text"
                  name="name"
                  title="Name"
                  icon="fa fa-user"
                  as={FormInput}
                />
              </Row>
  
              <Row>
                <Field
                  type="text"
                  name="surname"
                  title="Surname"
                  icon="fa fa-user"
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
  
              <Row>
                <Field
                  as={FormInput}
                  icon="fa fa-key"
                  type="password"
                  name="passwordConfirmation"
                  title="Confirm password"/>
              </Row>
              
              <a onClick={() => history.push('/login')} rel="noopener noreferrer" href="#">Back to login</a>
              
              <Row className="centered">
                <CustomButton disabled={isSubmitting} isLoading={isLoading}>Sign up</CustomButton>
              </Row>
            </Form>
          </div>
        )
      } }
    </Formik>
  )
};

const mapStateToProps = state => ({
  isLoading: authRequestsLoading(state),
})

const mapDispatchToProps = dispatch => ({
  signUp: (values) => dispatch(signUpStart(values))
});


export default connect(mapStateToProps, mapDispatchToProps)(SignUpForm);
