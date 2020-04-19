import React, { useMemo } from "react";
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

import {Formik, Form, Field} from 'formik';

import SIGN_UP_SCHEMA from "../../validation/SignUpSchema";
import UPDATE_USER_SCHEMA from "../../validation/UpdateUserSchema";
import MODES from '../../constants/modes';
import AvatarImg from "../../assets/undraw_profile_pic_ic5t.svg";

import Row from "../UI/Row";
import FormInput from "../UI/FormInput";
import CustomButton from "../UI/CustomButton";

import {useFormInitials} from "./services.hook";
import Loader from "../Loader/";

import { signUpStart } from '../../redux/auth/actions';
import { getUserByIdStart, updateUserStart } from '../../redux/users/actions';
import { createStructuredSelector } from "reselect";
import { selectUserFormInitials, selectError } from '../../redux/users/selectors';
import { authRequestsLoading } from '../../redux/progress/selectors';

import './style.scss'

const CreateEditUserForm = ({ mode, loading, getUserById, updateUser, signUp, userById, error }) => {
  const history = useHistory();
  const { userId, formInitials, ready } = useFormInitials(mode, userById, getUserById);

  const isCreateMode = useMemo(() => mode === MODES.CREATE, [mode]);

  const schema = isCreateMode ? SIGN_UP_SCHEMA : UPDATE_USER_SCHEMA;
  
  const handleSubmit = async (values) => {
    isCreateMode ? await signUp(values) : await updateUser(userId, values);
    return history.push('/');
  };
  
  const handleCancel = () => history.push('/');


  if (!isCreateMode && !ready) return <Loader/>;
  
  if (error) return null;
  
  return (
    <Formik
      enableReinitialize={!isCreateMode}
      initialValues={formInitials}
      validationSchema={schema}
      onSubmit={(values) => handleSubmit(values)}>
      { ({ isSubmitting, handleSubmit }) => {
        return (
          <div className="login-wrapper create-user-form">
            <Form onSubmit={handleSubmit}>
              <img className="avatar" src={AvatarImg} alt=""/>
              <h2>{ mode }</h2>
              {isCreateMode && <Row>
                <Field
                  type="text"
                  name="username"
                  title="Username"
                  icon="fa fa-user"
                  as={FormInput}
                />
              </Row> }
            
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
            
              { isCreateMode && <Row>
                <Field
                  as={FormInput}
                  icon="fa fa-key"
                  type="password"
                  name="password"
                  title="Password"/>
              </Row> }
            
              { isCreateMode && <Row>
                <Field
                  as={FormInput}
                  icon="fa fa-key"
                  type="password"
                  name="passwordConfirmation"
                  title="Confirm password"/>
              </Row> }
            
              <Row className="centered">
                <CustomButton onClick={handleCancel}>Cancel</CustomButton>
                <CustomButton type="submit" isLoading={loading} disabled={isSubmitting}>{ mode }</CustomButton>
              </Row>
            </Form>
          </div>
        )
      } }
    </Formik>
  );
};

const mapStateToProps = createStructuredSelector({
  userById: selectUserFormInitials,
  error: selectError,
  loading: authRequestsLoading
});

const mapDispatchToProps = dispatch => ({
  getUserById: (id) => dispatch(getUserByIdStart(id)),
  updateUser: (id, values) => dispatch(updateUserStart(id, values)),
  signUp: (values) => dispatch(signUpStart(values))
})

export default connect(mapStateToProps, mapDispatchToProps)(CreateEditUserForm)
