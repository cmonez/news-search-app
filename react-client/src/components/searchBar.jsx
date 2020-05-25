import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import styled from 'styled-components';
import Button from 'react-bootstrap/Button';
// const Button = styled.button`
//   background: transparent;
//   border-radius: 3px;
//   border: 2px solid palevioletred;
//   color: palevioletred;
//   margin: 0 1em;
//   padding: 0.25em 1em;
// `


class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {
    this.setState({
      value: event.target.value
    })
  }

  handleSubmit(event) {
    console.log(`This was searched ${this.state.value}`)
    this.setState({
      value: ''
    })
    event.preventDefault()
  }
  render() {
    return (

      <form onSubmit={this.handleSubmit}>
        <Button variant="outline-primary">Primary</Button>
        <label>
          Name:
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />

      </form>
    )
  }
}

export default SearchBar