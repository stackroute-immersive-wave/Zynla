import React from 'react';
import MainAnswerCard from './mainAnswerCard.jsx';
class Cards extends React.Component {
    constructor () {
        super();
    }
    // static defaultProps = {}


    render () {
        let arr = this.props.answerData.map(function(item) {
                return (
            <div>
                <MainAnswerCard answer={item.statement} addedOn={item.addedOn}
                image={item.image} upVote={item.upVote} downVote={item.downVote}
                />
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
  answerData: React.PropTypes.Array
};
