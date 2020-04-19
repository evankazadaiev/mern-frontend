import React, {useMemo, useState} from "react";
import {Field, Form, Formik} from "formik";
import Row from "../UI/Row";
import FormInput from "../UI/FormInput";
import EventBus from '../../utils/event-bus.utils';
import './style.scss';

const ChatContactsForm = () => {
  const [active, setActive] = useState(false);
  const formClasses = useMemo(() => `contacts-form-wr ${active ? 'active' : ''}`, [active]);
  
  const toggleActive = () => setActive(!active);
  const writeNewMessage = () => {
    EventBus.publish('showModal');
  };
  
  return (
    <div className={formClasses}>
      <Formik
        initialValues={{ search: '' }} onSubmit={() => ({})}>
        {() => {
          return (
            <Form>
              <div className="filters-header" onClick={toggleActive}>
                <h3>Show filters</h3>
                <i className="fa fa-arrow-down"/>
              </div>
              <div className="filters-body">
                <Row className="bottom-only">
                  <Field
                    type="search"
                    name="search"
                    title="Search messages"
                    icon="fa fa-search"
                    className="input-small"
                    as={FormInput}
                  />
                </Row>
                <Row ratio={[70, 10]} className="no-margin">
                  <Field type="text" name="filter" title="Filter by" icon="fa fa-filter" className="input-small" as={FormInput}/>
                  <i onClick={toggleActive} className="toggle-icon fa fa-arrow-up"/>
                  <i onClick={writeNewMessage} className="new-message fa fa-envelope"/>
                </Row>
              </div>
            </Form>
          )
        }}
      </Formik>
    </div>
  )
};


export default ChatContactsForm;
