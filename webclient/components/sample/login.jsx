let React = require('react');
let {hashHistory} = require('react-router');
import {Button, Grid, Icon, Form } from 'semantic-ui-react';
import validator from 'validator';
import $ from 'jquery';

class Login extends React.Component {
   constructor() {
       super();
       this.state =
       {
        open: true,
        openSnackbar: false,
        snackbarMsg: '',
        erroremail: false,
        errormessageemail: '',
        email: '',
        validemail: ''
        };
      this.onSubmitLoginData = this.onSubmitLoginData.bind(this);
   }

    ChangeEmail = (event) => {
        this.setState({email: event.target.value});
        // check whether the user is alreay exists or not
        if(event.target.value.length > 7) {
        if (validator.isEmail(event.target.value)) {
            this.setState({erroremail: false});
            this.setState({validemail: true});
            this.setState({errormessageemail: false});
        } else {
            this.setState({erroremail: true});
            this.setState({validemail: false});
            this.setState({errormessageemail: 'Enter valid email, including the \@\ '});
        }
      }
    }


// LoginUser(){
// $.ajax({
//   url:"http://localhost:8080/users/login",
//   type: 'POST',
//   datatype: 'JSON',
//   data:{
//     'username':this.state.username,
//     'password':this.state.password
//   },
//   success: function(res){
//     console.log(res.responseText);
//     browserHistory.push('/home');
//   },
//   error: function(err){
//     // alert("Invalid username or password");
//     console.log(err.responseText);
//   }
// });
// }

    onSubmitLoginData(e, value) {
        // console.log(value.formData);
        e.preventDefault();
        $.ajax({
                url: 'http://localhost:8080/users/login',
                type: 'POST',
                data: {
                    email: value.formData.userName,
                    password: value.formData.password
                },
                success: function() {
                    // console.log('gggggggggggggg');
                    hashHistory.push('/home');
                    // let socket =io();
                    // socket.emit('userLoginStatus',{value:1});
                },
                error: function(err) {
                    this.setState({openSnackbar: true, snackbarMsg: err.responseText});
                }.bind(this)
            });
    }

render() {
  return (
  <div>
  <Grid centered style = {{margin: 30 + 'px'}}>
       <h2 style={{margin: -6 + 'px'}}>Welcome to Zoomato</h2>
       <Form onSubmit={this.onSubmitLoginData}>

            <Form.Field id="formfieldlogin">
            <Form.Input name= "userName" placeholder= 'Email-ID' icon='user'
            iconPosition='left' id="formstyle" onChange={this.ChangeEmail.bind(this)}
            error={this.state.erroremail} required />
            <p style={{color: '#a54f4f'}}>{this.state.errormessageemail}</p>
            </Form.Field>

            <Form.Field id="formfieldlogin"><br/>
            <Form.Input type='password' name="password" placeholder='Password'
            icon='lock' iconPosition='left' id="formstyle" required/>
            <a href="#/forgotpassword" id='forgotpassword'>Forgot Password?</a>
            </Form.Field><br/><br/><br/>

            <Button color='teal' id="buttonwidth1" circular disabled=
            {!this.state.email || !this.state.validemail}>
            <Button.Content type='submit' ><Icon name='sign in'/>Login</Button.Content>
            </Button><br/><br/>

            <p id="footer">Not yet registered?&nbsp;
            <a href="#/signup">Create Now</a>
            </p>

       </Form>
            <a href='users/auth/facebook'>
            <Button color='blue' id='buttonwidthfacebook' circular>
            <Button.Content visible><Icon name='facebook'/>Login With Facebook</Button.Content>
            </Button>
            </a>

            <a href='users/auth/google'>
            <Button color='red' id='buttonwidthgoogle' circular>
            <Button.Content visible><Icon name='google'/>Login With Google</Button.Content>
            </Button>
            </a>


       </Grid>
  </div>);
}
}

module.exports = Login;
