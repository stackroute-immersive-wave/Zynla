import React from 'react';
import ReactDOM from 'react-dom';
import Search from './sample/index.jsx';
// import Addbutton from './components/addbutton.jsx';

class MainComponent extends React.Component {
  constructor () {
    super();
    this.state = {obj: []};
  }

getResturantDataFromZomato(city, cusine)
 {
  let city1 = '';
   $.ajax({
      url: 'https://developers.zomato.com/api/v2.1/cities?q=' + city,
      type: 'GET',
      beforeSend: function (request)
                  {
                      request.setRequestHeader('user-key', 'ed1a1483bd90800d45a362d6ad04c23b');
                  },
     success: function(data) {
       // console.log('Successfully got JSON from Zomato' + city + JSON.stringify(data));
       city1 = data.location_suggestions[0].id;
       $.ajax({
          url: 'https://developers.zomato.com/api/v2.1/search?entity_id=' + city1
                + '&entity_type=city&q=' + cusine + '&count=10',
          type: 'GET',
          beforeSend: function (request)
                      {
                          request.setRequestHeader('user-key', 'cb70671d6660587a4e88f9f5957eb5a1');
                      },
         success: function(data1)
         {
           // console.log('Successfully got JSON from Zomato' + data1);
           // console.log(data1.restaurants);
          this.setState({obj: data1.restaurants});
         }.bind(this),
         error: function()
         {
           // console.log('error occurred on AJAX');
           // console.log(err);
         }
        });
     }.bind(this),
     error: function()
     {
       // console.log('error occurred on AJAX');
       // console.log(err);
     }
    });
   // console.log(city1);
}
  render() {
    return (
      <div>
          <Search.Search search = {this.getResturantDataFromZomato.bind(this)}/>
      </div>
    );
  }
}
module.exports = MainComponent;
ReactDOM.render(
  <MainComponent/>, document.getElementById('mountapp')
);
