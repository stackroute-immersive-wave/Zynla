import React from 'react';
import {
    Icon,
    Image,
    Card,
    Button,
    Segment,
    Popup,
    Label,
    Dropdown
} from 'semantic-ui-react';
import {Link} from 'react-router';
import Cookie from 'react-cookie';
// import Modal from './inviteModal';
const ReactToastr = require('react-toastr');
const {ToastContainer} = ReactToastr;
const ToastMessageFactory = React.createFactory(ReactToastr.ToastMessage.animation);
class DisplayFavouriteCategoryStructure extends React.Component {
    constructor() {
        super();
        this.state = {
            check1: true,
            check2: false,
            iconName: '',
            text: 'save',
            emailId: '',
            Qid: '',
            userNames: [],
            name: '',
            s: '',
            result: '',
            inviteUser: []
        };
        this.state = {
            isModalOpen: false
        };
    }
    handleShow = () => this.setState({active: true})
    handleHide = () => this.setState({active: false})
    componentWillMount() {
        //#Abu 24-04-2017 (To set the icon depending on
        // whether the card is followed or not even when it is refreshed)
        /*eslint-disable*/
        let tag = this.props.tag;
        if (tag === 'Following') {
            this.setState({iconName: 'minus'})
        } else {
            this.setState({iconName: 'plus'})
        }
        /*eslint-enable*/
        //#Abu 24-04-2017 (it has already been there, instead of this code, simple code is used)
        /*let emailId = Cookie.load('email');
        let arr = [];
        $.ajax({
            url: `/users/viewFollowCard/${emailId}`,
            type: 'GET',
            success: function(data) {
              data.map(function(item) {
                item.watchingList.map(function(items) {
                  arr.push(items);
                });
              });
              for(let i = 0; i < arr.length; i = i + 1) {
                if(this.props.id === arr[i].id) {
                  this.setState({iconName: 'minus'});
                }
              }
            }.bind(this)
          });*/
    }
    /* To save the card which you follow in mongo db & Neo4j*/
    saveToProfile() {
        let emailId = Cookie.load('email');
        $.ajax({
            url: '/users/saveToProfile',
            type: 'PUT',
            data: {
                emailId: emailId,
                id: this.props.id,
                displayImage: this.props.displayImage,
                heading: this.props.heading,
                statement: this.props.question,
                postedBy: this.props.postedBy,
                profileImage: this.props.profileImage,
                addedOn: this.props.addedOn,
                category: this.props.category,
                upVotes: this.props.upVotes,
                downVotes: this.props.downVotes,
                views: this.props.views,
                answerCounts: this.props.answerCounts
            },
            success: function() {
                this.setState({iconName: 'minus'});
            }.bind(this),
            error: function() {}
        });
    }

    //#Abu 24-04-2017 (To unfollow the card and to remove its data from Mongo & Neo4j)
    unfollowFromProfile() {
        let emailId = Cookie.load('email');
        $.ajax({
            url: '/users/unfollowFromProfile',
            type: 'PUT',
            data: {
                emailId: emailId,
                id: this.props.id,
                displayImage: this.props.displayImage,
                heading: this.props.heading,
                statement: this.props.question,
                postedBy: this.props.postedBy,
                profileImage: this.props.profileImage,
                addedOn: this.props.addedOn,
                category: this.props.category,
                upVotes: this.props.upVotes,
                downVotes: this.props.downVotes,
                views: this.props.views,
                answerCounts: this.props.answerCounts
            },
            success: function() {
                this.setState({iconName: 'plus'});
            }.bind(this),
            error: function() {}
        });
    }

    openModal() {
        this.setState({isModalOpen: true});
        this.getusers();
    }
    getusers()
    {
        $.ajax({
            url: '/users/getAllUserName',
            type: 'get',
            success: function(data) {
                // console.log("Inside Home Page card Structure...",data);
                this.setState({userNames: data});
                this.getuserName();
            }.bind(this),
            error: function() {}
        });
    }
    sendInvite(mail, lStat)
    {
        let sender = Cookie.load('username');
        let uMail = mail;
        let ulStat = lStat;
        /* eslint-disable */
        let context = this;
        /* eslint-enable */
        $.ajax({
            url: '/followinvite/sendInviteEmail',
            type: 'post',
            data: {
                id: this.props.id,
                type: 'question',
                emailId: uMail,
                sender: sender,
                lStatus: ulStat
            },
            success: function(data) {
                // this.setState({iconName: 'add', text: 'saved'});
                context.setState({result: data});
                context.inviteAlert(context.state.result);
                // // this.setState({inviteName: 'Invited', inviteColor: 'red'});
                // console.log("mail sent");
            },
            error: function() {}
        });
    }
    closeModal() {
        this.setState({isModalOpen: false});
    }
    /* fetching the textbox value Createdon 10/3/2017 by Soundar*/
    //#Malar 26-7-2017{commented changeval}
    /*changeval(e)
    {
        this.setState({s: e.target.value});
        this.findAllUsers(this.state.s);
    }*/
    //#Malar 26-4-2017{Invite usernames}
    getuserName() {
        let loginEmail = Cookie.load('email');
        let option = [];
        let userNames = this.state.userNames;
        for (let i = 0; i < userNames.length; i = i + 1) {
            //console.log(userNames[i].name);
            if (userNames[i].email !== loginEmail) {
                option.push({key: userNames[i].name, value: userNames[i].name,
                  text: userNames[i].name});
            }
        }
        this.setState({inviteUser: option});
    }
    //#Malar 26-4-2017{geting all usernames}
    getValue(event, data)
    {
        this.setState({sendUserName: data.value});
        // console.log(this.state.s);
        // this.findAllUsers(this.state.s);
    }
    //#Malar 27-4-17{commented}
    /* fetching all usernames and emailid from mongo DB Createdon 10/3/2017 by Soundar*/
    // findAllUsers(s)
    // {
    //     let userNames = this.state.userNames;
    //     //  let loginUser = Cookie.load('username');
    //     let loginEmail = Cookie.load('email');
    //     //  // console.log(loginUser);
    //     let b = s.toLowerCase();
    //     // console.log(b);
    //     let option = '';
    //     for (let i = 0; i < userNames.length; i = i + 1) {
    //         // console.log(userNames[i].name);
    //         if (userNames[i].name.toLowerCase().indexOf(b) === 0 &&
    //         userNames[i].email !== loginEmail) {
    //             option = option + '<option value= "' + userNames[i].name + '"/>';
    //         }
    //     }
    //     document.getElementById('usernames').innerHTML = option;
    //     // React.render(<ReactDatalist list="countries" options={option} />, document.body)
    //     option = '';
    //     this.setState({s: ''});
    // }
    /* fetch the mailId of the particular user selected in textbox Createdon 10/3/2017 by Soundar**/
    findMail()
    {

        let mail = '';
        let lStat = '';
        let loginEmail = Cookie.load('email');
        let uname = this.state.sendUserName;
        console.log(uname);
        // let uname = '';
        /*eslint-disable*/
        if (uname === '' || uname === undefined) {
          /*eslint-enable*/
            this.refs.container.error('select username to invite', '', {
                timeOut: 2000,
                extendedTimeOut: 10000
            });
            this.closePopup();
        } else {
            let userNames = this.state.userNames;
            //console.log(userNames.length);
            for (let i = 0; i < userNames.length; i = i + 1) {
                if (userNames[i].name === uname && userNames[i].email !== loginEmail) {
                    console.log("enter");
                    mail = userNames[i].email;
                    lStat = userNames[i].lStatus;
                    this.sendInvite(mail, lStat);
                    break;
                }
            }
            this.closePopup();
        }
    }
    openPopup() {
        this.setState({isOpen: true});
        this.getusers();
    }
    closePopup() {
        this.setState({isOpen: false});
    }
    inviteAlert(result) {
        if (result !== '') {
            this.refs.container.success('"' + result + '"', '', {
                timeOut: 2000,
                extendedTimeOut: 10000
            });
            this.closePopup();
        } else {
            this.refs.container.error('select username to invite', '', {
                timeOut: 2000,
                extendedTimeOut: 10000
            });
            this.closePopup();
        }
    }

    /*eslint-disable*/
    render() {
        let label = '';
        let tag = this.props.tag;
        if (tag === 'You preferred') {
            label = <Label as='a' color='pink' ribbon='left' style={{
                marginLeft: 13 + 'px'
            }}>You Preferred</Label>;
        } else if (tag === 'Following') {
            label = <Label as='a' color='orange' ribbon='left' style={{
                marginLeft: 13 + 'px'
            }}>Following Card</Label>;
        } else if (tag === 'Posted by you') {
            label = <Label as='a' color='yellow' ribbon='left' style={{
                marginLeft: 13 + 'px'
            }}>Posted Card</Label>;
        } else if (tag === 'Recommended') {
            label = <Label as='a' color='violet' ribbon='left' style={{
                marginLeft: 13 + 'px'
            }}>{this.props.tag}</Label>;
        } else if (tag === 'Friend\'s following') {
            if (this.props.fullObj.followCount && this.props.fullObj.followCount > 0) {
                label = <Label as='a' color='blue' ribbon='left' style={{
                    marginLeft: 13 + 'px'
                }}>Followed by {this.props.fullObj.followedBy}
                    and {this.props.fullObj.followCount}
                    more</Label>;
            } else {
                label = <Label as='a' color='blue' ribbon='left' style={{
                    marginLeft: 13 + 'px'
                }}>Followed by {this.props.fullObj.followedBy}</Label>;
            }
        } else if (tag === 'Friend\'s posted') {
            label = <Label as='a' color='green' ribbon='left' style={{
                marginLeft: 13 + 'px'
            }}>Posted by {this.props.fullObj.postedBy}</Label>;
        } else if (tag === 'FoF follow') {
            label = <Label as='a' color='light blue' ribbon='left' style={{
                marginLeft: 13 + 'px'
            }}>Followed by Friend of {this.props.fullObj.friendOf}</Label>;
        } else if (tag === 'Preferred Topic') {
            label = <Label as='a' color='brown' ribbon='left' style={{
                marginLeft: 13 + 'px'
            }}>Following Topic</Label>;
        } else {
            label = <Label as='a' color='teal' ribbon='left' style={{
                marginLeft: 13 + 'px'
            }}>Posted by Friend of {this.props.fullObj.friendOf}</Label>;
        }
        const {active} = this.state;
        //#Abu 24/4/2017 (To change the symbol for following and unfollowing)
        if (this.state.iconName == 'minus') {
            //console.log("icon is minus");
            var content = (

                <div><Button circular onClick={this.unfollowFromProfile.bind(this)} icon={this.state.iconName || 'minus'} className='spacing' id='iconColor' size='tiny' style={{
                    'fontSize': 13 + 'px'
                }}/>

                    <Popup wide open={this.state.isOpen} onClose={() => this.closePopup()} trigger={< Button circular onClick = {
                        () => this.openPopup()
                    }
                    icon = 'mail outline' id = 'iconColor' size = 'tiny' style = {{'fonSize': 15 + 'px'}}/>} on='click' position='bottom right'>
                        <Icon name='remove' onClick={() => this.closePopup()} style={{
                            marginTop: 3 + 'px',
                            marginBottom: 10 + 'px',
                            marginLeft: 10 + 'px',
                            float: 'right'
                        }}/>
                        <p style={{
                            'text-align': 'center',
                            'padding-right': '10px',
                            'margin-top': '0px'
                        }}>
                            <div class="ui fluid icon input">
                              {/* //#Malar 26-4-2017{commented input text box}*/}
                                {/* <input style={{
                              'resize': 'horizontal',
                              'width': '250px',
                              'height': '30px'
                          }} id="users" placeholder="Search friends Here" list="usernames" onKeyDown={this.changeval.bind(this)}/>
                          <datalist id="usernames"></datalist>
                      </div><br/> */}
                      {/*//#Malar 26-4-2017{instead of textbox,dropdown is used}*/}
                                <Dropdown placeholder='search friends here...' search selection options={this.state.inviteUser} onChange={this.getValue.bind(this)}/>
                            </div>
                            <br/>
                            <Button fluid animated='fade' onClick={this.findMail.bind(this)} color='red' className='butstyle'>
                                <Button.Content visible>
                                    <p style={{
                                        'text-align': 'center',
                                        'color': 'white',
                                        'font-family': 'Arial, Helvetica, sans-serif'
                                    }}>
                                        Invite</p>
                                </Button.Content>
                                <Button.Content hidden>
                                    <p style={{
                                        'text-align': 'center',
                                        'color': 'white',
                                        'font-family': 'Arial, Helvetica, sans-serif'
                                    }}>
                                        Invite a friend</p>
                                </Button.Content>
                            </Button>
                        </p>
                    </Popup>
                </div>
            );
        } else {
            //console.log("icon is plus");

            var content = (

                <div><Button circular onClick={this.saveToProfile.bind(this)} icon={this.state.iconName || 'plus'} className='spacing' id='iconColor' size='tiny' style={{
                    'fontSize': 13 + 'px'
                }}/>

                    <Popup wide open={this.state.isOpen} onClose={() => this.closePopup()} trigger={< Button circular onClick = {
                        () => this.openPopup()
                    }
                    icon = 'mail outline' id = 'iconColor' size = 'tiny' style = {{'fonSize': 15 + 'px'}}/>} on='click' position='bottom right'>
                        <Icon name='remove' onClick={() => this.closePopup()} style={{
                            marginTop: 3 + 'px',
                            marginBottom: 10 + 'px',
                            marginLeft: 10 + 'px',
                            float: 'right'
                        }}/>
                        <p style={{
                            'text-align': 'center',
                            'padding-right': '10px',
                            'margin-top': '0px'
                        }}>
                            <div class="ui fluid icon input">
                              {/* //#Malar 26-4-2017{commented input text box}*/}
                                {/* <input style={{
                              'resize': 'horizontal',
                              'width': '250px',
                              'height': '30px'
                          }} id="users" placeholder="Search friends Here" list="usernames" onKeyDown={this.changeval.bind(this)}/>
                          <datalist id="usernames"></datalist>
                      </div><br/> */}
                      {/*//#Malar 26-4-2017{instead of textbox,dropdown is used}
                        */}
                                <Dropdown placeholder='search friends here...' search selection options={this.state.inviteUser} onChange={this.getValue.bind(this)}/>
                            </div>
                            <br/>
                            <Button fluid animated='fade' onClick={this.findMail.bind(this)} color='red' className='butstyle'>
                                <Button.Content visible>
                                    <p style={{
                                        'text-align': 'center',
                                        'color': 'white',
                                        'font-family': 'Arial, Helvetica, sans-serif'
                                    }}>
                                        Invite</p>
                                </Button.Content>
                                <Button.Content hidden>
                                    <p style={{
                                        'text-align': 'center',
                                        'color': 'white',
                                        'font-family': 'Arial, Helvetica, sans-serif'
                                    }}>
                                        Invite a friend</p>
                                </Button.Content>
                            </Button>
                        </p>
                    </Popup>
                </div>
            );
        }
        const input = {
            align: 'center'
        };

        return (
            <div className='CardSegment'>
                <Card raised={true} className='item' onClick={this.handleChange}>
                    {label}
                    <div className="PaddingCards">
                        <Image src={this.props.displayImage} className="imgsize" onMouseEnter={this.handleShow} dimmer={{
                            active,
                            content
                        }} onMouseLeave={this.handleHide}/>
                    </div>
                    <Link to= {'/answerPage?id=' + this.props.id}>
                        <div className="PaddingCards">
                            <Card.Header id='textheader' className='spacing'>
                                <b>{this.props.heading}</b>
                            </Card.Header>
                        </div>
                    </Link>
                    <div className='spacing' id='PaddingCards1'>
                        <Image className="border" floated='left' size='mini' src={this.props.profileImage} alt='pro image'/>
                        <Card.Meta>
                            <a href='' className='LinkColor'>{this.props.userName}</a>
                        </Card.Meta>
                        <Card.Meta>
                            <a href='' className='LinkColor'>{this.props.postedBy}</a>
                        </Card.Meta>
                        <Card.Meta>
                            {new Date(parseInt(this.props.addedOn, 10)).toString().substring(0, 15)}
                        </Card.Meta>
                    </div>
                    <div className="PaddingCardsBottom">
                        <Segment.Group horizontal>
                            <Segment>
                                <Popup trigger={< Icon name = 'like outline' color = 'green' />} content='Likes' position='bottom left' size='tiny'/> {this.props.upVotes}
                            </Segment>
                            <Segment>
                                <Popup trigger={< Icon name = 'eye' color = 'black' size = 'large' />} content='Views' position='bottom left' size='tiny'/>
                                <b>{this.props.views}
                                </b>
                            </Segment>
                            <Segment>
                                <Popup trigger={< Icon name = 'write square' size = 'large' />} content='Answers' position='bottom left' size='tiny'/>
                                <b>{this.props.answerCounts}
                                </b>
                            </Segment>
                        </Segment.Group>
                    </div>
                </Card>
                <ToastContainer ref='container' style ={{
                    backgroundColor: '#B2242E '
                }} toastMessageFactory={ToastMessageFactory} className='toast-top-center'/>

            </div>
        );/*eslint-enable*/
    }
}
DisplayFavouriteCategoryStructure.propTypes = {
    displayImage: React.PropTypes.string,
    heading: React.PropTypes.string,
    question: React.PropTypes.string,
    postedBy: React.PropTypes.string,
    addedOn: React.PropTypes.string,
    category: React.PropTypes.string,
    upVotes: React.PropTypes.number,
    downVotes: React.PropTypes.number,
    answerCounts: React.PropTypes.number,
    profileImage: React.PropTypes.string,
    views: React.PropTypes.number,
    acceptedCounts: React.PropTypes.number,
    remove: React.PropTypes.func,
    id: React.PropTypes.number
};
module.exports = DisplayFavouriteCategoryStructure;
