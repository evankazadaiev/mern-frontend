import React, {useEffect, useState} from "react";

import Modal from 'react-modal';
import Loader from '../Loader';
import './style.scss';
import SystemContacts from "../SystemContacts";
import {useServices} from "./services.hook";
import { Field, Formik } from "formik";
import Row from "../UI/Row";
import FormInput from "../UI/FormInput";


const ContactsModal = ({ isOpen, onRequestClose }) => {  
  return (
    <Modal  isOpen={isOpen}
            onRequestClose={onRequestClose}
            showCloseOnOverlayClick={true}>
      <Formik
        initialValues={{ search: '' }} onSubmit={() => ({})}>
        {() => {
          return (
            <>
              <div className="contact-filters-wr">
                <h3>Choose contact</h3>
                <Row className="bottom-only">
                  <Field
                    type="search"
                    name="search"
                    title="Search contact"
                    icon="fa fa-search"
                    className="input-small"
                    as={FormInput}
                  />
                </Row>
              </div>
              <SystemContacts/>  
            </>
          )
        }}
      </Formik>
    </Modal>
  )
};


export default ContactsModal;
