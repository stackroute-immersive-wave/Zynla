import React from 'react';
import DisplayHomePageCardStructure from './DisplayHomePageCardStructure.jsx';
import {Grid} from 'semantic-ui-react';
const Packery = require('react-packery-component')(React);

let packeryOptions = {
  // ransitionDuration: 0,
    gutter: 20
};

class DisplayHomePageCard extends React.Component {
    constructor() {
        super();
    }

    render() {
        /* Getting the values from Mongo db*/
        let Data = this.props.display.map(function(item) {
            return (
                <Grid.Column>
                  <DisplayHomePageCardStructure id={item.id} displayImage={item.displayImage}
                  heading={item.heading} question={item.question} postedBy={item.postedBy}
                  addedOn={item.addedOn} category={item.category} upVotes={item.upVotes}
                  downVotes={item.downVotes} answerCounts={item.answerCounts} views={item.views}
                  profileImage={item.profileImage}
                />
              </Grid.Column>

            );
        });
        return (
          <Packery className = {'my-gallary-class'}
            elementType={'div'} options={packeryOptions} className = 'packery'>
              {Data}
            </Packery>
        );
    }
}
DisplayHomePageCard .propTypes = {
   display: React.PropTypes.func
 };
module.exports = DisplayHomePageCard;
