import React, {Component} from 'react';
import {Menu, Button, Image, Grid} from 'semantic-ui-react';
import Cookie from 'react-cookie';
let DisplayQues = require('./questions/displayQuestions.jsx');
let DisplayAns = require('./answers/displayAnswers.jsx');
let BasicInfo = require('./basicInfo/basicInfo.jsx');
let DisplayFollowing = require('./following/displayFollowing');
let DisplayFollower = require('./followers/displayFollower');
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

class NavBarPro extends Component {

    state = {
        activeItem: 'info',
        questionCount: 1,
        answerCount: 0,
        followerCount: 0,
        foname: 0,
        primary: '',
        secondary: '',
        university: '',
        objArray: [],
          /*eslint-disable*/
        content: (
          <BasicInfo />
        )
    }

    handleItemClick = (e, {name}) => {
      // console.log('comes');
      let temp = (
        <BasicInfo />
      );
      // console.log('Name:' + name);
      if(name === 'info') {
        temp = (
          <BasicInfo />
        );
      }
      else if(name === 'Questions') {
        temp = (
          <DisplayQues />
        );
      }
      else if(name === 'Answers') {
        temp = (
          <DisplayAns />
        );
      }
      /*eslint-enable*/
      else if(name === 'follower') {
        temp = (
          <DisplayFollower/>
        );
      }
      else if(name === 'following') {
        temp = (
          <DisplayFollowing />
        );
      }
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
            url: 'http://localhost:8080/userdoc/getuserprofile',
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
            <div>
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
                                      <Button className='butstyle' content='Basic Info'
                                        icon='info'/>
                                    </Menu.Item>
                                    <Menu.Item name='Questions' active={activeItem === 'Questions'}
                                       onClick={this.handleItemClick.bind(this)}>
                                       <Button className='butstyle' content='Questions Posted'
                                         icon='question circle' label={{
                                             basic: true,
                                             color: '#B2242E',
                                             pointing: 'left',
                                             content: this.state.questionCount
                                         }}/>
                                    </Menu.Item>
                                    <Menu.Item name='Answers' active={activeItem === 'Answers'}
                                       onClick={this.handleItemClick}>
                                       <Button className='butstyle' content='Answers Answered'
                                         icon='question circle' label={{
                                             basic: true,
                                             color: '#B2242E',
                                             pointing: 'left',
                                             content: this.state.answerCount
                                         }}/>
                                    </Menu.Item>
                                    <Menu.Item name='follower' active={activeItem === 'follower'}
                                       onClick={this.handleItemClick}>
                                       <Button className='butstyle' content='Followers'
                                         icon='user plus' label={{
                                           basic: true,
                                           color: 'white',
                                           pointing: 'left',
                                           content: followerCount
                                       }}/>
                                     </Menu.Item>
                                    <Menu.Item name='following' active={activeItem === 'following'}
                                       onClick={this.handleItemClick}>
                                       <Button className='butstyle' content='Following'
                                         icon='fork' label={{
                                           basic: true,
                                           color: 'white',
                                           pointing: 'left',
                                           content: followingCount
                                       }}/>
                                     </Menu.Item>
                                    <Menu.Item name='watchingtopic'
                                      active={activeItem === 'watchingtopic'}
                                       onClick={this.handleItemClick}>
                                       <Button className='butstyle' content='Watching Topic'
                                         icon='fork' label={{
                                           basic: true,
                                           color: 'white',
                                           pointing: 'left',
                                           content: '0'
                                       }}/>
                                     </Menu.Item>
                            </Menu>
                        </Grid.Column>
                        <Grid.Column width={3}/>

                    </Grid>
                </div>
                <div>
                {this.state.content}
              </div>
            </div>
        );
    }
}

module.exports = NavBarPro;
