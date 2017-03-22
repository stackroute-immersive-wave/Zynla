import React from 'react';
import Cookie from 'react-cookie';
import QuestionsCard from './questionsCard';
const ReactToastr = require('react-toastr');
const {ToastContainer} = ReactToastr;
const ToastMessageFactory = React.createFactory(ReactToastr.ToastMessage.animation);

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
       this.noQuestionsAlert = this.noQuestionsAlert.bind(this);
     }
     componentWillMount() {
          this.handleOpen();
          this.getQuestions();
     }
     noQuestionsAlert () {
        this.refs.container.success(
          'No Questions yet!!',
          '', {
          timeOut: 2000,
          extendedTimeOut: 10000
        });
      }
     getQuestions() {
       let email = Cookie.load('email');
       /*eslint-disable*/
       let context = this;
       /*eslint-enable*/
       // console.log(email);
         $.ajax({
             url: '/userdoc/getQuestions',
             type: 'POST',
             data: {email: email},
             success: function(data) {
               context.handleClose();
               if(data === 'No Questions') {
                 context.noQuestionsAlert();
               }
               else{
                 context.setState({questionobj: data});
               }
             },
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
         <ToastContainer ref='container' style ={{backgroundColor: '#B2242E'}}
                toastMessageFactory={ToastMessageFactory}
                className='toast-top-center' />
       </div>
     );
   }
}
module.exports = displayQuestions;
