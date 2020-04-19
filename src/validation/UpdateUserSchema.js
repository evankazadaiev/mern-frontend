import * as Yup from 'yup';

const UPDATE_USER_SCHEMA = Yup.object().shape({
  name: Yup.string()
    .required('Name is required'),
  surname: Yup.string()
    .required('Surname is required'),
});


export default UPDATE_USER_SCHEMA;
