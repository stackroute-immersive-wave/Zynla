import React from 'react';
import MyCard from './card.jsx';

class Cards extends React.Component {
	constructor () {
		super();
	}
	// static defaultProps = {}


	render () {
		let cards = this.props.quesCollection.map(function(item) {
				return (
			<div>
					<MyCard dp={item.profileImage} name={item.postedBy} time={item.addedOn} id={item.id}
					title={item.heading} content={item.question} upvote={item.upVotes}
					downvote={item.downVotes} anscount={item.answerCounts}/>
			</div>
			);
		});
		return(
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
