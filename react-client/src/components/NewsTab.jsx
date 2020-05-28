import React from 'react';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Nav from 'react-bootstrap/Nav';

const NewsTabs = (props) => {


  return (
    <Tabs defaultActiveKey="Browse" id="uncontrolled-tab-example" onSelect={(eventKey) => console.log('Clicked', eventKey)}>
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