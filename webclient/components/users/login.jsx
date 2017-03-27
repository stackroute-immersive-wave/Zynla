let React = require('react');
let {hashHistory} = require('react-router');
import {Button, Grid, Icon, Form, Modal} from 'semantic-ui-react';
import validator from 'validator';
import Cookie from 'react-cookie';
// import graph from 'fbgraph';
import $ from 'jquery';
class Login extends React.Component {
   constructor() {
       super();
       this.state =
       {
        erroremail: false,
        errormessageemail: '',
        email: '',
        validemail: '',
        open: true,
        snackbarMsg: ''
        };
      this.onSubmitLoginData = this.onSubmitLoginData.bind(this);
   }
   show = (dimmer) => () => this.setState({ dimmer, open: true })
  close = () => this.setState({ open: false })
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
    onSubmitLoginData(e, value) {
      e.preventDefault();
        // console.log(value.formData);
        /* eslint-disable */
        let context = this;
        /* eslint-enable */
        $.ajax({
                url: '/users/login',
                type: 'POST',
                data: {
                    email: value.formData.userName,
                    password: value.formData.password
                },
                success: function() {
                  /*eslint-disable*/
                  if(Cookie.load('quesId') === undefined)
                    /*eslint-enable*/
                  {
                    hashHistory.push('/home');
                  }
                  else
                  {
                    let qId = Cookie.load('quesId');
                    // console.log(qId);
                    hashHistory.push('/answerPage?id=' + qId);
                  }
                },
                error: function() {
                  context.setState({snackbarMsg: 'Username or Password is Invalid'});
                  // console.log(err);
                    // this.setState({openSnackbar: true, snackbarMsg: err.responseText});
                }
            });
    }
render() {
  const { open, dimmer } = this.state;
  let login;
  if(Cookie.load('email'))
  {
    hashHistory.push('/home');
  }
  else {
    login = (<div className='overlay'>
    <Grid container={true} centered={true}>
    <Grid.Row>
    <Grid.Column width={6}/>
    <Grid.Column width={6}>
      <img src="./../../image/Zynla.png" />
      <p className="tagline">Quenching Thirsty Minds...</p>
    </Grid.Column>
    <Grid.Column width={4}>
      <Button id='loginButton' circular
      secondary onClick={this.show('blurring').bind(this)}>Login</Button>
  </Grid.Column>
  </Grid.Row>
  </Grid>

  <Modal dimmer={dimmer} open={open} onClose={this.close} closeIcon="close">
      <Grid>
          <Grid.Row>
            <Grid.Column width={7}>
              <img src = '../../image/loginBackground.jpg' className='loginImage'/>
            </Grid.Column>
            <Grid.Column width={9}>
              <Grid.Row />
              <Grid.Row>
                <img src = '../../image/logo.png' style={{marginLeft: 199 + 'px',
                backgroundColor: 'darkred', width: 58 + 'px', marginTop: 20 + 'px'}}/>
              </Grid.Row>
              <Grid.Row>
                <p className="tagline" style={{marginLeft: 109 + 'px', marginTop: 14 + 'px'}}>
                Quenching Thirsty Minds...
                </p>
              </Grid.Row>
              <Grid.Row>
                <Form onSubmit={this.onSubmitLoginData} className="contentCenter">
                    <Form.Field>
                    <Form.Input name= "userName" placeholder= 'Email-ID' icon = 'user'
                    iconPosition='left' id="formstyle" onChange={this.ChangeEmail.bind(this)}
                    error={this.state.erroremail} id='userForm'
                     placeholder = 'Enter Email Id' required />
                    <p style={{color: '#a54f4f'}}>{this.state.errormessageemail}</p>
                    <p style={{color: '#a54f4f'}}>{this.state.userexists}</p>
                    </Form.Field>

                    <Form.Field><br/>
                    <Form.Input type='password' name="password" placeholder='Password'
                     iconPosition='left' id="formstyle" icon = 'lock'
                    placeholder = 'Enter Password' id='passForm' required/>
                    </Form.Field><br/>
                    <div>
                    <a href="#/forgetPassword" style =
                     {{marginLeft: 273 + 'px'}}>Forgot Password?</a>
                    </div>
                    <Button color='teal' circular disabled=
                    {!this.state.email || !this.state.validemail} id='loginFormButton'>
                    <Button.Content type='submit' ><Icon name='sign in'/>Login</Button.Content>
                    </Button><br/><br/>
                    <div>
                    <p style={{color: '#a54f4f'}}>{this.state.snackbarMsg}</p>
                    </div>
                    <p id="footer">Not yet registered?&nbsp;
                    <a href="#/signup">Create Now</a>
                    </p>
              </Form>
              </Grid.Row>
              <Grid.Row>
              <Button.Group id='buttonGroup'>
                  <a href='users/auth/facebook'>
                  <Button color='blue' circular>
                  <Button.Content visible><Icon name='facebook'/>
                  Login With Facebook</Button.Content>
                  </Button>
                  </a>
                  <Button.Or />
                  <a href = '/users/auth/google'>
                    <Button color='red' circular>
                    <Button.Content visible><Icon name='google'/>Login With Google</Button.Content>
                    </Button>
                  </a>
                  <Button.Or />
                  <a href='users/auth/instagram'>
                  <Button color='green' circular>
                  <Button.Content visible>
                  Login With Instagram</Button.Content>
                  </Button>
                  </a>
            </Button.Group>
              </Grid.Row>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row />
        </Grid>
        </Modal>
</div>);
  }
return (
  <div>
  {login}
</div>
);
  }
}
module.exports = Login;
