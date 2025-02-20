import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import styled from 'styled-components';
import Button from 'react-bootstrap/Button';
import { Col, Row, Form } from "react-bootstrap";


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
    // console.log(`This was searched ${this.state.value}`)

    this.props.search(this.state.value);

    this.setState({
      value: ''
    })
    event.preventDefault()
  }
  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Row>
          <Col>
            <Form.Control placeholder="News topic" type="text" value={this.state.value} onChange={this.handleChange} className="d-inline" />
            <Button variant="outline-primary" type="submit" value="Submit" className="d-inline">Search!</Button>
          </Col>
        </Form.Row>
      </Form>
    )
  }
}

export default SearchBar