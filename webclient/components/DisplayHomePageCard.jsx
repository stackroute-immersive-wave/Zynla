import React from 'react';
import CardsComponent from './DisplayHomePageCardStructure.jsx';
import {Grid} from 'semantic-ui-react';
<<<<<<< HEAD
const Packery = require('react-packery-component')(React);

let packeryOptions = {
    transitionDuration: 0,
    gutter: 20

};
=======
>>>>>>> 5a3debcb4284fbb6250b6e6b20cef7d95c656e6a
class DisplayComponent extends React.Component {
    constructor() {
        super();
    }

<<<<<<< HEAD

=======
>>>>>>> 5a3debcb4284fbb6250b6e6b20cef7d95c656e6a
    render() {
        let Data = this.props.display.map(function(item) {
            return (
                <Grid.Column><CardsComponent displayImage={item.displayImage}
                  heading={item.heading} question={item.question} postedBy={item.postedBy}
                  addedOn={item.addedOn} category={item.category} upVotes={item.upVotes}
                  downVotes={item.downVotes} answerCounts={item.answerCounts} acceptedCounts="5"/>
<<<<<<< HEAD

=======
>>>>>>> 5a3debcb4284fbb6250b6e6b20cef7d95c656e6a
                </Grid.Column>
            );
        });
        return (
<<<<<<< HEAD
          <Packery className = {'my-gallary-class'}
            elementType={'div'}
               options={packeryOptions}
            >


                      {Data}

            </Packery>
=======
            <div>
                <Grid columns="4">
                    {Data}
                </Grid>
            </div>
>>>>>>> 5a3debcb4284fbb6250b6e6b20cef7d95c656e6a
        );
    }
}
DisplayComponent .propTypes = {
   display: React.PropTypes.func
 };
module.exports = DisplayComponent;
