import React from 'react';
import {
  Button,
    Input,
    Dimmer,
    Loader,
    Menu,
    Grid,
    Segment,
    Popup,
    TextArea
} from 'semantic-ui-react';
import Cookie from 'react-cookie';
import InterestsCard from './interestedCategories/interestsCard';
class basicInfo extends React.Component {

    handleOpen = () => this.setState({active: true})
    handleClose = () => this.setState({active: false})
    constructor() {
        super();
        this.state = {
            loader: false,
            activeItem: '',
            primary: 'Primary School',
            secondary: 'High School',
            university: 'University',
            line1: 'H.No.',
            line2: 'Street',
            region: 'State',
            country: 'Country',
            postalCode: 'Pin Code',
            city: 'City',
            picture: '',
            description: 'About Yorself',
            dob: 'date',
            gender: '',
            phone: 'Phone',
            interestsData: [],
            profileForm: '',
            status: 0
        };

        this.handleItemClick = this.handleItemClick.bind(this);
        this.updateEducation = this.updateEducation.bind(this);
    }
    handleItemClick(e, {name}) {
        let data;
        if (name === 'Education') {
            data = (
              <div>
                  I did my schooling from <Popup on = 'click' trigger=
                      {<a style={{cursor: 'pointer'}}>{this.state.primary}</a>}
                      flowing hoverable>
                      <Input onChange={this.changePrimary.bind(this)} onKeyPress =
                      {this.changePrimary.bind(this)}/>
                      <Button onClick = {this.updateEducation} content='Update'/>
                    </Popup> . earned my degree <br/> from <Popup on = 'click'
                        trigger={<a style={{cursor: 'pointer'}}>{this.state.university}</a>}
                       flowing hoverable>
                       <Input onChange={this.changeSecondary.bind(this)} onKeyPress =
                       {this.changeSecondary.bind(this)}/>
                       <Button onClick = {this.updateEducation} content='Update'/>
                       </Popup> . and completed the high schooling from <Popup on = 'click' trigger=
                      {<a style={{cursor: 'pointer'}}>{this.state.secondary}</a>}
                    flowing hoverable>
                    <Input onChange={this.changeUniversity.bind(this)} onKeyPress =
                    {this.changeUniversity.bind(this)}/>
                    <Button onClick = {this.updateEducation} content='Update'/>
                    </Popup>
                    </div>
                          );
        } else if (name === 'Location') {
            data = (

              <div>
                  I Live at <Popup on = 'click' trigger=
                    {<a style={{cursor: 'pointer'}}>{this.state.line1}</a>}
                      flowing hoverable>
                      <Input onChange={this.changeLine1.bind(this)} onKeyPress =
                      {this.changeLine1.bind(this)}/>
                      <Button onClick = {this.updateLocation.bind(this)} content='Update'/>
                    </Popup><br/>, <Popup on = 'click' trigger=
                      {<a style={{cursor: 'pointer'}}>{this.state.line2}</a>}
                       flowing hoverable>
                       <Input onChange={this.changeLine2.bind(this)} onKeyPress =
                       {this.changeLine2.bind(this)}/>
                       <Button onClick = {this.updateLocation.bind(this)} content='Update'/>
                     </Popup>. in <Popup on = 'click' trigger=
                      {<a style={{cursor: 'pointer'}}>{this.state.city}</a>}
                    flowing hoverable>
                    <Input onChange={this.changeCity.bind(this)} onKeyPress =
                    {this.changeCity.bind(this)}/>
                    <Button onClick = {this.updateLocation.bind(this)} content='Update'/>
                    </Popup>. in <Popup on = 'click' trigger=
                     {<a style={{cursor: 'pointer'}}>{this.state.region}</a>}
                   flowing hoverable>
                   <Input onChange={this.changeRegion.bind(this)}/>
                   <Button onClick = {this.updateLocation.bind(this)} content='Update'/>
                 </Popup>. postalCode: <Popup on = 'click' trigger=
                    {<a style={{cursor: 'pointer'}}>{this.state.postalCode}</a>}
                  flowing hoverable>
                  <Input onChange={this.changePostalCode.bind(this)} onKeyPress =
                  {this.changePostalCode.bind(this)}/>
                  <Button onClick = {this.updateLocation.bind(this)} content='Update'/>
                  </Popup> <Popup on = 'click' trigger=
                   {<a style={{cursor: 'pointer'}}>{this.state.country}</a>}
                 flowing hoverable>
                 <Input onChange={this.changeCountry.bind(this)} onKeyPress =
                 {this.changeCountry.bind(this)}/>
                 <Button onClick = {this.updateLocation.bind(this)} content='Update'/>
                 </Popup>
              </div>
            );
        } else if (name === 'Personal') {
            data = (
              <div>
                      <Popup on = 'click' trigger={<a style={{cursor: 'pointer'}}>
                        {this.state.description}</a>}
                      flowing hoverable>
                      <TextArea onChange={this.changeDescription.bind(this)}/>
                      <Button onClick = {this.updateAbout.bind(this)} content='Update'/>
                    </Popup><br/> born on <Popup on = 'click' trigger=
                      {<a style={{cursor: 'pointer'}}>{this.state.dob}</a>}
                       flowing hoverable>
                       <Input onChange={this.changeDob.bind(this)} onKeyPress =
                       {this.changeDob.bind(this)}/>
                       <Button onClick = {this.updateAbout.bind(this)} content='Update'/>
                     </Popup>. My Phone number is <Popup on = 'click' trigger=
                      {<a style={{cursor: 'pointer'}}>{this.state.phone}</a>}
                    flowing hoverable>
                    <Input onChange={this.changePhone.bind(this)} onKeyPress =
                    {this.changePhone.bind(this)}/>
                    <Button onClick = {this.updateAbout.bind(this)} content='Update'/>
                    </Popup>
              </div>
            );
        } else if (name === 'Interested Topics') {
            data = (<InterestsCard interestData={this.state.interestsData}/>);
        }
        this.setState({activeItem: name, profileForm: data});

//         let data;
//         if (name === 'Education') {
//             data = (
//               <div>
//                 <Form action='#/profile'>
//   <Form.Field>
//     <label>Primary</label>
//     <Input size = 'small' placeholder={this.state.primary}
//       onChange={this.changePrimary.bind(this)}/>
//   </Form.Field>
//   <Form.Field>
//     <label>Secondary</label>
//     <Input placeholder={this.state.secondary} onChange={this.changeSecondary.bind(this)} />
//   </Form.Field>
//   <Form.Field>
//     <label>University</label>
//     <Input placeholder={this.state.university} onChange={this.changeUniversity.bind(this)} />
//   </Form.Field>
// </Form>
// <Button onClick = {this.updateEducation.bind(this)}>Update</Button>
//               </div>
//                           );
//         } else if (name === 'Location') {
//             data = (
//
//               <div>
//                 <Form>
//                         <Form.Field>
//                             <label>Line1</label>
//                             <Input onChange={this.changeLine1.bind(this)}
                                // placeholder={this.state.line1}/>
//                         </Form.Field>
//                         <Form.Field>
//                             <label>Line2</label>
//                             <Input onChange={this.changeLine2.bind(this)}
//                              placeholder={this.state.line2}/>
//                         </Form.Field>
//                         <Form.Field>
//                             <label>City</label>
//                             <Input onChange={this.changeCity.bind(this)}
// placeholder={this.state.city}/>
//                         </Form.Field>
//                         <Form.Field>
//                             <label>Region</label>
//                             <Input onChange={this.changeRegion.bind(this)}
                                // placeholder={this.state.region}/>
//                         </Form.Field>
//                         <Form.Field>
//                             <label>Postal Code</label>
//                             <Input onChange={this.changePostalCode.bind(this)}
// placeholder={this.state.postalCode}/>
//                         </Form.Field>
//                         <Form.Field>
//                             <label>Country</label>
//                             <Input onChange={this.changeCountry.bind(this)}
  // placeholder={this.state.country}/>
//                         </Form.Field>
//                     </Form>
//                     <Button onClick={this.updateLocation.bind(this)}>Update</Button>
//               </div>
//             );
//         } else if (name === 'Personal') {
//             data = (
//               <div>
//                     <Form action='?#/profile'>
//                         <Form.Field>
//                             <label>Picture</label>
//                             <Input placeholder={this.state.picture}
// onChange={this.changePhoto.bind(this)}/>
//                         </Form.Field>
//                         <Form.TextArea label='Description'
// placeholder={this.state.description} onChange={this.changeDescription.bind(this)}/>
//                         <Form.Field>
//                             <label>Date Of Birth</label>
//                             <Input placeholder={this.state.dob}
// onChange={this.changeDob.bind(this)}/>
//                         </Form.Field>
//                         <Form.Field>
//                             <label>Gender</label>
//                             <Input placeholder={this.state.gender}
 // onChange={this.changeGender.bind(this)}/>
//                         </Form.Field>
//                         <Form.Field>
//                             <label>Phone</label>
//                             <Input placeholder={this.state.phone}
// onChange={this.changePhone.bind(this)}/>
//                         </Form.Field>
//                     </Form>
//                     <Button onClick={this.updateAbout.bind(this)}>Update</Button>
//                 </div>
//             );
//         } else if (name === 'Interested Topics') {
//             data = (<InterestsCard interestData={this.state.interestsData}/>);
//         }
//         this.setState({activeItem: name, profileForm: data});
    }
    changePrimary(e) {
        this.setState({primary: e.target.value});
        if(e.key === 'Enter') {
          this.updateEducation();
        }
    }
    changeSecondary(e) {
        this.setState({secondary: e.target.value});
        if(e.key === 'Enter') {
          this.updateEducation();
        }
    }
    changeUniversity(e) {
        this.setState({university: e.target.value});
        if(e.key === 'Enter') {
          this.updateEducation();
        }
    }
    changeLine1(e) {
        this.setState({line1: e.target.value});
        if(e.key === 'Enter') {
          this.updateLocation();
        }
    }
    changeLine2(e) {
        this.setState({line2: e.target.value});
        if(e.key === 'Enter') {
          this.updateLocation();
        }
    }
    changeCountry(e) {
        this.setState({country: e.target.value});
        if(e.key === 'Enter') {
          this.updateLocation();
        }
    }
    changeRegion(e) {
        this.setState({region: e.target.value});
        if(e.key === 'Enter') {
          this.updateLocation();
        }
    }
    changeCity(e) {
        this.setState({city: e.target.value});
        if(e.key === 'Enter') {
          this.updateLocation();
        }
    }
    changePostalCode(e) {
        this.setState({postalCode: e.target.value});
        if(e.key === 'Enter') {
          this.updateLocation();
        }
    }
    changePhoto(e) {
        this.setState({picture: e.target.value});
        if(e.key === 'Enter') {
          this.updateLocation();
        }
    }
    changeDescription(e) {
        this.setState({description: e.target.value});
        if(e.key === 'Enter') {
          this.updateAbout();
        }
    }
    changeDob(e) {
        this.setState({dob: e.target.value});
        if(e.key === 'Enter') {
          this.updateAbout();
        }
    }
    changeGender(e) {
        this.setState({gender: e.target.value});
        if(e.key === 'Enter') {
          this.updateAbout();
        }
    }
    changePhone(e) {
        this.setState({phone: e.target.value});
        if(e.key === 'Enter') {
          this.updateAbout();
        }
    }
    handleChange = (e, {value}) => this.setState({value})
    componentWillMount() {
        // console.log("comes");
        this.handleOpen();
        this.getProfile();
        this.getInterestedTopics();
        let tmp = (<h1>Welcome to Zynla Profile.<br/> Choose an option from menu </h1>);
        this.setState({
          profileForm: tmp
        });
    }
    getProfile() {
            $.ajax({
            url: 'http://localhost:8080/userdoc/getuserprofile',
            type: 'post',
            data: {
                email: Cookie.load('email')
            },
            success: function(data) {
                this.handleClose();
                if (data.profile.education.primary || data.profile.education.highschool ||
                  data.profile.education.university) {
                    this.setState({
                        primary: data.profile.education.primary,
                        secondary: data.profile.education.highSchool,
                        university: data.profile.education.university
                    });
                } else {
                    this.setState({
                    primary: data.profile.education.primary,
                    secondary: data.profile.education.highSchool,
                    university: data.profile.education.university});
                }

                if (data.profile.address.Line1 || data.profile.address.Line2 ||
                  data.profile.address.country || data.profile.address.region ||
                  data.profile.address.city || data.profile.address.postalCode) {
                    this.setState({
                        line1: data.profile.address.Line1,
                        line2: data.profile.address.Line2,
                        country: data.profile.address.country,
                        region: data.profile.address.region,
                        city: data.profile.address.city,
                        postalCode: data.profile.address.postalCode
                        });
                } else {
                    this.setState({
                        line1: data.profile.address.Line1,
                        line2: data.profile.address.Line2,
                        country: data.profile.address.country,
                        region: data.profile.address.region,
                        city: data.profile.address.city,
                        postalCode: data.profile.address.postalCode
                    });
                }
                if (data.profile.picture || data.profile.description ||
                  data.profile.dob || data.profile.gender || data.profile.phone) {
                    this.setState({
                        picture: data.profile.picture,
                        description: data.profile.description,
                        dob: data.profile.dob,
                        gender: data.profile.gender,
                        phone: data.profile.phone
                        });
                } else {
                    this.setState({
                        picture: data.profile.picture,
                        description: data.profile.description,
                        dob: data.profile.dob,
                        gender: data.profile.gender,
                        phone: data.profile.phone
                    });
                }
            }.bind(this),
            error: function() {

            }
        });
    }
    updateEducation() {
        let eduData = {
            primary: this.state.primary,
            highSchool: this.state.secondary,
            university: this.state.university,
            emailId: Cookie.load('email')
          };
            $.ajax({
            url: 'http://localhost:8080/userdoc/updateEdu',
            type: 'POST',
            data: eduData,
            success: function() {
              this.handleItemClick(this, 'Education');
                this.setState({loader: false});
                /*eslint-disable*/
                alert("Education Details Updated Successfully");
                /*eslint-enable*/
                // console.log(data);
            }.bind(this),
            error: function() {
                // console.error(err.toString());
            }
        });
      }
    updateLocation() {
        let locData = {
            Line1: this.state.line1,
            Line2: this.state.line2,
            country: this.state.country,
            region: this.state.region,
            city: this.state.city,
            postalCode: this.state.postalCode,
            email: Cookie.load('email')
        };
        // let context = this;
        //   // console.log(JSON.stringify(locData);
        $.ajax({
            url: 'http://localhost:8080/userdoc/updateLoc',
            type: 'POST',
            data: locData,
            success: function() {
                          /*eslint-disable*/
                // alert("Location Details Updated Successfully");
                /*eslint-enable*/
                // console.log(data);
            },
            error: function() {
                // console.error(err.toString());
            }
        });
    }

    updateAbout() {
        let proData = {

            picture: this.state.picture,
            description: this.state.description,
            dob: this.state.dob,
            gender: this.state.gender,
            phone: this.state.phone,
            email: Cookie.load('email')
        };
        //   // console.log(JSON.stringify(proData);
        $.ajax({
            url: 'http://localhost:8080/userdoc/updatePro',
            type: 'POST',
            data: proData,
            success: function() {
              // console.log(this.state.description);
                // this.setState({but2: 'Edit', AbtTitle: 'Edit Profile',
                // description: this.state.description});
                /*eslint-disable*/
                // alert("Personal Details Updated Successfully");
                /*eslint-enable*/
                // console.log(data);
            },
            error: function() {
                // console.error(err.toString());
            }
        });
    }
    getInterestedTopics() {
        $.ajax({
            url: 'http://localhost:8080/userdoc/getInterestedTopics',
            type: 'POST',
            data: {
                email: Cookie.load('email')
            },
            success: function(data) {
                this.setState({interestsData: data});
            }.bind(this),
            error: function() {
                // console.error(err.toString());
            }
        });
    }

    render() {
        const {active} = this.state;
        const {activeItem} = this.state;

        return (

                      <div>

                <Dimmer active={active} page>
                    <Loader>Loading</Loader>
                </Dimmer>
                <Grid>
                    <Grid.Column width={4}>

                        <Menu style={{fontFamily: 'Georgia, serif'}}
                          fluid vertical tabular>
                              <Menu.Item name='Personal'
                                active={activeItem === 'Personal'}
                                onClick={this.handleItemClick}/>
                              <Menu.Item name='Education' active={activeItem === 'Education'}
                              onClick={this.handleItemClick}/>
                            <Menu.Item name='Location' active={activeItem === 'Location'}
                              onClick={this.handleItemClick}/>
                            <Menu.Item name='Interested Topics'
                              active={activeItem === 'Interested Topics'}
                              onClick={this.handleItemClick}/>
                        </Menu>
                    </Grid.Column>
                    <Grid.Column stretched width={12}>
                        <Segment style={{fontWeight: '600', fontSize: '20px', lineHeight: '25px'}}>
                          <br/>
                            {this.state.profileForm}
                        </Segment>
                    </Grid.Column>
                </Grid>
            </div>
        );
    }
}
module.exports = basicInfo;
