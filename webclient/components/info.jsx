import React from 'react';
import {
    Icon,
    Button,
    Form,
    Input,
    Accordion
} from 'semantic-ui-react';
let infoStyle = {
  marginLeft: '20%'
};

class info extends React.Component {
    constructor() {
        super();
        this.state = {
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
    this.getProfile();
  }
  getProfile() {
    $.ajax({
        url: 'http://localhost:8080/userdoc/getuserprofile',
        type: 'GET',
        success: function(data) {
          if(data[0].profile.education.primary.length > 1 ||
            data[0].profile.education.highschool.length > 1 ||
            data[0].profile.education.university.length > 1)
          {
              this.setState({but: 'Edit', EduTitle: 'Edit Education',
                primaryLabel: data[0].profile.education.primary,
                secondaryLabel: data[0].profile.education.highSchool,
                universityLabel: data[0].profile.education.university});
          }
          else
          {
            this.setState({but: 'Add', EduTitle: 'Add Education',
              primaryLabel: data[0].profile.education.primary,
              secondaryLabel: data[0].profile.education.highSchool,
              universityLabel: data[0].profile.education.university});
          }

          if(data[0].profile.address.Line1.length > 1 ||
            data[0].profile.address.Line2.length > 1 ||
            data[0].profile.address.country.length > 1 ||
            data[0].profile.address.region.length > 1 ||
            data[0].profile.address.city.length > 1 ||
            data[0].profile.address.postalCode.length > 1)
          {
                this.setState({but1: 'Edit', LocTitle: 'Edit Location',
                  line1Label: data[0].profile.address.Line1,
                  line2Lable: data[0].profile.address.Line2,
                  countryLabel: data[0].profile.address.country,
                  regionLabel: data[0].profile.address.region,
                  cityLabel: data[0].profile.address.city,
                  postalCodeLabel: data[0].profile.address.postalCode});
          }
          else
          {
            this.setState({but1: 'Submit', LocTitle: 'Add Location',
              line1Label: data[0].profile.address.Line1,
              line2Lable: data[0].profile.address.Line2,
              countryLabel: data[0].profile.address.country,
              regionLabel: data[0].profile.address.region,
              cityLabel: data[0].profile.address.city,
              postalCodeLabel: data[0].profile.address.postalCode});
          }
          if(data[0].profile.picture.length > 1 ||
            data[0].profile.description.length > 1 ||
            data[0].profile.dob.length > 1 ||
            data[0].profile.gender.length > 1 ||
            data[0].profile.phone.length > 1)
          {
                this.setState({but2: 'Edit', AbtTitle: 'Edit About Yourself',
                  pictureLabel: data[0].profile.picture,
                  descriptionLabel: data[0].profile.description,
                  dobLabel: data[0].profile.dob,
                  genderLabel: data[0].profile.gender,
                  phoneLabel: data[0].profile.phone});
          }
          else
          {
                  this.setState({but2: 'Submit', AbtTitle: 'Add Profile',
                    pictureLabel: data[0].profile.picture,
                    descriptionLabel: data[0].profile.description,
                    dobLabel: data[0].profile.dob, genderLabel: data[0].profile.gender,
                    phoneLabel: data[0].profile.phone});
          }
          // console.log(this.state);
        }.bind(this),
        error: function() {
            // console.log('error in logout'+err);
        }
    });
  }
   updateEducation() {
   let eduData = {

     primary: this.state.primary,
     highSchool: this.state.secondary,
     university: this.state.university
   };
//   // console.log(JSON.stringify(eduData);
   $.ajax({
     url: 'http://localhost:8080/userdoc/updateEdu',
     type: 'POST',
     data: eduData,
     success: function() {
      this.setState({but: 'Edit', EduTitle: 'Edit Education'});
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
     postalCode: this.sate.postalCode
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
     phone: this.state.phone

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
    render() {
       // const { value } = this.state
        return (
          <div style = {infoStyle}>
           <Accordion>
    <Accordion.Title>
      <Icon name='dropdown' />
      {this.state.EduTitle}
    </Accordion.Title>
    <Accordion.Content>
     <Form>
    <Form.Field>
      <label>Primary</label>
      <Input placeholder={this.state.primaryLabel} onChange={this.changePrimary.bind(this)}/>
    </Form.Field>
    <Form.Field>
      <label>Secondary</label>
      <Input placeholder={this.state.secondaryLabel} onChange={this.changeSecondary.bind(this)} />
    </Form.Field>
    <Form.Field>
      <label>University</label>
      <Input placeholder={this.state.universityLabel} onChange={this.changeUniversity.bind(this)} />
    </Form.Field>
    <Button onClick = {this.updateEducation.bind(this)}>{this.state.but}</Button>
  </Form>
    </Accordion.Content>

     <Accordion.Title>
      <Icon name='dropdown' />
      {this.state.LocTitle}
    </Accordion.Title>
    <Accordion.Content>
     <Form>
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
    <Button onClick = {this.updateLocation.bind(this)}>{this.state.but1}</Button>
  </Form>
    </Accordion.Content>
     <Accordion.Title>
      <Icon name='dropdown' />
      {this.state.AbtTitle}
    </Accordion.Title>
    <Accordion.Content>
     <Form>
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
    <Button onClick = {this.updateAbout.bind(this)}>{this.state.but2}</Button>
  </Form>
    </Accordion.Content>
  </Accordion>

            </div>
        );
    }
}
module.exports = info;
