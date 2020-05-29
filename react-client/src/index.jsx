import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import List from './components/List.jsx';
// import styled from 'styled-components'
import SearchBar from './components/searchBar.jsx'
import TableNews from './components/TableNews.jsx'
import SampleData from '../../SampleData';
import NewsTabs from './components/NewsTab.jsx'
import axios from 'axios';
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: SampleData.articles,
      oldArticles: '',
      searchTerm: '',
      buttonFunctionality: 'Save',
    }
    this.search = this.search.bind(this);
    this.switchBetweenSearchedAndSavedArticles = this.switchBetweenSearchedAndSavedArticles.bind(this);
    this.refreshArticleStateUponDeletion = this.refreshArticleStateUponDeletion.bind(this)
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
      .then(({ data }) => {
        console.log('Data from node', data)
        this.setState({ articles: data })
      })
  }

  switchBetweenSearchedAndSavedArticles(searched) {
    if (searched) {
      this.setState({
        oldArticles: this.state.articles,
        articles: searched,
        buttonFunctionality: 'Delete'
      })
    } else {
      this.setState({
        articles: this.state.oldArticles,
        buttonFunctionality: 'Save'
      })
    }
  }

  refreshArticleStateUponDeletion() {
    axios.get('/grabArticles')
      .then(({ data }) => {
        this.setState({
          articles: data
        })
      })
  }


  render() {
    return (<div>

      <h1>Item List</h1>
      <SearchBar search={this.search} />
      <NewsTabs switch={this.switchBetweenSearchedAndSavedArticles} />
      {/* <List items={this.state.items} /> */}
      <TableNews refresh={this.refreshArticleStateUponDeletion} articles={this.state.articles} saveOrDelete={this.state.buttonFunctionality} />
    </div >)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));