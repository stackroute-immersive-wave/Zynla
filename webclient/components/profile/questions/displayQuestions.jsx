import React from 'react';
import Cookie from 'react-cookie';
import QuestionsCard from './questionsCard';

import {
   Dimmer,
   Loader
} from 'semantic-ui-react';
class displayQuestions extends React.Component {

  handleOpen = () => this.setState({ active: true })
  handleClose = () => this.setState({ active: false })
   constructor() {
       super();
       this.state = {
         questionobj: []
       };
     }

     componentWillMount() {
          this.handleOpen();
          this.getQuestions();
     }
     getQuestions() {
       let email = Cookie.load('email');
       // console.log(email);
         $.ajax({
             url: 'http://localhost:8080/userdoc/getQuestions',
             type: 'POST',
             data: {email: email},
             success: function(data) {
               this.handleClose();
               // console.log(data[0].heading);
               // console.log(data.length);
                 this.setState({questionobj: data});
             }.bind(this),
             error: function() {
              // console.log('error in logout' + err);
             }
         });
     }
   render() {
     const { active } = this.state;
       return (
         <div>
         <Dimmer active={active} page>
         <Loader>Loading Questions</Loader>
       </Dimmer>
       <h1 style={{marginLeft: '10px'}}>Questions Posted</h1>
         <QuestionsCard questionData={this.state.questionobj}/>
       </div>
     );
   }
}
module.exports = displayQuestions;
