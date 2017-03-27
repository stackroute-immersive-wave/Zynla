import React from 'react';
import Cookie from 'react-cookie';
import AnswersCard from './answersCard';
const ReactToastr = require('react-toastr');
const {ToastContainer} = ReactToastr;
const ToastMessageFactory = React.createFactory(ReactToastr.ToastMessage.animation);
import {
   Dimmer,
   Loader
} from 'semantic-ui-react';
class displayAnswers extends React.Component {

  handleOpen = () => this.setState({ active: true })
  handleClose = () => this.setState({ active: false })
   constructor() {
       super();
       this.state = {
         answerobj: []
       };
       this.noAnswersAlert = this.noAnswersAlert.bind(this);
     }

     componentWillMount() {
          this.handleOpen();
          this.getAnswers();
     }
     noAnswersAlert () {
        this.refs.container.error(
          'No Answers yet!!',
          '', {
          timeOut: 2000,
          extendedTimeOut: 10000
        });
      }
     getAnswers() {
       let email = Cookie.load('email');
       /*eslint-disable*/
       let context = this;
       /*eslint-enable*/
       // console.log(email);
         $.ajax({
             url: '/userdoc/getAnswers',
             type: 'POST',
             data: {email: email},
             success: function(data) {
               context.handleClose();
               if(data === 'No Answers')
               {
                 context.noAnswersAlert();
               }
               else{
                 context.setState({answerobj: data});
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
          <Loader>Loading Answers</Loader>
        </Dimmer>
         <h1 style={{marginLeft: '10px'}}>Answers Answered</h1>
          <AnswersCard answerData={this.state.answerobj}/>
          <ToastContainer ref='container' style ={{backgroundColor: '#B2242E'}}
                 toastMessageFactory={ToastMessageFactory}
                 className='toast-top-center' />
        </div>
      );
    }
}
module.exports = displayAnswers;
