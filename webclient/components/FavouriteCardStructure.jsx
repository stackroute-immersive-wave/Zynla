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

module.exports = Cards;
