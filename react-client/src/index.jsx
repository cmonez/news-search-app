import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import List from './components/List.jsx';
// import styled from 'styled-components'
import SearchBar from './components/searchBar.jsx'
import TableNews from './components/TableNews.jsx'
import SampleData from '../../SampleData';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: SampleData.articles,
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
      {/* <List items={this.state.items} /> */}
      <TableNews articles={this.state.articles} />
    </div >)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));