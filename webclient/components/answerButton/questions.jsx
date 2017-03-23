// written by Arun Mohan Raj
// importing the required files
import React from 'react';
import {
   Grid,
   Divider,
   Icon,
   Dimmer,
   Loader
} from 'semantic-ui-react';
let {hashHistory} = require('react-router');
import Cookie from 'react-cookie';
import QueCards from './cardsCollection.jsx';
// suggested questions display page
class Questions extends React.Component {
   constructor() {
       super();
       this.state = {
           active: false,
           objArray: []
       };
       this.getQuestions = this.getQuestions.bind(this);
       this.handleOpen = this.handleOpen.bind(this);
       this.handleClose = this.handleClose.bind(this);
   }
   // functions to start and stop loader
   handleOpen() {this.setState({ active: true });}
   handleClose() {this.setState({ active: false });}
   // function to get questions from database
   getQuestions() {
     this.handleOpen();
       $.ajax({
           url: '/list/',
           type: 'GET',
           success: function(data) {
               this.setState({objArray: data});
               this.handleClose();
           }.bind(this),
           error: function() {
           }
       });
   }
   // getQuestions function is called as soon as the page renders
   componentDidMount() {
       this.getQuestions();
   }
// display question component
   render() {
     let queCards;
       const { active } = this.state;
       if(Cookie.load('email')) {
         queCards = (<div><Dimmer active={active} page>
          <Loader>Fetching Questions</Loader>
        </Dimmer>
          <Grid divided='vertically'>
              <Grid.Row columns={3}>
                  <Grid.Column width={2}/>
                  <Grid.Column width={10}>
                      <h1>
                          <Icon name='star' color='red'/>Questions For You
                      </h1>
                      {
                        /*
                        <div>
                          <Breadcrumb>
                              <Breadcrumb.Section link>Home</Breadcrumb.Section>
                              <Breadcrumb.Divider icon='right angle'/>
                              <Breadcrumb.Section link>Suggested Questions</Breadcrumb.Section>
                          </Breadcrumb>
                      </div>
                      */
                    }
                      <Divider clearing/>
                      <div>
                          <QueCards quesCollection={this.state.objArray}/>
                      </div>
                      </Grid.Column>
                  <Grid.Column width={2}/>
              </Grid.Row>
          </Grid></div>);
       } else {
         hashHistory.push('/');
       }
       return (
         <div>
          {queCards}
         </div>
       );
   }
}
module.exports = Questions;
