import DisplayFavouriteCategory from './DisplayFavouriteCategory.jsx';
import DisplayHomePageCard from './DisplayHomePageCard';
import React from 'react';
import $ from 'jquery';

class Cards extends React.Component {
    constructor() {
        super();
        this.state = {
            json: [],
              savedata: []
        };
    }

    componentWillMount() {
      this.displayFollowingCards();
    }
    /* Get the saved cards Id from neo4j*/
    displayFollowingCards() {
      let arr = [];
      $.ajax({
          url: '/users/viewFollowCard',
          type: 'GET',
          success: function(data) {
            data.map(function(item) {
              item.watchingList.map(function(items) {
                arr.push(items);
              });
            });

            this.setState({savedata: arr});
            this.displayRandomCards();
          }.bind(this)
        });
   }
   /* Display all the cards in Landing page from mongodb*/
   displayRandomCards() {
     let arr2 = this.state.savedata;
     $.ajax({
         url: '/list/',
         type: 'GET',
         success: function(data) {
           data.map(function(item) {
             arr2.push(item);
           });
           this.setState({savedata: arr2});
         }.bind(this)
       });
   }
   render() {
       return (
             <div className='search1' >
                 <DisplayFavouriteCategory json={this.state.savedata} />
                 <DisplayHomePageCard display ={this.state.savedata} />
             </div>
       );
   }
}

module.exports = Cards;
