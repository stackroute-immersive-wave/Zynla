<<<<<<< HEAD
import DisplayFavComponent from './FavouriteCardDisplay.jsx';
import DisplayComponent from './DisplayHomePageCard';
import React from 'react';
import $ from 'jquery';

class Cards extends React.Component {
    constructor() {
        super();
        this.state = {
            json: []
        };
    }

    componentWillMount() {
        $.ajax({
            url: '/list/',
            type: 'GET',
            success: function(data) {
                this.setState({json: data});
            }.bind(this)
          });
    }
    render() {
        return (
              <div className='search1' >
                  <DisplayFavComponent json={this.state.json} />
                 <DisplayComponent display ={this.state.json} />
              </div>
        );
    }
}

module.exports = Cards;
=======
import DisplayFavComponent from './FavouriteCardDisplay.jsx';
import DisplayComponent from './DisplayHomePageCard';
import React from 'react';
import $ from 'jquery';

class Cards extends React.Component {
    constructor() {
        super();
        this.state = {
            json: []
        };
    }

    componentWillMount() {
        $.ajax({
            url: '/list/',
            type: 'GET',
            success: function(data) {
                this.setState({json: data});
            }.bind(this)
          });
    }
    render() {
        return (
              <div className='search1' >
                  <DisplayFavComponent json={this.state.json} />
                 <DisplayComponent display ={this.state.json} />
              </div>
        );
    }
}

module.exports = Cards;
>>>>>>> 5a3debcb4284fbb6250b6e6b20cef7d95c656e6a
