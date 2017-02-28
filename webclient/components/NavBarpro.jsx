import React, {Component} from 'react';
import {Menu, Button, Image, Grid, Label} from 'semantic-ui-react';
import Cookie from 'react-cookie';
let Que = require('./displayQuestions.jsx');
let Ans = require('./displayAnswers.jsx');
let Info = require('./info.jsx');
let picStyle = {
    marginTop: '3%'
};
let nameStyle = {
    marginTop: '1%',
    fontSize: '20px',
    fontWeight: 'bold'
};
let followStyle = {
    marginTop: '1%'
};
let menuStyle = {
    marginTop: '2%',
    floated: 'centered'
};
class MenuExamplePointing extends Component {
    /*eslint-disable*/
    state = {
        activeItem: 'info',
        questionCount: 1,
        answerCount: 0,
        followerCount: 0,
        followingCount: 0,
        primary: '',
        secondary: '',
        university: '',
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
        $.ajax({
            url: 'http://localhost:8080/userdoc/getuserprofile',
            type: 'GET',
            success: function(data) {
                this.setState({questionCount: data[0].lists.length,
                   answerCount: data[0].answers.length,
                    followerCount: data[0].followerCount,
                     followingCount: data[0].followingUser.length});
                // console.log(this.state);
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
            <div>

                <Grid centered columns={1}>
                    <Grid.Column style={picStyle}>
<Image src={Cookie.load('profilepicture')}
    size='tiny' shape='circular' avatar bordered/>
                        <div style={nameStyle}>
                            Nithin
                        </div>
                        <div style={followStyle}>
                            <Button basic color='red' content='Followers' icon='user plus' label={{
                                basic: true,
                                color: 'red',
                                pointing: 'left',
                                content: followerCount
                            }}/>

                            <Button basic color='blue' content='Following' icon='fork' label={{
                                as: 'a',
                                basic: true,
                                color: 'blue',
                                pointing: 'left',
                                content: followingCount
                            }}/>
                        </div>
                    </Grid.Column>
                </Grid>

                <div style={menuStyle}>
                    <Grid>
                        <Grid.Column width={3}/>
                        <Grid.Column centered width={10}>
                            <Menu pointing onChange = {this.onChange.bind(this)}>
                                    <Menu.Item name='info' active={activeItem === 'info'}
                                      onClick={this.handleItemClick}>

                                        Basic Info
                                    </Menu.Item>
                                    <Menu.Item name='Questions' active={activeItem === 'Questions'}
                                       onClick={this.handleItemClick.bind(this)}>
                                        Questions
                                        <Label>
                                            {this.state.questionCount}
                                        </Label>
                                    </Menu.Item>
                                    <Menu.Item name='Answers' active={activeItem === 'Answers'}
                                       onClick={this.handleItemClick}>
                                        Answers
                                        <Label>
                                            {this.state.answerCount}
                                        </Label>
                                    </Menu.Item>
                                    <Menu.Item name='follower' active={activeItem === 'follower'}
                                       onClick={this.handleItemClick}/>
                                    <Menu.Item name='following' active={activeItem === 'following'}
                                       onClick={this.handleItemClick}/>
                            </Menu>
                        </Grid.Column>
                        <Grid.Column width={3}/>

                    </Grid>
                </div>
                {this.state.content}
            </div>
        );
    }
}

module.exports = MenuExamplePointing;
