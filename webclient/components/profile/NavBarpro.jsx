import React, {Component} from 'react';
import {Button, Image, Grid, Statistic, Segment, Header, Icon} from 'semantic-ui-react';
import Cookie from 'react-cookie';
import Chat from './basicInfo/chatbot.jsx';
let DisplayQues = require('./questions/displayQuestions.jsx');
let DisplayAns = require('./answers/displayAnswers.jsx');
let BasicInfo = require('./basicInfo/basicInfo.jsx');
let DisplayFollowing = require('./following/displayFollowing');
let DisplayFollower = require('./followers/displayFollower');
import InterestsCard from './basicInfo/interestedCategories/interestsCard';

let picStyle = {
    marginTop: '3%'
};
let meterStyle = {
    marginTop: '30%',
    marginLeft: '60%',
    color: '#B2242E'
};
let imageStyle = {
  marginLeft: '35%'
};
let nameStyle = {
    marginTop: '1%',
    fontSize: '20px',
    fontWeight: 'bold',
    marginLeft: '40%',
    color: '#B2242E',
    cursor: 'pointer'
};
let buttonStyle = {
  marginLeft: '20%',
  marginTop: '5%'
};
class NavBarPro extends Component {

    state = {
        questionCount: 1,
        answerCount: 0,
        followerCount: 0,
        followingCount: 0,
        foname: 0,
        primary: '',
        secondary: '',
        university: '',
        objArray: [],
        status: 0,
        interestsData: [],
        content: <BasicInfo />
    }
// Fetch Basic Info page
    viewInfo() {
      let temp = (
        <BasicInfo />
      );
      this.setState({
        content: temp
      });
    }
    // Fetch Questions page
    getQuestions() {
      // console.log('comes');
      let temp = (
        <DisplayQues/>
      );
      this.setState({
        content: temp
      });
    }
    // Fetch Answers page
    getAnswers() {
      let temp = (
        <DisplayAns/>
      );
      this.setState({
        content: temp
      });
    }
    // Fetch Followers page
    getFollowers() {
      // console.log('comes');
      let temp = (
        <DisplayFollower/>
      );
      this.setState({
        content: temp
      });
    }
    // Fetch Following page
    getFollowings() {
      // console.log('comes');
      let temp = (
        <DisplayFollowing/>
      );
      this.setState({
        content: temp
      });
    }
    // Fetch Interested Topics from data base
    getInterestedTopics() {
        $.ajax({
            url: 'http://localhost:8080/userdoc/getInterestedTopics',
            type: 'POST',
            data: {
                email: Cookie.load('email')
            },
            success: function(data) {
                this.setState({interestsData: data,
                  // setting interestData to content
                content: <InterestsCard interestData={this.state.interestsData}/>
                });
            }.bind(this),
            error: function() {
                // console.error(err.toString());
            }
        });
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

    componentDidMount() {
        this.getProfile();
    }
    // Fetch All Info from database
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
                     if(data.profile.gender.length > 0 && data.profile.gender !== 'gender' &&
                     data.profile.gender !== ' ') {
                       this.setState({
                         // setting conditions for profile meter
                         status: parseInt(this.state.status, 10) + 10
                       });
                     }
                     if(data.profile.education.primary.length > 0 &&
                       data.profile.education.primary !== 'Primary' &&
                       data.profile.education.primary !== ' ') {
                       this.setState({
                         status: parseInt(this.state.status, 10) + 10
                       });
                     }
                     if(data.profile.education.highSchool.length > 0 &&
                       data.profile.education.highSchool !== 'Secondary' &&
                       data.profile.education.highSchool !== ' ') {
                       this.setState({
                         status: parseInt(this.state.status, 10) + 10
                       });
                     }
                     if(data.profile.education.university.length > 0 &&
                       data.profile.education.university !== 'University' &&
                         data.profile.education.university !== ' ') {
                       this.setState({
                         status: parseInt(this.state.status, 10) + 10
                       });
                     }
                     if(data.profile.address.country.length > 0
                       && data.profile.address.country !== 'Country'
                     && data.profile.address.country !== ' ') {
                       this.setState({
                         status: parseInt(this.state.status, 10) + 10
                       });
                     }
                     if(data.profile.address.city.length > 0
                       && data.profile.address.city !== 'City'
                     && data.profile.address.city !== ' ') {
                       this.setState({
                         status: parseInt(this.state.status, 10) + 10
                       });
                     }
                     if(data.profile.address.region.length > 0
                       && data.profile.address.region !== 'State'
                     && data.profile.address.region !== ' ') {
                       this.setState({
                         status: parseInt(this.state.status, 10) + 10
                       });
                     }
                     if(data.profile.dob.length > 0 && data.profile.dob !== 'dob'
                   && data.profile.dob !== ' ') {
                       this.setState({
                         status: parseInt(this.state.status, 10) + 10
                       });
                     }
                     if(data.profile.phone.length > 0 && data.profile.phone !== 'Phone'
                   && data.profile.phone !== ' ') {
                       this.setState({
                         status: parseInt(this.state.status, 10) + 10
                       });
                     }
                     if(data.profile.description.length > 0
                       && data.profile.description !== 'Describe About Yourself'
                     && data.profile.description !== ' ') {
                       this.setState({
                         status: parseInt(this.state.status, 10) + 10
                       });
                     }
            }.bind(this),
            error: function() {
              // console.log('error in logout' + err);
            }
        });
    }

    render() {
        const followerCount = this.state.followerCount;
        const followingCount = this.state.followingCount;
        let profMeter = parseInt(this.state.status, 10) + '%';
        return (
            <div>
              <Segment>
                <Grid centered columns={2}>
                    <Grid.Column style={picStyle}>
                      <Image style={imageStyle} src={Cookie.load('profilepicture')}
                        size='small' shape='circular' avatar bordered/>
                        <div style={nameStyle} onClick={this.viewInfo.bind(this)}>
                            {Cookie.load('username')}
                        </div>
                        <div style = {buttonStyle}>
                           <Button onClick={this.getFollowers.bind(this)}
                             className='butstyle'
                             content='Followers'
                             icon='user plus' label={{
                               basic: true,
                               color: 'white',
                               pointing: 'left',
                               content: followerCount
                           }}/>
                           <Button onClick={this.getFollowings.bind(this)} className='butstyle'
                             content='Following'
                             icon='fork' label={{
                               basic: true,
                               color: 'white',
                               pointing: 'left',
                               content: followingCount
                           }}/>
                         </div>
                    </Grid.Column>
                    <Grid.Column>
                      <div style={meterStyle}>
                        <Statistic>
                          <Statistic.Label>Profile Meter</Statistic.Label>
                          <Statistic.Value> {profMeter} </Statistic.Value>
                          <Statistic.Label>completed</Statistic.Label>
                          <Chat />
                        </Statistic>
                        </div>
                    </Grid.Column>
                  </Grid>
                     </Segment>
                <div>
                    <br/>
                  <Grid>
                    <Grid.Column width = {12}>
                    {this.state.content}
                  </Grid.Column>
                  <Grid.Column width = {4}>
                    <Segment>
                      <Header style ={{cursor: 'pointer'}} dividing
                        onClick={this.getQuestions.bind(this)}>
 <Header.Content>
   Questions &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {this.state.questionCount}
 </Header.Content>

</Header>

<Header style ={{cursor: 'pointer'}} dividing onClick={this.getAnswers.bind(this)}>
  <Header.Content>
    Answers &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {this.state.answerCount}
  </Header.Content>

</Header>
<Header dividing onClick={this.getInterestedTopics.bind(this)}>
 <Icon name='favorite' />
 <Header.Content style ={{cursor: 'pointer'}}>
   Watching Topics
 </Header.Content>
</Header>
</Segment>
                  </Grid.Column>
                </Grid>
              </div>
            </div>
        );
    }
}

module.exports = NavBarPro;
