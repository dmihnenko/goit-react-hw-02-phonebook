import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import {
  Error,
  FormField,
  Label,
  Input,
  Button,
  FormStyle,
} from './Form.styled';

const initialValues = {
  name: '',
  phoneNumber: '',
};

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  phoneNumber: Yup.string()
    .required('Phone number is required')
    .matches(/^[0-9]+$/, 'Invalid phone number'),
});

const FormComponent = ({ onSubmit }) => {
  const handleSubmit = (values, { resetForm }) => {
    onSubmit({ ...values });
    resetForm();
  };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <FormStyle>
        <FormField>
          <Label htmlFor="name">Name:</Label>
          <Input id="name" name="name" placeholder="Enter your name" />
          <Error name="name" component="div" />
        </FormField>
        <FormField>
          <Label htmlFor="phoneNumber">Phone number:</Label>
          <Input
            id="phoneNumber"
            name="phoneNumber"
            placeholder="Enter your phone number"
          />
          <Error name="phoneNumber" component="div" />
        </FormField>
        <Button type="submit">Submit</Button>
      </FormStyle>
    </Formik>
  );
};

export default FormComponent;
