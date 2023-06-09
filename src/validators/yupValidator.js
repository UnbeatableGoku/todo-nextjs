import * as yup from 'yup';

export const loginSchema = yup
  .object()
  .shape({
    email: yup
      .string()
      .required('Email is required field*')
      .matches(
        /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
        'Please enter valid email'
      ),
    password: yup
      .string()
      .required('Password is required field*')
      .matches(
        /^(?=.*\d).{8,}$/,
        'Minimum 8 characters and 1 number is required*'
      ),
  })
  .required();

export const singupSchema = yup
  .object()
  .shape({
    name: yup
      .string()
      .required('Name is a required field*')
      .matches(/[a-zA-Z]/, 'Only characters are allowed*'),
    email: yup
      .string()
      .required('Email is a required field*')
      .matches(
        /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
        'Please enter a valid email*'
      ),
    password: yup
      .string()
      .required('Password is a required field*')
      .matches(
        /^(?=.*\d).{8,}$/,
        'Minimum 8 characters and 1 number are required*'
      ),
    conpassword: yup
      .string()
      .oneOf([yup.ref('password'), null], 'Passwords must match*')
      .required('Confirm Password is a required field*'),
  })
  .required();

export const taskSchema = yup
  .object()
  .shape({
    title: yup.string().required('Title is required field*'),
    description: yup.string().required('Description is required field'),
  })
  .required();
