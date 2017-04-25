//#swathi dimmer for 
import React from 'react';
import {
   Grid,
   Divider,
   Icon,
   Dimmer,
   Loader
} from 'semantic-ui-react';
let {hashHistory} = require('react-router');
import Cookie from 'react-cookie';
class CreateBook extends React.Component {
   constructor() {
       super();
       this.state = {
           active: false
           };
       }

    render()
    {
    	<div><Dimmer active={active} page>
       <Loader>Fetching Questions</Loader>
     </Dimmer>
     </div>
    	return(
    		<div><Dimmer active={active} page>
       <Loader>Fetching Questions</Loader>
     </Dimmer>
     </div>
    		);
    }
}

//module.exports = CreateBook;