import React, { Component } from 'react';
import FormComponent from './form/Form';
import * as Yup from 'yup';
import { nanoid } from 'nanoid';
import FriendList from './list/List';
import SearchBar from './Finder/Finder';
import { Container } from './form/Form.styled';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  initialValues = {
    name: '',
    phoneNumber: '',
  };

  onSubmit = (values, { resetForm }) => {
    if (this.state.contacts.some(contact => contact.name === values.name)) {
      alert(`${values.name} is already in your contacts`);
      resetForm();
    } else {
      values.id = nanoid();
      this.setState(prevState => ({
        contacts: [...prevState['contacts'], values],
      }));
      resetForm();
    }
  };

  deleteContactById = event => {
    this.setState({
      contacts: this.state.contacts.filter(
        contact => contact.id !== event.currentTarget.id
      ),
    });
  };

  handleInputChange = event => {
    this.setState({ filter: event.target.value });
  };

  handleFilter = () => {
    const { filter, contacts } = this.state;
    if (filter.trim() === '') {
      return contacts;
    }
    const normFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normFilter)
    );
  };

  FormSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    phoneNumber: Yup.string()
      .required('Phone number is required')
      .matches(/^[0-9]+$/, 'Invalid phone number'),
  });

  render() {
    return (
      <>
        <Container>
          <h2>Phonebook</h2>
          <FormComponent
            onSubmit={this.onSubmit}
            initialValues={this.initialValues}
            validationSchema={this.FormSchema}
          />
          <h2 style={{ marginTop: '3rem', marginBottom: '0px' }}>Contacts</h2>
          <SearchBar
            value={this.state.filter}
            onChange={this.handleInputChange}
          />
          <FriendList
            friends={this.handleFilter()}
            deleteContactById={this.deleteContactById}
          />
        </Container>
      </>
    );
  }
}
