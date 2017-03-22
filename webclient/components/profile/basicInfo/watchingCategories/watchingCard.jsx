import React from 'react';
import MainWatchingCard from './mainWatchingCard.jsx';
class interestsCard extends React.Component {
    constructor () {
        super();
    }
    // static defaultProps = {}


    render () {
        let arr = this.props.watchingData.map(function(item) {
                return (
            <div>
                <MainWatchingCard heading={item}/>
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

module.exports = interestsCard;
interestsCard.propTypes = {
  watchingData: React.PropTypes.Array
};
