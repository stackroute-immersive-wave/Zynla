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
