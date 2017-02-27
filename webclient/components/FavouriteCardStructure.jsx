<<<<<<< HEAD
import React from 'react';
import {Image} from 'semantic-ui-react';

class Cards extends React.Component {
    constructor() {
        super();
    }

    render() {
      return(
        <div>
          <Image src={this.props.displayImage} className='favimgsize' bordered/>
        </div>
      );
    }
}

Cards .propTypes = {
   displayImage: React.PropTypes.string.isRequired
 };

module.exports = Cards;
=======
import React from 'react';
import {Image} from 'semantic-ui-react';

class Cards extends React.Component {
    constructor() {
        super();
    }

    render() {
      return(
        <div>
          <Image src={this.props.displayImage} className='favimgsize' bordered/>
        </div>
      );
    }
}

Cards .propTypes = {
   displayImage: React.PropTypes.string.isRequired
 };

module.exports = Cards;
>>>>>>> 5a3debcb4284fbb6250b6e6b20cef7d95c656e6a
