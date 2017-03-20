import React from 'react';
import Cookie from 'react-cookie';
import { Button, Modal, Input } from 'semantic-ui-react';
import Chat from './chat';
import $ from 'jquery';

class ProfileBot extends React.Component {
  constructor() {
    super();
    this.state = {
      userprofile: {},
      message: '',
      chat: [{
        by: 'bot', message: 'Hai,\nUpdate your profile data here.\n' +
        'Please enter skip if you not wish to update the question.'
      }],
      updatepart: '',
      close: false
    };
  }

  componentDidMount() {
    this.getUserprofile();
  }

  updateMessageState(e) {
    this.setState({
      message: e.target.value
    });
  }

  handleKeyPress(e) {
    let id = Cookie.load('username');
    let message = this.state.message;
    if(e.key === 'Enter') {
      this.setState({
        message: ''
      });
      this.state.chat.push({
        by: id,
        message: message
      });
      if(this.state.updatepart === 'gender') {
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

  updateProfile() {
    let email = Cookie.load('email');
    // let userProfile = this.state.userprofile
    $.ajax({
        url: '/userdoc/addProfile',
        type: 'POST',
        data: {
          emailId: email,
          userProfile: JSON.stringify(this.state.userprofile)
        },
        success: function() {
        }
      });
  }

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
          this.setState({
            userprofile: data.profile
          });
          context.askQuestion();
        }.bind(this)
      });
  }

  askQuestion() {
    if(!this.state.userprofile.gender || this.state.userprofile.gender.length < 1
      || this.state.userprofile.gender === 'gender') {
      this.state.chat.push({
        by: 'bot',
        message: 'Are you a male or female?'
      });
      this.setState({
        updatepart: 'gender'
      });
    }
    else if(!this.state.userprofile.dob || this.state.userprofile.dob.length < 1 ||
      this.state.userprofile.dob === 'dob' || this.state.userprofile.dob === ' ') {
      this.state.chat.push({
        by: 'bot',
        message: 'Please provide me with your date of birth(dd/mm/yyyy)?'
      });
      this.setState({
        updatepart: 'dob'
      });
    }
    else if(!this.state.userprofile.description || this.state.userprofile.description.length < 1
    || this.state.userprofile.description === 'Describe About Yourself'
    || this.state.userprofile.description === ' ') {
      this.state.chat.push({
        by: 'bot',
        message: 'Say something about yourself?'
      });
      this.setState({
        updatepart: 'description'
      });
    }
    else if(!this.state.userprofile.address.country ||
      this.state.userprofile.address.country.length < 1
    || this.state.userprofile.address.country === 'Country'
    || this.state.userprofile.address.country === ' ') {
        this.state.chat.push({
          by: 'bot',
          message: 'May I know your country?'
        });
        this.setState({
          updatepart: 'country'
        });
    }
    else if(!this.state.userprofile.address.region ||
      this.state.userprofile.address.region.length < 1
    || this.state.userprofile.address.region === 'State'
    || this.state.userprofile.address.region === ' ') {
        this.state.chat.push({
          by: 'bot',
          message: 'May I know your state?'
        });
        this.setState({
          updatepart: 'region'
        });
    }
    else if(!this.state.userprofile.address.city ||
      this.state.userprofile.address.city.length < 1
    || this.state.userprofile.address.city === 'City'
    || this.state.userprofile.address.city === ' ') {
        this.state.chat.push({
          by: 'bot',
          message: 'May I know your City?'
        });
        this.setState({
          updatepart: 'city'
        });
    }
    else if(!this.state.userprofile.education.primary ||
      this.state.userprofile.education.primary.length < 1
    || this.state.userprofile.education.primary === 'Primary'
    || this.state.userprofile.education.primary === ' ') {
        this.state.chat.push({
          by: 'bot',
          message: 'What about your schooling?'
        });
        this.setState({
          updatepart: 'primary'
        });
    }
    else if(!this.state.userprofile.education.highSchool ||
      this.state.userprofile.education.highSchool.length < 1
    || this.state.userprofile.education.highSchool === 'Secondary'
    || this.state.userprofile.education.highSchool === ' ') {
        this.state.chat.push({
          by: 'bot',
          message: 'What about your higher schooling?'
        });
        this.setState({
          updatepart: 'highschool'
        });
    }
    else if(!this.state.userprofile.education.university ||
      this.state.userprofile.education.university.length < 1
    || this.state.userprofile.education.university === 'University'
  || this.state.userprofile.education.university === ' ') {
        this.state.chat.push({
          by: 'bot',
          message: 'What about your university?'
        });
        this.setState({
          updatepart: 'university'
        });
    }
    else if(!this.state.userprofile.phone ||
      this.state.userprofile.education.phone < 1
    || this.state.userprofile.phone === 'Phone'
  || this.state.userprofile.phone === ' ') {
        this.state.chat.push({
          by: 'bot',
          message: 'Your Current Contact Number ?'
        });
        this.setState({
          updatepart: 'phone'
        });
    }
    else {
      this.state.chat.push({
        by: 'bot',
        message: 'Your Profile is Updated Completely.'
      });
    }
  }

  render() {
    Cookie.load('email');
    return (
      <div>
        <Modal trigger={<Button className='butstyle'
          style = {{marginLeft: '10%'}}>Profile Bot</Button>}
          closeOnDocumentClick ={true}
          onClose = {this.updateProfile.bind(this)}>
         <Modal.Header><h1>Profile Bot</h1></Modal.Header>
         <Chat className = 'message' chat = {this.state.chat}/>
         <Input fluid placeholder = "Answer..."
           value = {this.state.message}
           className = "chatinput"
           onChange = {this.updateMessageState.bind(this)}
           onKeyPress = {this.handleKeyPress.bind(this)}/>
         <Button className='butstyle' style={{float: 'right'}} primary>Skip</Button>
       </Modal>
      </div>
    );
  }
}

module.exports = ProfileBot;
