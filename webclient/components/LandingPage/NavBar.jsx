import React, {Component} from 'react';
import {
    Header,
    Container,
    Menu,
    Grid,
    Image,
    Button,
    Dropdown,
    Modal,
    Popup,
    Icon,
    Form
} from 'semantic-ui-react';
import {Link} from 'react-router';
import Cookie from 'react-cookie';
import validator from 'validator';
// const logger = require('./../../applogger');
import Textarea from 'react-textarea-autosize';
import {Route, Router, hashHistory} from 'react-router';
let Cards = require('./Home');
let Invite = require('./../Invite');
let Profile = require('./../profile/NavBarpro');
let Questions = require('./../answerbutton/questions.jsx');
let Answerpage = require('./../cardAnswerPage/answerPage.jsx');
let Search = require('./../search/search.jsx');

let style = {
    height: 0
};
let Style = {
    marginTop: '5px',
    marginBottom: '5px'
};

class NavBar extends Component {
    state = {
        visible: false,
        open: false,
        heading: '',
        statement: '',
        Concept: '',
        suggestedQuestions: [],
        allQuestionIntentArr: [],
        questionIntent: '',
        questionKey: '',
        questionName: [],
        selectedConcepts: [],
        searchQuery: ''
    }

    componentWillMount() {
        style = {
            height: $(window).height()
        };
    }

    toggleVisibility = () => {
        this.setState({
            visible: !this.state.visible
        });
    }

    toggleSideBar() {
        if (this.state.visible) {
            this.setState({
                visible: !this.state.visible
            });
        }
    }

    callAlert() {
      /*eslint-disable*/
      alert('please login or signup to con');
      /*eslint-enable*/
    }

    handlePostQuestionClick() {
      /*eslint-disable*/
      let context = this;
      /*eslint-enable*/
        if(Cookie.load('email')) {
          this.setState({active: true});
          $.ajax({
            url: 'http://localhost:8080/list/getQuestionIntent/',
            type: 'GET',
            success: function(res) {
                context.setState({allQuestionIntentArr: res});
            },
            error: function() {
            }
        });
        }
        else {
          this.callAlert();
        }
    }

    handleDimmerClose() {
        this.setState({active: false});
    }

    handleItemClick = (e, {name}) => {
        this.setState({activeItem: name});
        if (this.state.visible) {
            this.toggleVisibility();
        }
    }
    inputofHeading() {
      let val = document.getElementById('input').value;
      let opts = document.getElementById('questionName').childNodes;
      let questionName1 = this.state.questionName;
      // console.log(questionName1);
      for (let i = 0; i < opts.length; i = i + 1) {
        if (opts[i].value === val) {
          for(let j in questionName1) {
            /*eslint-disable*/
            if(questionName1[j].qName === opts[i].value) {
              /*eslint-enable*/
              // alert(questionName1[j].qId);
              this.setState({active: false});
              let id = questionName1[j].qId;
              hashHistory.push('/answerPage?id=' + id);
              break;
            }
          }
        }
      }
    }
    changeQuestionVal(e)
    {
      // let h = e.target.value;
      let context;
      /*eslint-disable*/
      context = this;
      /*eslint-enable*/
      this.setState({questionKey: e});
      // console.log('The event is ' + e);
      // console.log('inside change question value function ' + this.state.questionKey);
      $.ajax({
          url: '/list/getIdWithQuestion',
          type: 'get',
          success: function(data) {
            // console.log(JSON.stringify(data));
              context.setState({questionName: data});
          },
          error: function() {}
      });
      let b = e.toLowerCase();
      let option = '';
      let questionNames = this.state.questionName;
      // console.log(questionNames[0]);
      for(let i = 0; i < questionNames.length; i = i + 1) {
        if(questionNames[i].qName.toLowerCase().indexOf(b) === 0) {
          option = option + '<option value="' + questionNames[i].qName + '"/>';
        }
      }
    document.getElementById('questionName').innerHTML = option;
    option = '';
    this.setState({questionKey: ''});
    }
    updateHeading(evt) {
      // gets the particular heading and gets the intent from that heading
      this.changeQuestionVal(evt.target.value);
      this.setState({heading: evt.target.value});
      let question = evt.target.value.toLowerCase();
      let allQuestionIntents = this.state.allQuestionIntentArr;
      for(let i in allQuestionIntents) {
        if(i !== null) {
          allQuestionIntents[i].toLowerCase();
          if(allQuestionIntents[i].includes(question)) {
            this.setState({questionIntent: allQuestionIntents[i]});
            break;
          }
          else {
            continue;
          }
        }
      }
    }
    updateStatement(evt) {
      // gets the statement and changes the state
        this.setState({statement: evt.target.value});
    }

    updateConcept(evt) {
        let arr = [];
        this.setState({Concept: evt.target.value});
        // ajax call to get the concepts from the neo4j based on particular keywoard
        $.ajax({
            url: 'http://localhost:8080/list/getconcepts/',
            type: 'POST',
            data: {
              q: evt.target.value
            },
            success: function(data) {
               for(let i in data) {
                 if(i !== null) {
                    arr.push({key: data[i], value: data[i], text: data[i]});
                 }
               }
               this.setState({
                 suggestedQuestions: arr
               });
            }.bind(this),
           error: function() {
           }
      });
    }

    updateQuestionTags(evt, result) {
      // gets the all question tags and stores in an array
      this.setState({selectedConcepts: result.value});
    }

    updatesearchQuery(evt, result) {
      let res = result.value.toString();
      this.setState({
        searchQuery: res
      });
    }

    submitStatement() {
        // ajax call after submitting the values which needed to be asked
        let conceptArr = {};
        let email = Cookie.load('email');
        conceptArr = JSON.stringify(this.state.selectedConcepts);
        // console.log("Inside submit statement question intent is " + this.state.questionIntent);
        if(validator.isEmpty(this.state.heading)) {
          document.getElementById('errorMessage').innerHTML =
          'Please enter the question name';
        }
        else if(validator.isEmpty(this.state.statement)) {
          document.getElementById('errorMessage').innerHTML =
          'Please enter the Description of that question';
        }
        else if(conceptArr.length <= 10) {
          document.getElementById('errorMessage').innerHTML =
          'Please select atleast one concept';
        }
        else {
          document.getElementById('errorMessage').innerHTML =
          '';
          let data = {
              email: email,
              profilepicture: Cookie.load('profilepicture'),
              heading: this.state.heading,
              statement: this.state.statement,
              Concept: conceptArr,
              intent: this.state.questionIntent
          };
          $.ajax({
              url: 'http://localhost:8080/list/addquestion',
              type: 'POST',
              data: data,
              success: function() {
                  /*eslint-disable*/
                  alert('Question posted successfully');
                  /*eslint-enable*/
                  this.setState({active: false});
              },
              error: function() {
              }
          });
        }
    }

    togetherJS() {
        const script = document.createElement('script');
        script.src = 'https://togetherjs.com/togetherjs-min.js';
        document.body.appendChild(script);
        // TogetherJS(this);
    }

    logoutCall() {
        $.ajax({
            url: 'http://localhost:8080/users/logout', type: 'GET',
            // datatype: 'JSON',
            // data:{username :this.state.username,password:this.state.password},
            success: function(res) {
                if (typeof res.redirect === 'string') {
                    window.location.replace(window.location.protocol
                      + '//' + window.location.host + res.redirect);
                }
                // logger.debug(res.responseText);
                // browserHistory.push('/');
            },
            error: function() {
                // alert("error occurred while logging out");
                // logger.debug(err.responseText);
            }
        });
    }

    render() {
        // const {visible} = this.state;
        const {activeItem} = this.state;
        // const backImage = {
        //     image: Cookie.load('profilepicture')
        // };
        if(!Cookie.load('email')) {
          Answerpage = require('./../error.jsx');
          Invite = require('./../error.jsx');
          Questions = require('./../error.jsx');
          Profile = require('./../error.jsx');
        }
        // const {open, dimmer} = this.state;
        return (
            <div style={style}>
                <Menu secondary id='divStyle'>
                    <Grid>
                      <Grid.Column width={2}>

                         <Link to='/home'>
                             <Image src='./../../image/logo.png'
                             name='image' active= {activeItem === 'image'}
                             onClick={this.handleItemClick} className='logosize'/>
                         </Link>
                     </Grid.Column>
                     <Grid.Column width={11}>
                            <Dropdown className = "navSearch" placeholder='Search...'
                              onChange = {this.updatesearchQuery.bind(this)}
                              onKeyUp={this.updateConcept.bind(this)}
                              search selection
                              options={this.state.suggestedQuestions} />
                            <Link to = {'/search?question=' + this.state.searchQuery}>
                            <Button>Search</Button>
                            </Link>
                        </Grid.Column>
                        <Grid.Column width={3}>
                          <Modal open={this.state.active} dimmer={true} basic>
                          <Icon inverted link name='remove'
                             size='large' style={{marginLeft: 782 + 'px'}}
                             onClick={this.handleDimmerClose.bind(this)} />
                                <Header as='h2' icon>
                                    <Header.Subheader>
                                        <Container>
                                            <Form>
                                                <Form.Field>
                                                  <h2 style={{
                                                      marginBottom: 48 + 'px',
                                                      fontSize: 30 + 'px',
                                                      color: 'white'
                                                  }}>
                                                      ASK QUESTION </h2>
                                                      <div
                                                        style={{color: 'white', textAlign: 'center',
                                                         fontSize: 20 + 'px', fontWeight: 'bold'}}
                                                        id='errorMessage'/>
                                                </Form.Field>
                                                <Form.Field>
                                                  <input id='input'
                                                      list="questionName"
                                                      onInput={this.inputofHeading.bind(this)}
                                                      onChange={this.updateHeading.bind(this)}
                                                      rows='1'
                                                      placeholder='Enter Description here...'
                                                      style={{width: 700 + 'px'}}
                                                    />
                                                    <datalist id="questionName" />
                                                </Form.Field>
                                                <Form.Field>
                                                  <Textarea
                                                     onChange={this.updateStatement.bind(this)}
                                                     size='large'
                                                      placeholder='Enter statement here ...'
                                                     style={{ width: 700 + 'px',
                                                        height: 150 + 'px'}}
                                                    />
                                                </Form.Field>
                                                <Form.Field style={{marginLeft: -72 + 'px',
                                                   marginRight: -73 + 'px'}}>
                                                  <Dropdown placeholder='Enter Concept here...'
                                                    onChange = {this.updateQuestionTags.bind(this)}
                                                    onKeyUp={this.updateConcept.bind(this)}
                                                    multiple search selection
                                                    options={this.state.suggestedQuestions} />
                                                </Form.Field>
                                                <Form.Field>
                                                  <div>
                                                    <Button className='submitbutstyle'
                                                      primary size='large' type='submit'
                                                      value='Submit'
                                                      onClick={this.submitStatement.bind(this)}>
                                                      Submit Question</Button>
                                                   </div>
                                                </Form.Field>
                                            </Form>
                                        </Container>
                                    </Header.Subheader>
                                </Header>
                            </Modal>
                            <Menu.Menu position='right' style={Style} id='divStyle'>
                                <Menu.Item name='PostQuestion'
                                  active={activeItem === 'PostQuestion'}
                                   id='divStyle' onClick={this.handlePostQuestionClick.bind(this)}/>
                                   <Link to='/answer'>
                                         <Menu.Item name='Answer' active={activeItem === 'Answer'}
                                       id='divStyle' onClick={this.handleItemClick}/>
                                     </Link>
                                <Link to='/invite'>
                                    <Menu.Item name='invite' active={activeItem === 'invite'}
                                       id='divStyle' onClick={this.handleItemClick}/>
                                </Link>
                                <Link to='/profile'>
                                    <Menu.Item name='Profile' active={activeItem === 'Profile'}
                                       id='divStyle' onClick={this.handleItemClick}/>
                                </Link>
                                <Popup wide trigger={< Button icon='user' id='divStyle'
                                  />} on='click' position='bottom left'
                                  hideOnScroll>
                                  <div>
                                   <Grid >
                                     <Grid.Column width={5}>
                                       <Image src={Cookie.load('profilepicture')}
                                       className='profileImageSize' alt='img'/>
                                     </Grid.Column>
                                     <Grid.Column >
                                       <p className='profileColor'>
                                           {Cookie.load('username')}</p>
                                           <div>
                                           <Link to='/logout'>
                                               <Menu.Item name='Logout'
                                                 active={activeItem === 'Logout'}
                                                  onClick={this.handleItemClick}/>
                                           </Link>
                                           </div>
                                     </Grid.Column>
                                   </Grid>
                                 </div>
                                 </Popup>
                            </Menu.Menu>
                        </Grid.Column>
                    </Grid>
                </Menu>
                <Grid>
                     <Grid.Column width={1}/>
                     <Grid.Column width={15}>
                         <Router history={hashHistory}>
                             <Route path='/home' component={Cards} />
                             <Route path='/invite' component={Invite} />
                             <Route path='/answer' component={Questions} />
                             <Route path='/answerPage' component={Answerpage} />
                             <Route path='/profile' component={Profile} />
                             <Route path='/search' component={Search} />
                         </Router>
                     </Grid.Column>
                 </Grid>
            </div>
        );
    }
}

module.exports = NavBar;
