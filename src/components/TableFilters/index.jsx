import React from "react";

import FormInput from "../UI/FormInput";
import {Field, Form, Formik} from "formik";
import Row from "../UI/Row";

import './style.scss';

const TableFilters = ({ filters, setFilters }) => {

  const onInputChange = ({ target }) => {
    const { name, value } = target;
    setFilters({ [name]: value });
  };

  return (
      <Formik
        enableReinitialize
        initialValues={filters} onSubmit={() => ({})}>
        {() => {
    
          return (
            <Form>
              <Row>
                <Field
                  onChange={onInputChange}
                  type="search"
                  name="search"
                  title="Search by fullname or email"
                  icon="fa fa-search"
                  as={FormInput}
                />
              </Row>
            </Form>
          )
        }}
      </Formik>
    
  )
};


export default TableFilters;
