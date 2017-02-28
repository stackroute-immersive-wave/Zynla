import React from 'react';
import CardsComponent from './DisplayHomePageCardStructure.jsx';
import {Grid} from 'semantic-ui-react';
const Packery = require('react-packery-component')(React);

let packeryOptions = {
  //ss  ransitionDuration: 0,
    gutter: 20,



};

class DisplayComponent extends React.Component {
    constructor() {
        super();
    }

    render() {
        let Data = this.props.display.map(function(item) {
            return (
<<<<<<< HEAD

                <Grid.Column><CardsComponent displayImage={item.displayImage}
=======
                <Grid.Column><CardsComponent id={item.id} displayImage={item.displayImage}
>>>>>>> 3cbfbbed20ad7fa6e95dfa7755f337653b5c509a
                  heading={item.heading} question={item.question} postedBy={item.postedBy}
                  addedOn={item.addedOn} category={item.category} upVotes={item.upVotes}
                  downVotes={item.downVotes} answerCounts={item.answerCounts} acceptedCounts="5"/>
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
DisplayComponent .propTypes = {
   display: React.PropTypes.func
 };
module.exports = DisplayComponent;
