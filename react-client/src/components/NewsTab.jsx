import React from 'react';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Nav from 'react-bootstrap/Nav';

const NewsTabs = (props) => {


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
  );
}


export default NewsTabs;