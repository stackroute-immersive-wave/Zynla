import React, { Component } from 'react';
import { Input, Menu, Segment, Button } from 'semantic-ui-react';
import {Link} from 'react-router';

export default class NavBar extends Component {
  // state = {
  //   activeItem:'home';
  // }
  logoutCall() {
  $.ajax({
    url: 'http://localhost:8080/users/logout',
    type: 'GET',
    // datatype: 'JSON',
    // data:{username :this.state.username,password:this.state.password},
    success: function(res)
    {
      if (typeof res.redirect === 'string') {
      window.location.replace(window.location.protocol + '//'
        + window.location.host + res.redirect);
  }
      // console.log(res.responseText);
      // browserHistory.push('/');
    },
    error: function()
    {
      // alert("error occurred while logging out");
      // console.log(err.responseText);
    }
  });
}

  render() {
    return (
    <Segment inverted>
      <Menu fixed='top' inverted pointing secondary>
        <Menu.Item name='Home'as={Link} to='/home' />
        <Menu.Menu position='right'>
          <Menu.Item>
            <Input icon='search' placeholder='Search...' />
          </Menu.Item>
          <Button onClick={this.logoutCall.bind(this)}>Logout</Button>
        </Menu.Menu>
      </Menu>
    </Segment>
    );
  }
}

module.exports = NavBar;

