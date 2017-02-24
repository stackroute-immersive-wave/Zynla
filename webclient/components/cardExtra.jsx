import React from 'react';

class CardsExtra extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div id='textsize' className='spacing'>
                {this.props.question}
            </div>

        );
    }
}

module.exports = CardsExtra;
