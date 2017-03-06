// importing the required files
import React from 'react';
import Card from './card.jsx';

class Cards extends React.Component {
	constructor () {
		super();
	}

	render () {
		// map function to get the array value and
		// passing it to card to get the array of cards
		let cards = this.props.quesCollection.map(function(item) {
				return (
					// sending data to child card
			<div>
					<Card dp={item.profileImage} name={item.postedBy} time={item.addedOn} id={item.id}
					title={item.heading} content={item.question} upvote={item.upVotes}
					downvote={item.downVotes} anscount={item.answerCounts}/>
			</div>
			);
		});
		return(
			// returning cards to questions page
			<div>
			{cards}
		</div>
		);
	}
}
Cards.propTypes = {
	quesCollection: React.PropTypes.Array
};
module.exports = Cards;
