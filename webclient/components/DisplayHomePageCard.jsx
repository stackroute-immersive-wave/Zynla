import React from 'react';
import CardsComponent from './DisplayHomePageCardStructure.jsx';
import {Grid} from 'semantic-ui-react';
class DisplayComponent extends React.Component {
    constructor() {
        super();
    }

    render() {
        let Data = this.props.display.map(function(item) {
            return (
                <Grid.Column><CardsComponent displayImage={item.displayImage}
                  heading={item.heading} question={item.question} postedBy={item.postedBy}
                  addedOn={item.addedOn} category={item.category} upVotes={item.upVotes}
                  downVotes={item.downVotes} answerCounts={item.answerCounts} acceptedCounts="5"/>
                </Grid.Column>
            );
        });
        return (
            <div>
                <Grid columns="4">
                    {Data}
                </Grid>
            </div>
        );
    }
}
DisplayComponent .propTypes = {
   display: React.PropTypes.func
 };
module.exports = DisplayComponent;
