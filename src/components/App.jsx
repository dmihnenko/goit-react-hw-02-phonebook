import React, { Component } from 'react';
import FormComponent from './form/Form';
import { nanoid } from 'nanoid';
import FriendList from './list/List';
import SearchBar from './Finder/Finder';
import { Container } from './form/Form.styled';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  onSubmit = newContact => {
    const duplicated = this.state.contacts.some(
      contact => contact.name.toLowerCase() === newContact.name.toLowerCase()
    );
    if (duplicated) {
      alert(`${newContact.name} is already in your contacts`);
      return;
    }
    newContact.id = nanoid();
    this.setState(prevState => ({
      contacts: [...prevState.contacts, newContact],
    }));
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

  render() {
    return (
      <>
        <Container>
          <h2>Phonebook</h2>
          <FormComponent onSubmit={this.onSubmit} />
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
