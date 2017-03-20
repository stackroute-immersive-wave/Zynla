import React from 'react';
import {
    Icon,
    Image,
    Card,
    Button,
    Segment,
    Popup
} from 'semantic-ui-react';
import {Link} from 'react-router';
import Cookie from 'react-cookie';
// import Modal from './inviteModal';
class DisplayFavouriteCategoryStructure extends React.Component {
    constructor() {
        super();
        this.state = {
            check1: true,
            check2: false,
            iconName: 'plus',
            text: 'save',
            emailId: '',
            Qid: '',
            userNames: [],
            name: '',
            s: ''
        };
        this.state = {
            isModalOpen: false
        };
    }
    handleShow = () => this.setState({active: true})
    handleHide = () => this.setState({active: false})
    componentWillMount() {
      // let emailId = Cookie.load('email');
      // let arr = [];
      // $.ajax({
      //     url: `/users/viewFollowCard/${emailId}`,
      //     type: 'GET',
      //     success: function(data) {
      //       data.map(function(item) {
      //         item.watchingList.map(function(items) {
      //           arr.push(items);
      //         });
      //       });
      //       for(let i = 0; i < arr.length; i = i + 1) {
      //         if(this.props.id === arr[i].id) {
      //           this.setState({iconName: 'minus'});
      //         }
      //       }
      //     }.bind(this)
      //   });
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
                // console.log(JSON.stringify(data));
                this.setState({userNames: data});
            }.bind(this),
            error: function() {}
        });
    }
    sendInvite(mail, lStat)
    {
        let sender = Cookie.load('username');
        let uMail = mail;
        let ulStat = lStat;
        // console.log(uMail);
        // console.log(this.props.id);
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
            success: function() {
                // this.setState({iconName: 'add', text: 'saved'});
                this.setState({inviteName: 'Invited', inviteColor: 'red'});
                // console.log("mail sent");
            }.bind(this),
            error: function() {}
        });
    }
    closeModal() {
        this.setState({isModalOpen: false});
    }
    /* fetching the textbox value Createdon 10/3/2017 by Soundar*/
    changeval(e)
    {
        this.setState({s: e.target.value});
        this.findAllUsers(this.state.s);
    }
    /* fetching all usernames and emailid from mongo DB Createdon 10/3/2017 by Soundar*/
    findAllUsers(s)
    {
        let userNames = this.state.userNames;
        //  let loginUser = Cookie.load('username');
        let loginEmail = Cookie.load('email');
        //  // console.log(loginUser);
        let b = s.toLowerCase();
        // console.log(b);
        let option = '';
        for (let i = 0; i < userNames.length; i = i + 1) {
            // console.log(userNames[i].name);
            if (userNames[i].name.toLowerCase().indexOf(b) === 0 &&
            userNames[i].email !== loginEmail) {
                option = option + '<option value= "' + userNames[i].name + '"/>';
            }
        }
        document.getElementById('usernames').innerHTML = option;
        // React.render(<ReactDatalist list="countries" options={option} />, document.body)
        option = '';
        this.setState({s: ''});
    }
    /* fetch the mailId of the particular user selected in textbox Createdon 10/3/2017 by Soundar**/
    findMail()
    {
        let mail = '';
        let lStat = '';
        let loginEmail = Cookie.load('email');
        let uname = document.getElementById('users');
        // let uname = '';
        let userNames = this.state.userNames;
        // console.log(userNames.length);
        for (let i = 0; i < userNames.length; i = i + 1) {
            if (userNames[i].name === uname.value && userNames[i].email !== loginEmail) {
                mail = userNames[i].email;
                lStat = userNames[i].lStatus;
                break;
            }
        }
        // console.log(mail);
        this.sendInvite(mail, lStat);
    }
    openPopup() {
  this.setState({ isOpen: true });
  this.getusers();
}
closePopup() {
  this.setState({ isOpen: false });
}
handleClose = () => {
    this.setState({ isOpen: false });
    clearTimeout(this.timeout);
  }
/*eslint-disable*/
    render() {
        const {active} = this.state;
        const content = (
            <div><Button circular onClick={this.saveToProfile.bind(this)}
              icon={this.state.iconName || 'plus'} className='spacing' id='iconColor' size='tiny' style={{
                'font-size': 13 + 'px'
            }}/>
            <Popup wide open={this.state.isOpen} onClose={() => this.closePopup()}
        trigger={<Button circular onClick={() => this.openPopup()}
        icon='google plus circle' id='iconColor'
        size='tiny' style={{'font-size': 13 + 'px'}}/>} on='click' position='bottom right'>
<p style={{background: '#be252a', height:'35px', 'text-align': 'center', color:'white', 'font-family': 'Arial, sans-serif'}}
          className='butstyle'>Invite to follow
          <Button floated='right' onClick={() => this.closePopup()} color='red' icon='remove' className='butstyle'/>
      </p>
        <p style={{'text-align': 'center','padding-right': '10px','margin-top': '0px'}}>
        <div class="ui fluid icon input">
          <input style={{'resize': 'horizontal','width': '250px','height':'25px'}} id="users" placeholder="Search friends Here" list="usernames" onKeyDown={this.changeval.bind(this)} />
   <datalist id="usernames"></datalist></div>
   <br/><br/>
<Button fluid animated='fade' onClick={this.findMail.bind(this)} color='red' className='butstyle'>
  <Button.Content visible >
    <p style={{'text-align': 'center','color': 'white','font-family': 'Arial, Helvetica, sans-serif'}}>  Invite</p>
  </Button.Content>
  <Button.Content hidden >
  <p style={{'text-align': 'center','color': 'white','font-family': 'Arial, Helvetica, sans-serif'}}>  Invite a friend</p>
  </Button.Content>
</Button>
</p>
 </Popup>
            </div>
        );
        const input = {
            align: 'center'
        };

        return (
            <div className='CardSegment'>
                <Card raised='true' className='item' onClick={this.handleChange}>
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
                        <Image className="border" floated='left' size='mini' src='http://semantic-ui.com/images/avatar/large/steve.jpg'/>
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
            </div>
        );/*eslint-enable*/
    }
}
DisplayFavouriteCategoryStructure.propTypes = {
    displayImage: React.PropTypes.string.isRequired,
    heading: React.PropTypes.string.isRequired,
    question: React.PropTypes.string.isRequired,
    postedBy: React.PropTypes.string.isRequired,
    addedOn: React.PropTypes.number.isRequired,
    category: React.PropTypes.string.isRequired,
    upVotes: React.PropTypes.string.isRequired,
    downVotes: React.PropTypes.string.isRequired,
    answerCounts: React.PropTypes.string.isRequired,
    profileImage: React.PropTypes.string.isRequired,
    views: React.PropTypes.number.isRequired,
    acceptedCounts: React.PropTypes.string.isRequired,
    remove: React.PropTypes.func.isRequired,
    id: React.PropTypes.number
};
module.exports = DisplayFavouriteCategoryStructure;
