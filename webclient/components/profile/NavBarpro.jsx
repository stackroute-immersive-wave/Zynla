import React, {Component} from 'react';
import {Button, Image, Menu, Grid, Statistic, Segment, Header, Loader, Popup,
  Input} from 'semantic-ui-react';
import Cookie from 'react-cookie';
import Chat from './basicInfo/chatbot.jsx';
let DisplayQues = require('./questions/displayQuestions.jsx');
let DisplayAns = require('./answers/displayAnswers.jsx');
let BasicInfo = require('./basicInfo/basicInfo.jsx');
let DisplayFollowing = require('./following/displayFollowing');
let DisplayFollower = require('./followers/displayFollower');
import WatchingCard from './basicInfo/watchingCategories/watchingCard.jsx';
const ReactToastr = require('react-toastr');
const {ToastContainer} = ReactToastr;
const ToastMessageFactory = React.createFactory(ReactToastr.ToastMessage.animation);

let picStyle = {
    marginTop: '3%'
};
let meterStyle = {
    marginTop: '30%',
    marginLeft: '57.5%',
    color: '#B2242E'
};
let imageStyle = {
  marginLeft: '35%'
};
let nameStyle = {
    marginTop: '1%',
    fontSize: '20px',
    fontWeight: 'bold',
    marginLeft: '37.5%',
    color: '#B2242E',
    cursor: 'pointer'
};
let buttonStyle = {
  marginLeft: '20%',
  marginTop: '5%'
};
class NavBarPro extends Component {

  constructor() {
    super();
    this.state = {
        name: 'name',
        questionCount: 0,
        answerCount: 0,
        followerCount: 0,
        followingCount: 0,
        foname: 0,
        primary: '',
        secondary: '',
        university: '',
        objArray: [],
        status: 0,
        watchingData: [],
        content: '',
        contentNew:'',
        watchingCount: 0,
        load: false,
        picture: ''
    };
    this.getProfile = this.getProfile.bind(this);
  }
// Fetch Basic Info page
    viewInfo() {
      this.setState({
        content: <BasicInfo statusMeter = {this.getProfile}/>
      });
    }
    // Fetch Questions page
    getQuestions() {
      if(this.state.questionCount === 0)
      {
        //#swathi setting the contentNew to null sothat it will not be displayed when the next segment is clicked
        this.setState({
      contentNew:null });
        this.noQuestionsAlert();
      }
      else{
      this.setState({
        contentNew: <DisplayQues/>
      });
    }
    
    }
    // Fetch Answers page
    getAnswers() {
      if(this.state.answerCount === 0)
      {
        //#swathi setting the contentNew to null sothat it will not be displayed when the next segment is clicked
        this.setState({
      contentNew:null });
        this.noAnswersAlert();
      }
      else{
      this.setState({
        contentNew: <DisplayAns/>
      });
    }
    }
    // Fetch Followers page
    getFollowers() {
      this.setState({
        content: <DisplayFollower/>
      });
    }
    // Fetch Following page
    getFollowings() {
      this.setState({
        content: <DisplayFollowing/>
      });
    }
    noAnswersAlert () {
       this.refs.container.error(
         'No Answers yet!!',
         '', {
         timeOut: 2000,
         extendedTimeOut: 10000
       });
     }
    noQuestionsAlert () {
       this.refs.container.error(
         'No Questions yet!!',
         '', {
         timeOut: 2000,
         extendedTimeOut: 10000
       });
     }
    noWatchingsAlert () {
       this.refs.container.error(
         'Not Watching any Topics',
         '', {
         timeOut: 2000,
         extendedTimeOut: 10000
       });
     }
     changePicture(e) {
         this.setState({picture: e.target.value});
         if(e.key === 'Enter') {
           this.updateAbout();
         }
     }
    componentDidMount() {
        this.getProfile();
    }
    // Fetch All Info from databasex
    getProfile() {
      this.setState({
        status: 0,
        content: <BasicInfo statusMeter = {this.getProfile}/>,
        load: true
      });
      /*eslint-disable*/
      let context = this;
      /*eslint-enable*/
      let email = Cookie.load('email');
        $.ajax({
            url: '/userdoc/getuserprofile',
            type: 'POST',
            data: {email: email},
            success: function(data) {
              let status=0;
                context.setState({questionCount: data.lists.length,
                   answerCount: data.answers.length,
                     followingCount: data.followingUser.length,
                     name: data.profile.name,
                     objArray: data, load: false, picture: data.profile.picture});
                     if(data.profile.gender.length > 0 && data.profile.gender !== 'gender' &&
                     data.profile.gender.trim() !== '') {
                      status= parseInt(status, 10) + 10;
                     }
                     if(data.profile.name.length > 0 &&
                       data.profile.name !== 'name' &&
                       data.profile.name.trim() !== '') {
                         status= parseInt(status, 10) + 10;
                      }
                      if(data.profile.education.primary.length > 0 &&
                        data.profile.education.primary !== 'Primary' &&
                        data.profile.education.primary.trim() !== '') {
                          status= parseInt(status, 10) + 5;
                       }
                     if(data.profile.education.highSchool.length > 0 &&
                       data.profile.education.highSchool !== 'Secondary' &&
                       data.profile.education.highSchool.trim() !== '') {
                         status= parseInt(status, 10) + 5;
                      }
                     if(data.profile.education.university.length > 0 &&
                       data.profile.education.university !== 'University' &&
                         data.profile.education.university.trim() !== '') {
                           status= parseInt(status, 10) + 10;
                      }
                     if(data.profile.address.country.length > 0
                       && data.profile.address.country !== 'Country'
                     && data.profile.address.country.trim() !== '') {
                       status= parseInt(status, 10) + 10;
                      }
                      if(data.profile.address.Line1.length > 0
                        && data.profile.address.Line1 !== 'H.No.'
                      && data.profile.address.Line1.trim() !== '') {
                        status= parseInt(status, 10) + 5;
                      }
                      if(data.profile.address.Line2.length > 0
                        && data.profile.address.Line2 !== 'Street'
                      && data.profile.address.Line2.trim() !== '') {
                        status= parseInt(status, 10) + 5;
                      }
                     if(data.profile.address.city.length > 0
                       && data.profile.address.city !== 'City'
                     && data.profile.address.city.trim() !== '') {
                       status= parseInt(status, 10) + 5;
                     }
                     if(data.profile.address.region.length > 0
                       && data.profile.address.region !== 'State'
                     && data.profile.address.region.trim() !== '') {
                       status= parseInt(status, 10) + 5;
                     }
                     if(data.profile.address.postalCode.length > 0
                       && data.profile.address.postalCode !== 'postal Code'
                     && data.profile.address.postalCode.trim() !== '') {
                       status= parseInt(status, 10) + 5;
                     }
                     if(data.profile.dob.length > 0 && data.profile.dob !== 'dob'
                   && data.profile.dob.trim() !== '') {
                     status= parseInt(status, 10) + 10;
                     }
                     if(data.profile.phone.length > 0 && data.profile.phone !== 'Phone'
                   && data.profile.phone.trim() !== '') {
                     status= parseInt(status, 10) + 10;
                     }
                     if(data.profile.description.length > 0
                       && data.profile.description !== 'Describe About Yourself'
                     && data.profile.description.trim() !== '') {
                       status= parseInt(status, 10) + 5;
                     }
                     context.setState({status:status});
            },
            error: function() {
              // console.log('error in logout' + err);
            }
        });
        $.ajax({
            url: '/userdoc/getWatching',
            type: 'POST',
            data: {
                email: Cookie.load('email')
            },
            success: function(data) {
                // console.log(data);
                context.setState({
                  watchingData: data,
                  watchingCount: data.length
                  // setting interestData to content
                });
            },

            error: function() {
                // console.error(err.toString());
            }
        });
        $.ajax({
            url: '/userdoc/getFollowers',
            type: 'POST',
            data: {email: Cookie.load('email'), skip: 0, limit: 100},
            success: function(data) {
              context.setState({
              followerCount: data.length
            });
            },
            error: function() {
             // console.log('error in logout' + err);
            }
        });
    }
   // Fetch Interested Topics from data base
   getWatching() {
     if(this.state.watchingData.length === 0)
     {
      //#swathi setting the contentNew to null sothat it will not be displayed when the next segment is clicked
      this.setState({
      contentNew:null });
       this.noWatchingsAlert();
     }
     else{
     this.setState({
       contentNew: <WatchingCard watchingData={this.state.watchingData}/>
     });
   }
 }
 updateAbout() {
     //   // console.log(JSON.stringify(proData);
     /*eslint-disable*/
     console.log('here in picture');
     let context = this;
     /*eslint-enable*/
     $.ajax({
         url: '/userdoc/updatePicture',
         type: 'POST',
         data: {picture: this.state.picture, email: Cookie.load('email')},
         success: function() {
           context.getProfile();
         },
         error: function() {
             // console.error(err.toString());
         }
     });
 }
    render() {
        const followerCount = this.state.followerCount;
        const followingCount = this.state.followingCount;
        let profMeter = parseInt(this.state.status, 10) + '%';
        return (

            <div>

              <Segment style={{marginRight: '6.70%'}}>
                <Grid centered columns={2}>
                    <Grid.Column style={picStyle}>
                    
                      <Popup  trigger={<Image alt= 'No Image' style={imageStyle}
                        src={Cookie.load('profilepicture')}
                          size = 'small' shape='circular'/>}
                      flowing hoverable >
                      <Input onChange={this.changePicture.bind(this)} onKeyPress =
                      {this.changePicture.bind(this)}/>
                      <Button onClick = {this.updateAbout.bind(this)} content='Update'/>
                      </Popup>
                        <div style={nameStyle} onClick={this.viewInfo.bind(this)}>
                            {this.state.name}
                        </div>
                        <div style = {buttonStyle}>
                           <Button onClick={this.getFollowers.bind(this)}
                             className='butstyle'
                             content='Followers'
                             icon='user plus' label={{
                               basic: true,
                               pointing: 'left',
                               content: followerCount
                           }}/>
                           <Button onClick={this.getFollowings.bind(this)} className='butstyle'
                             content='Following'
                             icon='fork' label={{
                               basic: true,
                               pointing: 'left',
                               content: followingCount
                           }}/>
                         </div>
                    </Grid.Column>
                    <Grid.Column>
                      <div style={meterStyle}>
                        <Statistic>
                          <Statistic.Label>Profile Meter</Statistic.Label>
                          <Statistic.Value> {profMeter}
                          </Statistic.Value>
                          <Statistic.Label>completed</Statistic.Label>
                          <Chat handle = {this.getProfile.bind(this)}/>
                        </Statistic>
                        <Loader size='huge' style={{marginLeft: '180px', marginTop: '60px'}}
                          active ={this.state.load}/>
                        </div>
                    </Grid.Column>
                  </Grid>
                                     
                     </Segment>
                <div>
                    <br/>
                  <Grid>
                    <Grid.Column width = {11}>
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
<Header style ={{cursor: 'pointer'}} dividing onClick={this.getWatching.bind(this)}>
  <Header.Content>
    Watching Topics &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    &nbsp;&nbsp;&nbsp;&nbsp;{this.state.watchingCount}
  </Header.Content>

</Header>
</Segment>
                  
                  <Grid.Column width = {1}/>
                    </Grid.Column>
<Grid.Column width = {12}>
                    {this.state.contentNew}
                    </Grid.Column>
            

                    </Grid>
                  </div>
                  <ToastContainer ref='container' style ={{backgroundColor: '#B2242E'}}
                     toastMessageFactory={ToastMessageFactory}
                     className='toast-top-center' />
            </div>
        );
    }
}

module.exports = NavBarPro;
                        
          //#swathi this doesn't seem to work or I don't know how to make it work.
              
                  //       <Menu.Item name='Answers' active={activeItem === 'Answers'}
                        //       onClick={this.handleItemClick2.bind(this)}>
                        //     <Menu.Item name='Location' active={activeItem === 'Location'}
                        //       onClick={this.handleItemClick3.bind(this)}/>
                        //     <Menu.Item name='Categories'
                        //       active={activeItem === 'Categories'}
                        //       onClick={this.handleItemClick4.bind(this)}/>
                        // </Menu>
       //#swathi-commented the working code

                  // #swathi trying menu bar
                 
                  // <Menu style={{fontFamily: 'Georgia, serif'}}
                  //         fluid vertical tabular>
                  //             <Menu.Item name='Questions'
                  //               //active={activeItem === 'Questions'} 
                  //               onClick={this.getQuestions.bind(this)}/>

                  // </Menu>
                  // </Grid.Column>
                  // </Grid>
                  // <Grid>
                  //   <Grid.Column width = {11}>
                  //   {this.state.contentNew}    
