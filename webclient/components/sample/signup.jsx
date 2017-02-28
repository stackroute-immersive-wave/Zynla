import React from 'react';
import {hashHistory} from 'react-router';
import {Button, Image, Modal, Dimmer, Header} from 'semantic-ui-react';
import {Form} from 'semantic-ui-react';
import validator from 'validator';
import Axios from 'axios';
import Snackbar from 'material-ui/Snackbar';
export default class Signup extends React.Component {
    constructor()
    {
        super();
        this.state = {
          openSnackbar: false,
            snackbarMsg: '',
            opendimmer: false,
            emailId: '',
            userexists: '',
            firstname: '',
            lastname: '',
            email: '',
            message: '',
            errorfirst: false,
            errorlast: false,
            erroremail: false,
            errorrepassword: false,
            errorpassword: false,
            errormessageemail: '',
            errormessagefirst: '',
            errormessagelast: '',
            errormessage: '',
            errormessagepassword: '',
            repassword: '',
            password: '',
            mailexists: false,
            decoration: false,
            confirmpassword: false,
            verifypassword: false,
            open: true
        };
        this.onRegisterUser = this.onRegisterUser.bind(this);
    }
    handleOpen = () => this.setState({ active: true })
    handleClose = () => this.setState({ active: false })

    show = (dimmer) => () => this.setState({dimmer, open: true})
    close = () => hashHistory.push('/');
    // email verification link
    sentemail(email) {
        Axios({
            url: ' http://localhost:8080/users/send',
            method: 'post',
            data: {
                data: email
              }
            }).then(function() {
                hashHistory.push('/mail');
            }).catch(function() {
                Axios({
                    url: ' http://localhost:8080/users/deleteuser',
                    method: 'delete',
                    data: {
                        data: email
                      }
                      }).then(function() {
                          hashHistory.push('/mailnotsend');
                      }).catch(function() {
                        // console.log('error');
                      });
            });
        }
    // new user signup
    onRegisterUser(e, value) {
      e.preventDefault();
      if(value.formData.password === value.formData.repassword)
        {
          this.setState({opendimmer: true});
          Axios({
            url: 'http://localhost:8080/users/signup',
            method: 'post',
            data: value.formData
          }).then(function() {
            // Axios({
            //     url: 'http://localhost:8080/users/userProfileData',
            //     method: 'post',
            //     data: {"email" : value.formData.email}
            // }).then(function()
            // {
            //     console.log("successfully stored in userProfile");
            // }).catch(function()
            // {
            //     console.log("error occured in userProfile");
            // });
              // console.log(msg.firstname);
          }).catch(function() {
              // console.log(err);
              // alert(err + 'check the details' + Object.keys(value.formData));
          });
          this.sentemail(value.formData.email);
        }
        else{
             this.setState({openSnackbar: true, snackbarMsg: 'check password field'});
        }
  }
  handleRequestClose = () => {
          this.setState({openSnackbar: false});
      };

    // validation for firstname
    ChangeFirst = (event) => {
        this.setState({firstname: event.target.value});
        if (validator.isAlpha(event.target.value)) {
            this.setState({errorfirst: false});
            this.setState({errormessagefirst: false});
        } else {
            this.setState({errorfirst: true});
            this.setState({errormessagefirst: 'Enter a valid name'});
        }
    }
    // validation for lastname
    ChangeLast = (event) => {
        this.setState({lastname: event.target.value});
        if (validator.isAlpha(event.target.value)) {
            this.setState({errorlast: false});
            this.setState({errormessagelast: false});
        } else {
            this.setState({errorlast: true});
            this.setState({errormessagelast: 'Enter a valid name'});
        }
    }
    // validation for email
    ChangeEmail = (event) => {
        this.setState({email: event.target.value});
        // console.log(event.target.value);
        // check whether the user is alreay exists or not
        if(event.target.value.length >= 0) {
        if (validator.isEmail(event.target.value)) {
           /*eslint-disable*/
          let self = this;
          /*eslint-enable*/
            Axios({
                url: ' http://localhost:8080/users/checkuser',
                method: 'POST',
                data: {
                    email: event.target.value
                }
              }).then(function(response) {
                    if (response.data.userexists &&
                        response.data.authType === 'google' ||
                        response.data.authType === 'facebook') {
                      self.setState({userexists: 'Already Exists via ' + response.data.authType});
                      self.setState({mailexists: false});
                        // console.log(msg);
                    }
                     else if (response.data.userexists && response.data.authType === 'local') {
                      self.setState({userexists: 'Already Exists'});
                      self.setState({mailexists: false});
                        // console.log(msg);
                    }
                    else {
                        // console.log(msg);
                        self.setState({userexists: ' '});
                        self.setState({mailexists: true});
                    }
                }).catch(function() {
                    // console.log(err);
                });
            this.setState({erroremail: false});
            this.setState({errormessageemail: false});
        } else {
            this.setState({erroremail: true});
            this.setState({errormessageemail: 'Enter valid email, including \@\ '});
        }
      }
    }
    // validation for password
    ChangePassword = (event) => {
        this.setState({password: event.target.value});
        // console.log(event.target.value)
        let points = event.target.value.length;
        let passwordInfo = event.target.value;
        let hasLetter = new RegExp('[a-z]');
        let hasCaps = new RegExp('[A-Z]');
        let hasNumbers = new RegExp('[0-9]');
          if(event.target.value.length > 4) {
        if (hasLetter.test(passwordInfo) && points >= 6 &&
            hasCaps.test(passwordInfo) && hasNumbers.test(passwordInfo)) {
            this.setState({errorpassword: false});
            this.setState({errormessagepassword: false});
              this.setState({verifypassword: true});
        } else {
            this.setState({errorpassword: true});
            this.setState({verifypassword: false});
            this.setState({errormessagepassword:
            'Password should contain numbers, letters(A&a) and minimum length 6'});
        }
      }
    }
    // validation for confirmpassword
    ChangeRepassword = (event) => {
        this.setState({repassword: event.target.value});
          if(event.target.value.length > 2) {
            if (validator.equals(event.target.value, this.state.password)) {
          // checking equality between password and confirmpassword
          this.setState({errorrepassword: false});
          this.setState({errormessage: false});
            this.setState({confirmpassword: true});
          }
      else {
        this.setState({confirmpassword: false});
        this.setState({errorrepassword: true});
        this.setState({errormessage: 'Password mismatch'});
    }
  }
}
render() {
    const {open, dimmer, active} = this.state;
    return (
        <div>
        <Modal dimmer={dimmer} open={open} onClose={this.close}
        size="small" closeIcon="close" id='modalsignupcss'>
        <Modal.Header id="signup"><Image src="../../images/ginianim.gif"
        avatar/>Sign Up</Modal.Header>
        <Modal.Content>
        <Form id="formfield" onSubmit={this.onRegisterUser}>
        <Form.Field id="formfield">
        <Form.Input label='First Name' name='firstName' placeholder=
        'First Name' type='text' onChange={this.ChangeFirst}
        error={this.state.errorfirst} required/>
        <p id="textcolor">{this.state.errormessagefirst}</p>
        </Form.Field>
        <Form.Field id="formfield">
        <Form.Input label='Last Name' id="input" name="lastName"
        placeholder='Last Name' type='text' onChange=
        {this.ChangeLast.bind(this)} error={this.state.errorlast} required/>
        <p id="textcolor">{this.state.errormessagelast}</p>
        </Form.Field>
        <Form.Field id="formfield">
        <Form.Input label='Email' id="to" name="email"
        placeholder='Email-ID' type='text'
        onChange={this.ChangeEmail.bind(this)}
        error={this.state.erroremail} required/>
        <p id="textcolor">{this.state.errormessageemail}</p>
        <p id="textcolor">{this.state.userexists}</p>
        </Form.Field>
        <Form.Field id="formfield">
        <Form.Input label='Password' id="input" name="password"
        placeholder='Password' type='password' onChange={this.ChangePassword.bind(this)}
        error={this.state.errorpassword} required/>
        <p id="textcolor">{this.state.errormessagepassword}</p>
        </Form.Field>
        <Form.Field id="formfield">
        <Form.Input label='Confirm Password' id="input" name="repassword"
        type='password' placeholder='Confirm Password'
        onChange={this.ChangeRepassword.bind(this)} error={this.state.errorrepassword} required/>
        <p id="textcolor">{this.state.errormessage}</p>
        </Form.Field>
        <Button type='submit' id='buttonstyle' onClick={this.handleOpen}
        circular disabled={!this.state.firstname
        || !this.state.lastname || !this.state.email ||
        !this.state.password || !this.state.repassword || !this.state.mailexists
        || !this.state.verifypassword || !this.state.confirmpassword} > SET UP YOUR ACCOUNT
        </Button>
        {this.state.opendimmer ? < Dimmer
                 active = {active}
                 onClickOutside = {this.handleClose}
                 page>

                <Header as='h2' icon inverted>
                  <Image src='../images/mail.gif' size="small" />
                   <Header.Subheader><h3>Please hold for a minute to get verification mail......
                   </h3></Header.Subheader>
                 </Header>
        </Dimmer > : null}
        <span id="message"/>
        <h4 id="text">Already a member?&nbsp;<a href='#/login' id='space'>
        Sign in here</a>
        </h4>
        </Form>
        </Modal.Content>
        </Modal>
        {this.state.openSnackbar ? < Snackbar open = {this.state.openSnackbar}
        message={this.state.snackbarMsg} autoHideDuration={1200}
        onRequestClose={this.handleRequestClose}/>
        : null}
        </div>
        );
}
}
