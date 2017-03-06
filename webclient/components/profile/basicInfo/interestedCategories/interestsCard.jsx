import React from 'react';
import MainInterestCard from './mainInterestCard.jsx';
class Cards extends React.Component {
    constructor () {
        super();
    }
    // static defaultProps = {}


    render () {
        let arr = this.props.interestData.map(function(item) {
                return (
            <div>
                <MainInterestCard heading={item}/>
            </div>
            );
        });
        return(
          <div>
            {arr}
          </div>
        );
      }
}

module.exports = Cards;
Cards.propTypes = {
  interestData: React.PropTypes.Array
};
