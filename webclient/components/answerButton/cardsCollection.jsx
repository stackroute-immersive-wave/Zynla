// written by Arun Mohan Raj
// importing the required files
import React from 'react';
import QueCard from './card.jsx';
import Cookies from 'react-cookie';

class QueCards extends React.Component {
	constructor () {
		super();
	}

	render () {
		// map function to get the array value and
		// passing it to card to get the array of cards
		let queLike = this.props.queLike;
		let queDislike = this.props.queDislike;
    /*eslint-disable*/
		let cards = this.props.quesCollection.map(function(item) {
			//#Abu 20/4/2017 (To avoid posted questions in suggested question list)
			if((Cookies.load('email') !== item.postedBy) ||
			 (Cookies.load('email') !== Cookies.load('email'.name))){
				return (
					// sending data to child card
			<div>
					<QueCard dp={item.displayImage}
						name={item.postedBy}
						time={new Date(parseInt(item.addedOn, 10)).toString().substring(0, 15)} id={item.id}
					title={item.heading} content={item.question} upvote={item.upVotes}
					downvote={item.downVotes} anscount={item.answerCounts} profileImage={item.profileImage}
					category={item.category} queLike={queLike} queDislike={queDislike}/>
			</div>
			);
		}
		});
		/*eslint-enable*/
		return(
			// returning cards to questions page
			<div>
			{cards}
		</div>
		);
	}
}
QueCards.propTypes = {
	quesCollection: React.PropTypes.array,
	queLike: React.PropTypes.array,
	queDislike: React.PropTypes.array
};
module.exports = QueCards;
