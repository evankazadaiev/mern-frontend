import * as Yup from 'yup';

const SIGN_UP_SCHEMA = Yup.object().shape({
  username: Yup.string()
    .min(2, 'Username too Short!')
    .max(50, 'Username too Long!')
    .required('Username required'),
  email: Yup.string()
    .email('Please enter a valid email')
    .required('Please enter an email'),
  password: Yup.string()
    .required('No password provided.')
    .min(8, 'Password is too short - should be 8 chars minimum.')
    .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.'),
  passwordConfirmation: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
});


export default SIGN_UP_SCHEMA;
