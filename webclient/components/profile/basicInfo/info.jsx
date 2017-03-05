import React from 'react';
import {
    Icon,
    Button,
    Form,
    Input,
    Accordion,
    Dimmer,
    Loader
} from 'semantic-ui-react';
import Cookie from 'react-cookie';
let infoStyle = {
  marginLeft: '20%'
};
import InterestsCard from './interestedCategories/interestsCard';
class info extends React.Component {
  state = {}

handleOpen = () => this.setState({ active: true })
handleClose = () => this.setState({ active: false })
    constructor() {
        super();
        this.state = {
          editEduIcon: '',
          editLocIcon: '',
          editAbtIcon: '',
          primary: '',
          secondary: '',
          university: '',
          line1: '',
          line2: '',
          region: '',
          country: '',
          postalCode: '',
          city: '',
          picture: '',
          description: '',
          dob: '',
          gender: '',
          phone: '',
          interestsData: [],
          but: 'Submit',
          but1: 'Submit',
          but2: 'Submit',
          EduTitle: 'Add Education',
          LocTitle: 'Add Location',
          AbtTitle: 'Add about yourself',
          primaryLabel: '',
          secondaryLabel: '',
          universityLabel: '',
          line1Label: '',
          line2Lable: '',
          countryLabel: '',
          regionLabel: '',
          cityLabel: '',
          postalCodeLabel: '',
          pictureLabel: '',
          descriptionLabel: '',
          dobLabel: '',
          genderLabel: '',
          phoneLabel: ''
        };
    }
    changePrimary(e) {
      this.setState({primary: e.target.value});
    }
    changeSecondary(e) {
      this.setState({secondary: e.target.value});
    }
     changeUniversity(e) {
      this.setState({university: e.target.value});
    }
    changeLine1(e) {
      this.setState({line1: e.target.value});
    }
    changeLine2(e) {
      this.setState({line2: e.target.value});
    }
    changeCountry(e) {
      this.setState({country: e.target.value});
    }
    changeRegion(e) {
      this.setState({region: e.target.value});
    }
    changeCity(e) {
      this.setState({city: e.target.value});
    }
    changePostalCode(e) {
      this.setState({postalCode: e.target.value});
    }
    changePhoto(e) {
      this.setState({picture: e.target.value});
    }
    changeDescription(e) {
      this.setState({description: e.target.value});
    }
    changeDob(e) {
      this.setState({dob: e.target.value});
    }
    changeGender(e) {
      this.setState({gender: e.target.value});
    }
    changePhone(e) {
      this.setState({phone: e.target.value});
    }
  state = {}
  handleChange = (e, { value }) => this.setState({ value })
    componentWillMount() {
    // console.log("comes");
    this.handleOpen();
    this.getProfile();
    this.getInterestedTopics();
  }
  getProfile() {
    $.ajax({
        url: 'http://localhost:8080/userdoc/getuserprofile',
        type: 'post',
        data: {email: Cookie.load('email')},
        success: function(data) {
          this.handleClose();
          if(data.profile.education.primary.length > 1 ||
            data.profile.education.highschool.length > 1 ||
            data.profile.education.university.length > 1)
          {
              this.setState({but: 'Edit', EduTitle: 'Edit Education',
                primaryLabel: data.profile.education.primary,
                secondaryLabel: data.profile.education.highSchool,
                universityLabel: data.profile.education.university,
                editEduIcon: 'write square'});
          }
          else
          {
            this.setState({but: 'Add', EduTitle: 'Add Education',
              primaryLabel: data.profile.education.primary,
              secondaryLabel: data.profile.education.highSchool,
              universityLabel: data.profile.education.university});
          }

          if(data.profile.address.Line1.length > 1 ||
            data.profile.address.Line2.length > 1 ||
            data.profile.address.country.length > 1 ||
            data.profile.address.region.length > 1 ||
            data.profile.address.city.length > 1 ||
            data.profile.address.postalCode.length > 1)
          {
                this.setState({but1: 'Edit', LocTitle: 'Edit Location',
                  line1Label: data.profile.address.Line1,
                  line2Lable: data.profile.address.Line2,
                  countryLabel: data.profile.address.country,
                  regionLabel: data.profile.address.region,
                  cityLabel: data.profile.address.city,
                  postalCodeLabel: data.profile.address.postalCode,
                  editLocIcon: 'write square'});
          }
          else
          {
            this.setState({but1: 'Submit', LocTitle: 'Add Location',
              line1Label: data.profile.address.Line1,
              line2Lable: data.profile.address.Line2,
              countryLabel: data.profile.address.country,
              regionLabel: data.profile.address.region,
              cityLabel: data.profile.address.city,
              postalCodeLabel: data.profile.address.postalCode});
          }
          if(data.profile.picture.length > 1 ||
            data.profile.description.length > 1 ||
            data.profile.dob.length > 1 ||
            data.profile.gender.length > 1 ||
            data.profile.phone.length > 1)
          {
                this.setState({but2: 'Edit', AbtTitle: 'Edit About Yourself',
                  pictureLabel: data.profile.picture,
                  descriptionLabel: data.profile.description,
                  dobLabel: data.profile.dob,
                  genderLabel: data.profile.gender,
                  phoneLabel: data.profile.phone,
                  editAbtIcon: 'write square'});
          }
          else
          {
                  this.setState({but2: 'Submit', AbtTitle: 'Add Profile',
                    pictureLabel: data.profile.picture,
                    descriptionLabel: data.profile.description,
                    dobLabel: data.profile.dob, genderLabel: data.profile.gender,
                    phoneLabel: data.profile.phone});
          }
        }.bind(this),
        error: function() {
            // console.log('error in logout'+err);
        }
    });
  }
   updateEducation() {
     let primaryData;
     let highSchoolData;
     let universityData;
     if (this.state.primary === '') {
       primaryData = this.state.primaryLabel;
     }
     else {
       primaryData = this.state.primary;
     }
     if (this.state.secondary === '') {
       highSchoolData = this.state.secondaryLabel;
     }
     else {
       highSchoolData = this.state.secondary;
     }
     if (this.state.university === '') {
       universityData = this.state.universityLabel;
     }
     else {
       universityData = this.state.university;
     }
   let eduData = {
     primary: primaryData,
     highSchool: highSchoolData,
     university: universityData,
     emailId: Cookie.load('email')
   };
//   // console.log(JSON.stringify(eduData);
   $.ajax({
     url: 'http://localhost:8080/userdoc/updateEdu',
     type: 'POST',
     data: eduData,
     success: function() {
      this.setState({but: 'Edit', EduTitle: 'Edit Education', editIcon: 'write square'});
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
     postalCode: this.sate.postalCode,
     emailId: Cookie.load('email')
   };
//   // console.log(JSON.stringify(locData);
   $.ajax({
     url: 'http://localhost:8080/userdoc/updateLoc',
     type: 'POST',
     data: locData,
     success: function() {
      this.setState({but: 'Edit', EduTitle: 'Edit Location'});
         // console.log(data);
       }.bind(this),
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
     emailId: Cookie.load('email')
   };
//   // console.log(JSON.stringify(proData);
   $.ajax({
     url: 'http://localhost:8080/userdoc/updatePro',
     type: 'POST',
     data: proData,
     success: function() {
      this.setState({but2: 'Edit', AbtTitle: 'Edit Profile'});
         // console.log(data);
       }.bind(this),
     error: function() {
         // console.error(err.toString());
       }
   });
 }
 getInterestedTopics() {
   $.ajax({
     url: 'http://localhost:8080/userdoc/getInterestedTopics',
     type: 'POST',
     data: {email: Cookie.load('email')},
     success: function(data) {
      this.setState({interestsData: data});
       }.bind(this),
     error: function() {
         // console.error(err.toString());
       }
   });
 }
    render() {
        const { active } = this.state;
        return (
          <div style = {infoStyle}>
            <Dimmer active={active} page>
            <Loader>Loading</Loader>
          </Dimmer>
           <Accordion>
    <Accordion.Title>
      <h1><Icon name='dropdown' />
      {this.state.EduTitle}</h1>
    </Accordion.Title>

    <Accordion.Content>
     <Form action='#'>
    <Form.Field>
      <label>Primary</label>
      <Input size = 'small' placeholder={this.state.primaryLabel}
        onChange={this.changePrimary.bind(this)}/>
    </Form.Field>
    <Form.Field>
      <label>Secondary</label>
      <Input placeholder={this.state.secondaryLabel} onChange={this.changeSecondary.bind(this)} />
    </Form.Field>
    <Form.Field>
      <label>University</label>
      <Input placeholder={this.state.universityLabel} onChange={this.changeUniversity.bind(this)} />
    </Form.Field>
    <Button onClick = {this.updateEducation.bind(this)}>
    <Icon name= {this.state.editEduIcon}/>{this.state.but}</Button>
  </Form>
    </Accordion.Content>
     <Accordion.Title>
      <h1><Icon name='dropdown' />
      {this.state.LocTitle}</h1>
    </Accordion.Title>
    <Accordion.Content>
     <Form action='#'>
    <Form.Field>
      <label>Line1</label>
      <Input onChange = {this.changeLine1.bind(this)} placeholder={this.state.line1Label} />
    </Form.Field>
    <Form.Field>
      <label>Line2</label>
      <Input onChange = {this.changeLine2.bind(this)} placeholder={this.state.line2Lable} />
    </Form.Field>
    <Form.Field>
      <label>City</label>
      <Input onChange = {this.changeCity.bind(this)} placeholder={this.state.cityLabel} />
    </Form.Field>
    <Form.Field>
      <label>Region</label>
      <Input onChange = {this.changeRegion.bind(this)} placeholder={this.state.regionLabel} />
    </Form.Field>
    <Form.Field>
      <label>Postal Code</label>
      <Input onChange = {this.changePostalCode.bind(this)}
      placeholder={this.state.postalCodeLabel} />
    </Form.Field>
    <Form.Field>
      <label>Country</label>
      <Input onChange = {this.changeCountry.bind(this)} placeholder={this.state.countryLabel} />
    </Form.Field>
    <Button onClick = {this.updateLocation.bind(this)}><Icon name= {this.state.editLocIcon}/>
    {this.state.but1}</Button>
  </Form>
    </Accordion.Content>
     <Accordion.Title>
      <h1><Icon name='dropdown' />
    {this.state.AbtTitle}</h1>
    </Accordion.Title>
    <Accordion.Content>
     <Form action='#'>
     <Form.Field>
      <label>Picture</label>
      <Input placeholder={this.state.pictureLabel} onChange = {this.changePhoto.bind(this)} />
    </Form.Field>
    <Form.TextArea label='Description' placeholder={this.state.descriptionLabel}
    onChange = {this.changeDescription.bind(this)}/>
    <Form.Field>
      <label>Date Of Birth</label>
      <Input placeholder={this.state.dobLabel} onChange = {this.changeDob.bind(this)} />
    </Form.Field>
    <Form.Field>
      <label>Gender</label>
      <Input placeholder={this.state.genderLabel} onChange = {this.changeGender.bind(this)} />
    </Form.Field>
        <Form.Field>
      <label>Phone</label>
      <Input placeholder={this.state.phoneLabel} onChange = {this.changePhone.bind(this)}/>
    </Form.Field>
    <Button onClick = {this.updateAbout.bind(this)}>
      <Icon name= {this.state.editAbtIcon}/>{this.state.but2}</Button>
  </Form>
    </Accordion.Content>
     <Accordion.Title>
      <h1><Icon name='dropdown' />
    Interested Categories</h1>
    </Accordion.Title>
  <Accordion.Content>
       <InterestsCard interestData={this.state.interestsData}/>
    </Accordion.Content>
  </Accordion>

            </div>
        );
    }
}
module.exports = info;
