import React from 'react';
import PeopleCard from './peoplecard';
import {Card, Grid} from 'semantic-ui-react';
class People extends React.Component {
  constructor() {
    super();
  }

  render() {
    /* eslint-disable */
    let context = this;
    // map function to retrive the get the ID of users
    let allPeople = this.props.people.map(function(item) {
      let temp = false;
      // map function to check the particular user is fallowing other user
      context.props.isfollow.map(function(item2) {
        if(item2.emailId === item) {
          temp = item2.follow;
        }
      });
      // map function to retrive profile pictures from profile
    context.props.profile.map(function(item3){
        console.log(item3);
        let image = item3.profile.picture;
      });

      return (
       <PeopleCard id = {item} follow = {temp} image = {image}/>
      );
    });
         /* eslint-enable */
    return (
     <div style={{marginRight: 40 + 'px'}}>
<Grid centered >
       <Card.Group itemsPerRow = {3}>
                {allPeople}
                </Card.Group>
                </Grid>
                </div>
    );
  }
}

module.exports = People;
