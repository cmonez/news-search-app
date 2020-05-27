import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import List from './components/List.jsx';
// import styled from 'styled-components'
import SearchBar from './components/searchBar.jsx'
import TableNews from './components/TableNews.jsx'
import SampleData from '../../SampleData';
import axios from 'axios';
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: SampleData.articles,
      searchTerm: '',
    }
    this.search = this.search.bind(this)
  }
  componentDidMount() {
    $.ajax({
      url: '/articles',
      success: (data) => {
        this.setState({
          articles: data
        })
      },
      error: (err) => {
        console.log('err', err);
      }
    });
  }

  search(searched) {
    console.log('THis was searched', searched)
    axios.post('/searchTerm', { searched: searched })
      .then((data) => {
        console.log('Data from node')
        this.setState({ articles: data })
      })
  }

  render() {
    return (<div>

      <h1>Item List</h1>
      <SearchBar search={this.search} />
      {/* <List items={this.state.items} /> */}
      <TableNews articles={this.state.articles} />
    </div >)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));