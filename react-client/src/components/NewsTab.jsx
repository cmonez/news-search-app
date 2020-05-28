import React from 'react';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Nav from 'react-bootstrap/Nav';
import ReactDOM from 'react-dom';
import axios from 'axios';

class NewsTabs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentClicked: 'Browse'
    }
  }
  render() {
    return (
      <Tabs defaultActiveKey="Browse" id="uncontrolled-tab-example" onSelect={(eventKey) => {
        if (this.state.currentClicked === 'Browse' && eventKey === 'Saved') {

          axios.get('/grabArticles')
            .then(({ data }) => this.props.switch(data))
          console.log('Will retrieve saved articles')
          this.setState({ currentClicked: 'Saved' })

        } else if (this.state.currentClicked === 'Saved' && eventKey === 'Browse') {
          console.log('Changing back to Browse!');
          this.props.switch();
          this.setState({ currentClicked: 'Browse' })
        }
      }}>
        <Tab eventKey="Browse" title="Browse" >
          {/* <Sonnet /> */}
        </Tab>
        <Tab eventKey="Saved" title="Saved">
          {/* <Sonnet /> */}
        </Tab>
      </Tabs>
    )
  }
}


export default NewsTabs;