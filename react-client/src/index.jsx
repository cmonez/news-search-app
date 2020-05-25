import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import List from './components/List.jsx';
// import styled from 'styled-components'
import SearchBar from './components/searchBar.jsx'
import TableNews from './components/TableNews.jsx'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: []
    }
  }
  componentDidMount() {
    $.ajax({
      url: '/items',
      success: (data) => {
        this.setState({
          items: data
        })
      },
      error: (err) => {
        console.log('err', err);
      }
    });
  }

  render() {
    return (<div>

      <h1>Item List</h1>
      <SearchBar />
      <List items={this.state.items} />
      <TableNews />
    </div >)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));