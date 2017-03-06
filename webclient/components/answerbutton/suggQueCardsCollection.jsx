// importing the required files
import React from 'react';
import SuggestCard from './suggQueCard.jsx';

class suggQueCards extends React.Component {
	constructor () {
		super();
	}

	render () {
		// map function to get the array value and
		// passing it to card to get the array of cards
    let suggQueCollection = this.props.quedata;
		let cards = suggQueCollection.map(function(item) {
				return (
					// sending data to child card
			<div>
				{/* eslint-disable */}
					<SuggestCard id={item._fields[0].identity.low}
						title={item._fields[0].properties.name}
						content={item._fields[1].properties.Content}/>
				{/* eslint-disable */}
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
suggQueCards.propTypes = {
	quesCollection: React.PropTypes.Array,
		quedata: React.PropTypes.Array
};
module.exports = suggQueCards;
