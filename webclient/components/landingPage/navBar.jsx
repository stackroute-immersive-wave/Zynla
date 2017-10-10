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
    Form,
    Segment,
    Dimmer,
    Loader
} from 'semantic-ui-react';
import {Link} from 'react-router';
import Cookie from 'react-cookie';
import validator from 'validator';
const ReactToastr = require('react-toastr');
const {ToastContainer} = ReactToastr;
const ToastMessageFactory = React.createFactory
(ReactToastr.ToastMessage.animation);
// const logger = require('./../../applogger');
import Textarea from 'react-textarea-autosize';
import {hashHistory} from 'react-router';

let Style = {
    marginTop: '5px',
    marginBottom: '5px'
};

class NavBar extends Component {
    constructor() {
        super();
        this.state = {
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
            searchQuery: '',
            openNewModal: false,
            ModalQuestionId: 0,
            ModalQuestionName: '',
            ModalQuestionDescription: '',
            ModalQuestionPostedBy: '',
            ModalQuestionViews: '',
            someContent: '',
            onClickId: 0,
            intent: '',
            suggestedQuestionconcepts: [],
            suggestedIntents:[]
        };
        this.submitQuestionAlert = this.submitQuestionAlert.bind(this);
    }

    componentDidMount() {
        this.updateConcept();
        this.getIdWithQuestionfunction();
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

    //  #Indhu _Alert when question concept doesnt match with database
    // concepts(26-Apr-17)
    submitConceptAlert() {
        this.refs.container.warning('Concept does not exist', '', {
            timeOut: 3000,
            extendedTimeOut: 10000
        });
    }

    submitQuestionAlert() {
        this.refs.container.success('Question Posted Successfully', '', {
            timeOut: 3000,
            extendedTimeOut: 10000
        });
    }

    handlePostQuestionClick() {
        /*eslint-disable*/
        let context = this;
        /*eslint-enable*/
        if (Cookie.load('email')) {
            this.setState({active: true});
            $.ajax({
                url: '/list/getQuestionIntent/',
                type: 'GET',
                success: function(res) {
                    context.setState({allQuestionIntentArr: res});
                },
                error: function() {}
            });
        } else {
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
    handleNoClick() {
        this.setState({openNewModal: false, someContent: 'N'});
    }
    handleYesClick() {
        this.setState({someContent: 'Y'});
        this.setState({openNewModal: false, active: false});
        hashHistory.push('/answerPage?id=' + this.state.onClickId);
    }

    //#Indhu _Method to display matching concepts in dropdown(26-Apr-17)
    inputofHeading(evt) {
      let val = document.getElementById('input').value;
      if(evt.keyCode===13)
      {
        $.ajax({
            url: '/list/nlp',
            type: 'post',
            data: {
                val: val
            },
            success: function(res) {
              console.log(res)
                if (res.conceptsArr.length === 0) {
                      this.submitConceptAlert();
                        }
                        console.log(res.intentsArr);
                let dropdowntempArry = [];
                 for (let i = 0; i < res.conceptsArr.length; i=i+1) {
                           dropdowntempArry.push({key: res.conceptsArr[i],
                             value: res.conceptsArr[i],
                              text: res.conceptsArr[i]});
                       }
                this.setState({suggestedQuestionconcepts: dropdowntempArry,
                  suggestedIntents:res.intentsArr});

            }.bind(this),
            error: function(error) {
                console.log("@@@@@@@@ " , error);
            }
        });
        }
        let opts = document.getElementById('questionName').childNodes;
        let questionName1 = this.state.questionName;
        for (let i = 0; i < opts.length; i = i + 1) {
            if (opts[i].value === val) {
                for (let j in questionName1) {
                    /*eslint-disable*/
                    if (questionName1[j].qName === opts[i].value) {
                        /*eslint-enable*/
                        let id = questionName1[j].qId;
                        this.setState({onClickId: id});
                        this.setState({
                            openNewModal: true,
                            ModalQuestionId: questionName1[j].qId,
                            ModalQuestionName: opts[i].value,
                        ModalQuestionDescription: questionName1[j].qDescription,
                            ModalQuestionPostedBy: questionName1[j].qPostedBy,
                            ModalQuestionViews: questionName1[j].qViews
                        });
                        document.getElementById('questionName').innerHTML = '';
                        break;
                    }
                }
            }
        }
    }

    getIdWithQuestionfunction() {
        /*eslint-disable*/
        let context = this;
        /*eslint-enable*/
        $.ajax({
            url: '/list/getIdWithQuestion',
            type: 'get',
            success: function(data) {
              console.log(data)
                context.setState({questionName: data});
            },
            error: function() {}
        });
    }
    changeQuestionVal(e)
    {
        // let h = e.target.value;
        this.setState({questionKey: e});
        // console.log('The event is ' + e);
        // console.log('inside change question value function '
        // + this.state.questionKey);
        let b = e.toLowerCase();
        let option = '';
        // console.log(this.state.questionName);
        let questionNames = this.state.questionName;
        // console.log(questionNames.length);
        // console.log(questionNames[1].qName.toLowerCase().indexOf('form'));
        for (let i = 0; i < questionNames.length; i = i + 1) {
            if (questionNames[i].qName.toLowerCase().indexOf(b) === 0) {
                option = option + '<option value="'
                   + questionNames[i].qName + '"/>';
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
        for (let i in allQuestionIntents) {
            if (i !== null) {
                allQuestionIntents[i].toLowerCase();
                if (allQuestionIntents[i].includes(question)) {
                    this.setState({questionIntent: allQuestionIntents[i]});
                    break;
                } else {
                    continue;
                }
            }
        }
    }
    updateStatement(evt) {
        // gets the statement and changes the state
        this.setState({statement: evt.target.value});
    }

    updateConcept() {
        let arr = [];
        // this.setState({Concept: evt.target.value});
        // ajax call to get the concepts from the neo4j based on
        //particular keywoard
        $.ajax({
            url: '/list/getconcepts/',
            type: 'GET',
            success: function(data) {
                for (let i in data) {
                    if (i !== null) {
                        arr.push({key: data[i], value: data[i], text: data[i]});
                    }
                }
                this.setState({suggestedQuestions: arr});
            }.bind(this),
            error: function() {}
        });
    }

    updateQuestionTags(evt, result) {
        // gets the all question tags and stores in an array
        this.setState({selectedConcepts: result.value});
    }

    updatesearchQuery(evt, result) {
        let res = result.value.toString();
        this.setState({searchQuery: res});
        //#pavithra N pressing enter reloads the page instead of
        //clicking the search button
        hashHistory.push('/search?question=' + res);
    }

    submitStatement() {
        console.log(this)
        // ajax call after submitting the values which needed to be asked
        let conceptArr = [];
        /* eslint-disable */
        let context = this;
        /* eslint-enable */
        let email = Cookie.load('email');
        conceptArr = JSON.stringify(this.state.selectedConcepts);
        // console.log("---------"+this.state.heading+"---"+this.state.heading.length);
        // console.log("--------------"+this.state.statement+"---"+this.state.statement.length);
        //  console.log("Inside submit st
        // atement question intent is--------- " + conceptArr+"----"+conceptArr.length);
        if (validator.isEmpty(this.state.heading) || validator.isEmpty(this.state.statement) ||
            conceptArr.length === 0) {
            document.getElementById('errorMessage').innerHTML = 'All Fields Required';
        }
        else {
            document.getElementById('errorMessage').innerHTML = '';
              let secounderyIntent;
              let primaryIntent;
              if (context.state.suggestedIntents.includes("use")){
               secounderyIntent="use";
              ["when","why","how","where"].forEach(function(data){
                if(context.state.suggestedIntents.includes(data)){
                  primaryIntent=data;
                }
              })
              if(primaryIntent){}
              else {
                primaryIntent="definition"
              }
               }
              else if (context.state.suggestedIntents.includes("compare")){
                    primaryIntent="compare"
                  }
              else if (context.state.suggestedIntents.includes("advantages")){
                primaryIntent="advantages";
              }
              else if (context.state.suggestedIntents.includes("disadvantage")){
                primaryIntent="disadvantages";
              }
              else {
                primaryIntent=context.state.suggestedIntents[0];
              }
              console.log(primaryIntent,secounderyIntent);
            let data = {
                email: email,
                profilepicture: Cookie.load('profilepicture'),
                heading: context.state.heading,
                statement: context.state.statement,
                Concept: conceptArr,
                primaryIntent:primaryIntent,
                secounderyIntent:secounderyIntent,
                suggestedQuestionconcepts:JSON.stringify(context.state.selectedConcepts)
            };
            console.log(data);
            context.setState({activeDimmer: true});
            $.ajax({
                url: '/list/addquestion',
                type: 'POST',
                data: data,
                success: function() {
                    context.setState({active: false, activeDimmer: false});
                    context.setState({heading: '', statement: '', selectedConcepts: []});
                    context.submitQuestionAlert();
                },
                error: function() {}
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
        let emailId = Cookie.load('email');
        // console.log(Cookie.load('username'));
        // console.log('email for logout',emailId);
        $.ajax({
            url: '/users/logOut',
            type: 'POST',
            datatype: 'JSON',
            data: {
                email: emailId
            },
            success: function() {
                // console.log(Cookie.load('username'));
                hashHistory.push('/');
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
        const {activeDimmer} = this.state;
        // const backImage = {
        //     image: Cookie.load('profilepicture')
        // };
        // const {open, dimmer} = this.state;
        /* eslint-disable */
        return (
            <div>
                <Dimmer active={activeDimmer} page>
                    <Loader>Posting Question</Loader>
                </Dimmer>
                <div className='ui top fixed menu' id='divStyle'>
                    <Link to='/home'>
                        <Image src='./../../image/logo.png' name='image'
                         onClick={this.handleItemClick}
                         className='logosize'/>
                    </Link>

                    <Dropdown className="navSearch" placeholder='Search...'
                     onChange={this.updatesearchQuery.bind(this)}
                    search selection options={this.state.suggestedQuestions}/>
                    <Link to= {'/search?question=' + this.state.searchQuery}
                    className='searchIconPosition'>
                        <Icon name='search' size='large'/>
                    </Link>
                    <Modal open={this.state.active} dimmer={true} basic>
                        <Icon inverted link name='remove' size='large' style={{
                            marginLeft: 782 + 'px'
                        }} onClick={this.handleDimmerClose.bind(this)}/>
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
                                                Ask Question
                                            </h2>
                                            <div style={{
                                                color: 'white',
                                                textAlign: 'center',
                                                fontSize: 20 + 'px',
                                                fontWeight: 'bold'
                                            }} id='errorMessage'/>
                                        </Form.Field>
                                        <Form.Field>
                                            <input id='input' list="questionName"
                                             onKeyDown ={this.inputofHeading.bind(this)}
                                            onChange={this.updateHeading.bind(this)} rows='1'
                                            placeholder='Enter Question here...' style={{
                                                width: 700 + 'px'
                                            }}/>
                                            <datalist id="questionName"/>
                                            <Popup trigger= {<datalist id="questionName" />}
                                            content='Sends an email invite to a friend.'
                                            on='hover'/>
                                        </Form.Field>
                                        <Form.Field>
                                            <Textarea onChange={this.updateStatement.bind(this)}
                                            size='large'
                                            placeholder='Enter Description here ...' style={{
                                                width: 700 + 'px',
                                                height: 150 + 'px'
                                            }}/>
                                        </Form.Field>
                                        <Form.Field style={{
                                            marginLeft: -72 + 'px',
                                            marginRight: -73 + 'px'
                                        }}>
                                            <Dropdown placeholder='Enter Concept here...'
                                            onChange={this.updateQuestionTags.bind(this)}
                                            multiple search selection options=
                                            {this.state.suggestedQuestionconcepts}/>
                                        </Form.Field>
                                    </Form>
                                    <Button className='submitbutstyle' primary size='large'
                                    type='submit' value='Submit'
                                     onClick={this.submitStatement.bind(this)}>
                                        Submit Question</Button>
                                </Container>
                            </Header.Subheader>
                        </Header>
                    </Modal>
                    <Modal open={this.state.openNewModal}>
                        <Header icon='find' content='Do you want to proceed with the question'/>
                        <Modal.Content>
                            <h4 style={{
                                fontSize: 25 + 'px'
                            }}>
                                {this.state.ModalQuestionName}
                            </h4>
                            <p style={{
                                fontSize: 16 + 'px',
                                marginLeft: 20 + 'px'
                            }}>
                                {this.state.ModalQuestionDescription}
                            </p>
                            <Segment float='left' compact>
                                <Image floated='left' size='mini'
                                src='http://semantic-ui.com/images/avatar/large/steve.jpg'/>
                                <a>
                                    {this.state.ModalQuestionPostedBy}
                                </a>
                            </Segment>
                        </Modal.Content>
                        <Modal.Actions>
                            <Button color='red' onClick={this.handleNoClick.bind(this)}>
                                <Icon name='remove'/>
                                No
                            </Button>
                            <Button color='green' onClick={this.handleYesClick.bind(this)}>
                                <Icon name='checkmark'/>
                                Yes
                            </Button>
                        </Modal.Actions>
                    </Modal>
                    <Menu.Menu position='right' style={Style} id='divStyle'>

                      <Popup wide trigger={< Button icon = 'leanpub' id = 'divStyle'/>} on='click' position='bottom left' hideOnScroll>
                            <div>
                                <Link to='/createbook'>
                                    <Menu secondary>
                                        <Menu.Item name='Create New Book' active={activeItem === 'CreateNewBook'} onClick={this.handleItemClick}/>
                                    </Menu>
                                </Link>
                            </div>
                            <div>
                                <Link to='/allToc'>
                                    <Menu secondary>
                                        <Menu.Item name='View All TOC' active={activeItem === 'allToc'} onClick={this.handleItemClick}/>
                                    </Menu>
                                </Link>
                            </div>

                       </Popup>
                        <Menu.Item name='PostQuestion' active={activeItem === 'PostQuestion'}
                        id='divStyle' onClick={this.handlePostQuestionClick.bind(this)}/>
                        <Link to='/answer'>
                            <Menu.Item name='Answer' active={activeItem === 'Answer'}
                             id='divStyle' onClick={this.handleItemClick}/>
                        </Link>
                        <Link to='/profile'>
                            <Menu.Item name='Profile' active={activeItem === 'Profile'}
                            id='divStyle' onClick={this.handleItemClick}/>
                        </Link>
                        <Popup wide trigger={< Button icon = 'user' id = 'divStyle' />}
                        on='click' position='bottom left' hideOnScroll>
                            <div>
                                <Grid >
                                    <Grid.Column width={5}>
                                        <Image src={Cookie.load('profilepicture')}
                                        className='profileImageSize' alt='img'/>
                                    </Grid.Column>
                                    <Grid.Column >
                                        <p className='profileColor'>
                                            {Cookie.load('username')}</p>
                                    </Grid.Column>
                                </Grid>
                                <div>
                                    <Link to='/invite'>
                                        <Menu secondary>
                                            <Menu.Item name='invite'
                                            active={activeItem === 'invite'}
                                            onClick={this.handleItemClick}/>
                                        </Menu>
                                    </Link>
                                </div>
                                <div>
                                    <Link to=''>
                                        <Menu secondary>
                                            <Menu.Item name='Terms and Conditions'
                                            active={activeItem === 'terms'}
                                            onClick={this.handleItemClick}/>
                                        </Menu>
                                    </Link>
                                </div>
                                <div>
                                    <Link to='/'>
                                        <Menu secondary>
                                            <Menu.Item name='Logout'
                                            active={activeItem === 'Logout'}
                                            onClick={this.logoutCall.bind(this)}/>
                                        </Menu>
                                    </Link>
                                </div>
                            </div>
                        </Popup>
                        <Menu.Item/>
                    </Menu.Menu>
                </div>
                <ToastContainer ref='container' toastMessageFactory={ToastMessageFactory}
                className='toast-top-center'/>
            </div>

        );
    }
}

module.exports = NavBar;
/* eslint-enable */
