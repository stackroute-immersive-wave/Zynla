import React from 'react';
import Cookie from 'react-cookie';
import { Button, Modal, Input } from 'semantic-ui-react';
import Chat from './chat';
import $ from 'jquery';
const ReactToastr = require('react-toastr');
const {ToastContainer} = ReactToastr;
const ToastMessageFactory = React.createFactory(ReactToastr.ToastMessage.animation);
class ProfileBot extends React.Component {
  constructor() {
    super();
    this.state = {
      userprofile: {},
      message: '',
      chat: [{
        by: 'bot',
        message: ''
      }],
      updatepart: '',
      close: false,
      skipques: [],
      inputBoxStatus:true,
      userProfileQues:{},
      countOfSkip:0
    };
    this.proAlert = this.proAlert.bind(this);
    this.skipAlert = this.skipAlert.bind(this);
    this.getUserprofile = this.getUserprofile.bind(this);
    this.updateProfile = this.updateProfile.bind(this);
  }
  //getuserProfile questions before rendering
  componentWillMount(){
    this.getUserprofileQues();
  }

//getting question from mongo DB
  getUserprofileQues(){
    let context = this;
    $.ajax({
					url:'/users/getProfileQues',
					data:'GET',
					dataType:'json',
					success:function(data){
						context.setState({userProfileQues:data});
					}
        });
  }
  //skip the questions in the bot
  skip() {
    let count=this.state.countOfSkip;
    count+=1;
    this.setState({countOfSkip:count})
    this.state.skipques.push(this.state.chat[this.state.chat.length - 1].message);
    this.askQuestion();
  }
//getting text box message from bot
  updateMessageState(e) {
    this.setState({
      message: e.target.value
    });
  }
//when enter key is pressed it should update the value and go to next question
  handleKeyPress(e) {
    // let id = Cookie.load('username');
    let message = this.state.message;
    if(e.key === 'Enter'&& message.trim()!=='') {
      if(this.state.updatepart === 'name') {
        this.state.userprofile.name = message;
        this.askQuestion();
      }
      else if(this.state.updatepart === 'gender') {
        this.state.userprofile.gender = message;
        this.askQuestion();
      }
      else if(this.state.updatepart === 'dob') {
        this.state.userprofile.dob = message;
        this.askQuestion();
      }
      else if(this.state.updatepart === 'description') {
        this.state.userprofile.description = message;
        this.askQuestion();
      }
      else if(this.state.updatepart === 'H.No.') {
        this.state.userprofile.address.Line1 = message;
        this.askQuestion();
      }
      else if(this.state.updatepart === 'Street') {
        this.state.userprofile.address.Line2 = message;
        this.askQuestion();
      }
      else if(this.state.updatepart === 'country') {
        this.state.userprofile.address.country = message;
        this.askQuestion();
      }
      else if(this.state.updatepart === 'region') {
        this.state.userprofile.address.region = message;
        this.askQuestion();
      }
      else if(this.state.updatepart === 'city') {
        this.state.userprofile.address.city = message;
        this.askQuestion();
      }
      else if(this.state.updatepart === 'postal Code') {
        this.state.userprofile.address.postalCode = message;
        this.askQuestion();
      }
      else if(this.state.updatepart === 'primary') {
        this.state.userprofile.education.primary = message;
        this.askQuestion();
      }
      else if(this.state.updatepart === 'highschool') {
        this.state.userprofile.education.highSchool = message;
        this.askQuestion();
      }
      else if(this.state.updatepart === 'university') {
        this.state.userprofile.education.university = message;
        this.askQuestion();
      }
      else if(this.state.updatepart === 'phone') {
        this.state.userprofile.phone = message;
        this.askQuestion();
      }
    }
  }
  //after updation it show a alert message
  proAlert () {
     this.refs.container.success(
       'Profile Updated Successfully',
       '', {
       timeOut: 1000,
       extendedTimeOut: 10000
     });
   }
   //if anything is not updated it shows this alert message
   skipAlert () {
      this.refs.container.success(
        'Profile is Not Fully Updated',
        '', {
        timeOut: 1000,
        extendedTimeOut: 10000
      });
    }

   //it update profile in mongoDb
  updateProfile() {
    let email = Cookie.load('email');
    /*eslint-disable*/
    let context = this;
    /*eslint-enable*/
    let profile = this.state.userprofile;
    // let userProfile = this.state.userprofile
    $.ajax({
        url: '/userdoc/addProfile',
        type: 'POST',
        data: {
          emailId: email,
          userProfile: JSON.stringify(profile)
        },

        success: function() {
          if(context.state.countOfSkip>=0)
          {
            context.skipAlert();
          }
          else
          {
            context.proAlert();
          }
          context.props.handle();
          context.setState({countOfSkip:0});
          //after updation it should empty the count of skip values
          context.setState({skipques:[]});
          //after you close the bot again it should ask the question which you have skipped
        }
      });
  }

//getting user details from mongoDb
  getUserprofile() {
    /* eslint-disable */
    let context = this;
    /* eslint-enable */
    let email = Cookie.load('email');
    $.ajax({
        url: '/userdoc/getuserprofile',
        type: 'POST',
        data: {
          email: email
        },
        success: function(data) {
          context.setState({
            userprofile: data.profile
          });
          context.setState({inputBoxStatus:true});
          // display input box if any profile want to update
          context.askQuestion();
          //update profile u have to call this method

        }
      });
  }
//when skipping question it is return false and move to next question
  checkSkip(str) {
    for(let temp of this.state.skipques) {
      if(temp === str) {
        return false;
      }
    }
    return true;
  }
//asking the question of profile
  askQuestion() {
    this.setState({ message: ''}); //input box should be empty when u skip the question
    if((!this.state.userprofile.name || this.state.userprofile.name.length < 1
      || this.state.userprofile.name === 'name')
       && this.checkSkip(this.state.userProfileQues[0].name)) {
      this.setState({
        chat:[{
          by: 'bot',
          message: this.state.userProfileQues[0].name
        }]
      });
      this.setState({
        updatepart: 'name'
      });
    }
    else if((!this.state.userprofile.gender || this.state.userprofile.gender.length < 1
      || this.state.userprofile.gender === 'gender')
       && this.checkSkip(this.state.userProfileQues[0].gender)) {
       this.setState({
         chat:[{
           by: 'bot',
           message: this.state.userProfileQues[0].gender
         }]
       });
      this.setState({
        updatepart: 'gender'
      });
    }
    else if((!this.state.userprofile.dob || this.state.userprofile.dob.length < 1 ||
      this.state.userprofile.dob === 'dob' || this.state.userprofile.dob.trim() === '')
    && this.checkSkip(this.state.userProfileQues[0].dob)) {
      this.setState({
        chat:[{
          by: 'bot',
          message: this.state.userProfileQues[0].dob
        }]
      });
      this.setState({
        updatepart: 'dob'
      });
    }
    else if((!this.state.userprofile.description || this.state.userprofile.description.length < 1
    || this.state.userprofile.description === 'Describe About Yourself'
    || this.state.userprofile.description.trim() === '')
    && this.checkSkip(this.state.userProfileQues[0].description)) {
      this.setState({
        chat:[{
          by: 'bot',
          message: this.state.userProfileQues[0].description
        }]
      });
      this.setState({
        updatepart: 'description'
    });
    }
    else if((!this.state.userprofile.address.Line1 ||
      this.state.userprofile.address.Line1.length < 1
    || this.state.userprofile.address.Line1 === 'H.No.'
    || this.state.userprofile.address.Line1.trim() === '')
  && this.checkSkip(this.state.userProfileQues[0].address.Line1)) {
    this.setState({
      chat:[{
        by: 'bot',
        message: this.state.userProfileQues[0].address.Line1
      }]
    });
        this.setState({
          updatepart: 'H.No.'
        });
    }
    else if((!this.state.userprofile.address.Line2 ||
      this.state.userprofile.address.Line2.length < 1
    || this.state.userprofile.address.Line2 === 'Street'
    || this.state.userprofile.address.Line2.trim() === ' ')
  && this.checkSkip(this.state.userProfileQues[0].address.Line2)) {
    this.setState({
      chat:[{
        by: 'bot',
        message: this.state.userProfileQues[0].address.Line2
      }]
    });
        this.setState({
          updatepart: 'Street'
        });
    }
    else if((!this.state.userprofile.address.country ||
      this.state.userprofile.address.country.length < 1
    || this.state.userprofile.address.country === 'Country'
    || this.state.userprofile.address.country.trim() === '')
  && this.checkSkip(this.state.userProfileQues[0].address.country)) {
    this.setState({
      chat:[{
        by: 'bot',
        message: this.state.userProfileQues[0].address.country
      }]
    });
        this.setState({
          updatepart: 'country'
        });
    }
    else if((!this.state.userprofile.address.region ||
      this.state.userprofile.address.region.length < 1
    || this.state.userprofile.address.region === 'State'
    || this.state.userprofile.address.region.trim() === '')
  && this.checkSkip(this.state.userProfileQues[0].address.region)) {
    this.setState({
      chat:[{
        by: 'bot',
        message: this.state.userProfileQues[0].address.region
      }]
    });
        this.setState({
          updatepart: 'region'
        });
    }
    else if((!this.state.userprofile.address.city ||
      this.state.userprofile.address.city.length < 1
    || this.state.userprofile.address.city === 'City'
    || this.state.userprofile.address.city.trim() === '')
  && this.checkSkip(this.state.userProfileQues[0].address.city)) {
        this.setState({
          chat:[{
            by: 'bot',
            message: this.state.userProfileQues[0].address.city
          }]
        });
        this.setState({
          updatepart: 'city'
        });
    }
    else if((!this.state.userprofile.address.postalCode ||
      this.state.userprofile.address.postalCode.length < 1
    || this.state.userprofile.address.postalCode === 'postal Code'
    || this.state.userprofile.address.postalCode.trim() === '')
  && this.checkSkip(this.state.userProfileQues[0].address.postalCode)) {
    this.setState({
      chat:[{
        by: 'bot',
        message: this.state.userProfileQues[0].address.postalCode
      }]
    });
        this.setState({
          updatepart: 'postal Code'
        });
    }
    else if((!this.state.userprofile.education.primary ||
      this.state.userprofile.education.primary.length < 1
    || this.state.userprofile.education.primary === 'Primary'
    || this.state.userprofile.education.primary.trim() === '')
  && this.checkSkip(this.state.userProfileQues[0].education.primary)) {
    this.setState({
      chat:[{
        by: 'bot',
        message: this.state.userProfileQues[0].education.primary
      }]
    });
        this.setState({
          updatepart: 'primary'
        });
    }
    else if((!this.state.userprofile.education.highSchool ||
      this.state.userprofile.education.highSchool.length < 1
    || this.state.userprofile.education.highSchool === 'Secondary'
    || this.state.userprofile.education.highSchool.trim() === '')
  && this.checkSkip(this.state.userProfileQues[0].education.highSchool)) {
    this.setState({
      chat:[{
        by: 'bot',
        message: this.state.userProfileQues[0].education.highschool
      }]
    });
        this.setState({
          updatepart: 'highschool'
        });
    }
    else if((!this.state.userprofile.education.university ||
      this.state.userprofile.education.university.length < 1
    || this.state.userprofile.education.university === 'University'
  || this.state.userprofile.education.university.trim() === '')
&& this.checkSkip(this.state.userProfileQues[0].education.university)) {
  this.setState({
    chat:[{
      by: 'bot',
      message: this.state.userProfileQues[0].education.university
    }]
  });
        this.setState({
          updatepart: 'university'
        });
    }
    else if((!this.state.userprofile.phone ||
      this.state.userprofile.education.phone < 1
    || this.state.userprofile.phone === 'Phone'
  || this.state.userprofile.phone.trim() === '')
&& this.checkSkip(this.state.userProfileQues[0].phone)) {
  this.setState({
    chat:[{
      by: 'bot',
      message: this.state.userProfileQues[0].phone
    }]
  });
        this.setState({
          updatepart: 'phone'
        });
    }
    else {
      //when user completed all the updation or skipped all the
      //  question finally it should hide text box and display some message
      this.setState({inputBoxStatus:false});
      if(this.state.countOfSkip>0)
      {
        this.setState({
          chat:[{
          by: 'bot',
          message: 'Your Profile is Not Updated Completely. Update it later..'
        }]
        });

      }
      else {
        this.setState({
          chat:[{
          by: 'bot',
          message: 'Your Profile is Updated Completely. ThankYou!'
        }]
        });
      }

    }
  }

  render() {
    Cookie.load('email');
    return (
      <div>
        <Modal trigger={<Button onClick = {this.getUserprofile.bind(this)}
          className='butstyle'
          content = 'Profile Bot'/>}
          onClose = {this.updateProfile.bind(this)} closeIcon='close'>
         <Modal.Header><h1 style={{color: '#B2242E'}}>Profile Bot</h1></Modal.Header>
         <Chat className = 'message' chat = {this.state.chat}/>
         {this.state.inputBoxStatus?<Input fluid placeholder = "Answer..."
           value = {this.state.message}
           className = "chatinput"
           onChange = {this.updateMessageState.bind(this)}
           onKeyPress = {this.handleKeyPress.bind(this)}/>:
           ""}
             {this.state.inputBoxStatus?<Button className='butstyle'
            style={{float: 'right'}}
            onClick={this.skip.bind(this)}
             primary>Skip</Button>:''}
       </Modal>
       <ToastContainer ref='container' style ={{backgroundColor: '#B2242E'}}
              toastMessageFactory={ToastMessageFactory}
              className='toast-top-center' />
      </div>
    );
  }
}

module.exports = ProfileBot;
