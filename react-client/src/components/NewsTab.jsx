import React from 'react';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Nav from 'react-bootstrap/Nav';
import ReactDOM from 'react-dom';

class NewsTabs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stateful: true
    }
  }
  render() {
    return (
      <Tabs defaultActiveKey="Browse" id="uncontrolled-tab-example" onSelect={(eventKey) => {
        if (eventKey === 'Saved') {
          console.log('Will retrieve saved articles')
        } else {
          console.log('Keep browsing!')
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