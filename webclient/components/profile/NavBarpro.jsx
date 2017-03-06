import React, {Component} from 'react';
import {Menu, Button, Image, Grid} from 'semantic-ui-react';
import Cookie from 'react-cookie';
let Que = require('./questions/displayQuestions.jsx');
let Ans = require('./answers/displayAnswers.jsx');
let Info = require('./basicInfo/info.jsx');
let probody = {
  backgroundImage: 'url(' +
  'https://s-media-cache-ak0.pinimg.com/736x/af/65/cd/af65cdbdc68f2a1eee8c2ba1d57b1d25.jpg' + ')',
  backgroundSize: '100%'
};
let picStyle = {
    marginTop: '3%'
};
let imageStyle = {
  marginLeft: '45%'
};
let nameStyle = {
    marginTop: '1%',
    fontSize: '20px',
    fontWeight: 'bold',
    marginLeft: '46%',
    color: '#b30000'
};
let menuStyle = {
    marginTop: '2%',
    marginLeft: '-18%',
    width: '120%'
};
let contentstyle = {
  marginTop: '2%',
  marginLeft: '-10%'
};
class MenuExamplePointing extends Component {
    /*eslint-disable*/
    state = {
        activeItem: 'info',
        questionCount: 1,
        answerCount: 0,
        followerCount: 0,
        foname: 0,
        primary: '',
        secondary: '',
        university: '',
        objArray : [],
        content: (
          <Info />
        )
    }

    handleItemClick = (e, {name}) => {
      // console.log('comes');
      let temp = (
        <Info />
      );
      // console.log('Name:' + name);
      if(name === 'info') {
        temp = (
          <Info />
        );
      }
      else if(name === 'Questions') {
        temp = (
          <Que />
        );
      }
      else if(name === 'Answers') {
        temp = (
          <Ans />
        );
      }
      /*eslint-enable*/
      // else if(name === 'follower') {
      //
      // }
      // else if(name === 'following') {
      //
      // }
      this.setState({
        activeItem: name,
        content: temp
      });
    }

    onChange() {
    // console.log('comes to change');
    }

    onClick() {
        $.ajax({
            url: '/users/logout',
            type: 'GET',
            success: function(data) {
                if (typeof data.redirect === 'string') {
                    window.location.replace(window.location.protocol +
                       '//' + window.location.host + data.redirect);
                }
            },
            error: function() {
                // console.log('error in logout' + err);
            }
        });
    }

    componentWillMount() {
        this.getProfile();
    }

    getProfile() {
      let email = Cookie.load('email');
        $.ajax({
            url: 'http://localhost:8085/userdoc/getuserprofile',
            type: 'POST',
            data: {email: email},
            success: function(data) {
                this.setState({questionCount: data.lists.length,
                   answerCount: data.answers.length,
                    followerCount: data.followerCount,
                     followingCount: data.followingUser.length,
                     objArray: data});
            }.bind(this),
            error: function() {
              // console.log('error in logout' + err);
            }
        });
    }

    render() {
        const {activeItem} = this.state;
        const followerCount = this.state.followerCount;
        const followingCount = this.state.followingCount;
        return (
            <div style = {probody}>
                <Grid centered columns={1}>
                    <Grid.Column style={picStyle}>
                      <Image style={imageStyle} src={Cookie.load('profilepicture')}
                        size='small' shape='circular' avatar bordered/>
                        <div style={nameStyle}>
                            {Cookie.load('username')}
                        </div>
                    </Grid.Column>
                </Grid>
                <div style={menuStyle}>
                    <Grid>
                        <Grid.Column width={3}/>
                        <Grid.Column centered width={10}>
                            <Menu secondary onChange = {this.onChange.bind(this)}>
                                    <Menu.Item name='info' active={activeItem === 'info'}
                                      onClick={this.handleItemClick}>
                                      <Button color='red' content='Info'
                                        icon='info'/>
                                    </Menu.Item>
                                    <Menu.Item name='Questions' active={activeItem === 'Questions'}
                                       onClick={this.handleItemClick.bind(this)}>
                                       <Button color='red' content='Questions Posted'
                                         icon='question circle' label={{
                                             basic: true,
                                             color: 'red',
                                             pointing: 'left',
                                             content: this.state.questionCount
                                         }}/>
                                    </Menu.Item>
                                    <Menu.Item name='Answers' active={activeItem === 'Answers'}
                                       onClick={this.handleItemClick}>
                                       <Button color='red' content='Answers Answered'
                                         icon='question circle' label={{
                                             basic: true,
                                             color: 'red',
                                             pointing: 'left',
                                             content: this.state.answerCount
                                         }}/>
                                    </Menu.Item>
                                    <Menu.Item name='follower' active={activeItem === 'follower'}
                                       onClick={this.handleItemClick}>
                                       <Button color='red' content='Followers'
                                         icon='user plus' label={{
                                           basic: true,
                                           color: 'red',
                                           pointing: 'left',
                                           content: followerCount
                                       }}/>
                                     </Menu.Item>
                                    <Menu.Item name='following' active={activeItem === 'following'}
                                       onClick={this.handleItemClick}>
                                       <Button color='red' content='Following'
                                         icon='fork' label={{
                                           basic: true,
                                           color: 'red',
                                           pointing: 'left',
                                           content: followingCount
                                       }}/>
                                     </Menu.Item>
                                    <Menu.Item name='watchingtopic'
                                      active={activeItem === 'watchingtopic'}
                                       onClick={this.handleItemClick}>
                                       <Button color='red' content='Watching Topic'
                                         icon='fork' label={{
                                           basic: true,
                                           color: 'red',
                                           pointing: 'left',
                                           content: '0'
                                       }}/>
                                     </Menu.Item>
                            </Menu>
                        </Grid.Column>
                        <Grid.Column width={3}/>

                    </Grid>
                </div>
                <div style = {contentstyle}>
                {this.state.content}
              </div>
            </div>
        );
    }
}

module.exports = MenuExamplePointing;
