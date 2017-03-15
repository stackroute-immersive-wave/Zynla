import React from 'react';
import {
    Grid,
    Image,
    Button,
    Divider,
    Icon,
    Breadcrumb,
    Segment,
    Form,
    Modal,
    TextArea
} from 'semantic-ui-react';
import Cookie from 'react-cookie';
// import RichTextEditor from 'react-rte';
const DisplayAnswer = require('./answerDisplay');
let titlestyle = {
    fontFamily: 'Georgia',
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: '5%'
};
let questionstyle = {
    fontFamily: 'Georgia',
    fontSize: 18,
    fontWeight: 'serif',
    marginTop: '3%',
    lineHeight: '30px'
};
let buttonfolstyle = {
    marginLeft: '5%'
};
let crumstyle = {
    marginTop: '2%'
};
let viewstyle = {
    marginLeft: '4%'
};
let likestyle = {
    marginLeft: '4%'
};
let unlikestyle = {
    marginLeft: '4%'
};
let ansstyle1 = {
    marginTop: '3%',
    fontSize: 20
};
let followstyle = {
    float: 'right',
    backgroundcolor: '#BE252A ',
    color: '#FFFFFF '
};
let formstyle = {
    margin: '3% 3% 3% 3% '
};
let titlestyle1 = {
    fontFamily: 'Georgia',
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: '1%',
    marginBottom: '3%'
};
class answerPage extends React.Component {
    constructor() {
        super();
        this.state = {
            active: false,
            // value: RichTextEditor.createEmptyValue(),
            id: '',
            views: 0,
            upVotes: 0,
            downVotes: 0,
            colorName: 'green',
            colorNameUnlike: 'red',
            iconName: 'add',
            objArray: [
                {
                    id: 0,
                    category: '',
                    tags: '',
                    heading: '',
                    question: '',
                    image: '',
                    displayImage: '',
                    profileImage: '',
                    addedOn: '',
                    upVotes: '',
                    downVotes: '',
                    answerCounts: '',
                    postedBy: '',
                    views: 0,
                    topCards: [
                        {
                            createdBy: '',
                            content: '',
                            createdOn: '',
                            image: '',
                            profileImage: '',
                            upVote: 0,
                            downVote: 0,
                            isAccepted: true
                        }
                    ],
                    status: {
                        open: true
                    }
                }
            ]
        };
        this.textVal = this.textVal.bind(this);
        this.getviewscount = this.getviewscount.bind(this);
        this.getData = this.getData.bind(this);
        this.postAnswer = this.postAnswer.bind(this);
        this.addcomment = this.addcomment.bind(this);
    }
    // static propTypes = {
    //     onChange: PropTypes.func
    // };
    // onChange = (value) => {
    //     this.setState({value});
    //     if (this.props.onChange) {
    //         this.props.onChange(value.toString('html'));
    //     }
    // };

    textVal(e) {
        this.setState({content: e.target.value});
    }
    comment(e) {
        this.setState({comment: e.target.value});
    }
    // Posting answer for question created by Aswini K
    postAnswer() {
        let id = window.location.hash.split('id=')[1];
        // console.log('inside post Answer');
        let ansdata = {
            questionId: id,
            mail: Cookie.load('email'),
            content: this.state.content
        };
        // let context = this;
        // console.log(JSON.stringify(ansdata));
        $.ajax({
            url: 'http://localhost:8080/answers/add',
            type: 'POST',
            data: ansdata,
            success: function() {
                // console.log('success', data);
                this.setState({active: false});
            },
            error: function() {
                // console.log(this.props.url, status, err.toString());
            }
        });
    }
    // Getting views count created by Aswini K
    getviewscount() {
        // console.log('views before increment', this.state.views);
        let id = window.location.hash.split('id=')[1];

        let viewscount = this.state.views + 1;

        $.ajax({
            url: '/list/updateviews',
            type: 'PUT',
            data: {
                id: id,
                views: viewscount
            },
            success: function() {
                this.setState({views: viewscount});
                // console.log('inside success', this.state.views);
            }.bind(this)
        });
    }
    // Adding comments for question created by Aswini K
    addcomment() {
        // console.log('views before increment');
        let id = window.location.hash.split('id=')[1];

        let commentdata = {
            questionId: id,
            mail: Cookie.load('email'),
            content: this.state.comment
        };
        // console.log("comments:"+commentdata);
        $.ajax({
            url: '/list/updatecomment',
            type: 'PUT',
            data: commentdata,
            success: function() {
                // this.setState({comment: Comments});
                // console.log('inside success', this.state.commentdata);
            }
        });
    }
    // Getting question data from mongo db created by Aswini K
    getData() {
        let id = window.location.hash.split('id=')[1];
        $.ajax({
            url: 'http://localhost:8080/list/' + id,
            type: 'GET',
            success: function(data) {
                this.setState({objArray: data});
                this.setState({views: data[0].views});
                this.getviewscount();
                // console.log(this.state.objArray);
            }.bind(this)
        });
    }
    componentWillMount() {
        this.getData();
        this.getLikeStatus();
        this.CheckingId();
    }
    // updating like for question by sumit(28/2/2017)
    updatelike() {
        let type = 'add';
        let color = 'blue';
        let upVotesTemp = parseInt(this.state.upVotes, 10) + 1;
        if (this.state.colorName === 'green') {
            type = 'add';
            upVotesTemp = parseInt(this.state.upVotes, 10) + 1;
            color = 'blue';
        } else {
            type = 'delete';
            upVotesTemp = parseInt(this.state.upVotes, 10) - 1;
            color = 'green';
        }
        let id = window.location.hash.split('id=')[1];
        // console.log('upvotes before increment',this.state.upVotes);
        // console.log('upvotes after increment',upVotesTemp);
        $.ajax({
            url: 'http://localhost:8080/list/updateLike',
            type: 'POST',
            data: {
                id: id,
                upVotes: upVotesTemp,
                email: Cookie.load('email'),
                type: type
            },
            success: function() {
                // console.log('comes');
                this.setState({colorName: color, upVotes: upVotesTemp});
            }.bind(this)
        });
    }
    // updating unlike for question by sumit(1/3/2017)
    updateunlike() {
        // console.log("coming to update unlike");
        let type = 'add';
        let color = 'red';
        let downVotesTemp = parseInt(this.state.downVotes, 10) + 1;
        if (this.state.colorNameUnlike === 'red') {
            type = 'add';
            downVotesTemp = parseInt(this.state.downVotes, 10) + 1;
            color = 'black';
        } else {
            type = 'delete';
            downVotesTemp = parseInt(this.state.downVotes, 10) - 1;
            color = 'red';
        }
        let id = window.location.hash.split('id=')[1];
        $.ajax({
            url: 'http://localhost:8080/list/updateunlike',
            type: 'POST',
            data: {
                id: id,
                downVotes: downVotesTemp,
                email: Cookie.load('email'),
                type: type
            },
            success: function() {
                this.setState({colorNameUnlike: color, downVotes: downVotesTemp});
            }.bind(this)
        });
    }
    // updating status of the button (color)for question by sumit(1/3/2017)
    getLikeStatus() {
        let id = window.location.hash.split('id=')[1];
        let email = Cookie.load('email');
        $.ajax({
            url: 'http://localhost:8080/list/likestatus',
            type: 'POST',
            data: {
                id: id,
                email: email
            },
            success: function(data) {
                // console.log(data);
                if (data.like) {
                    this.setState({colorName: 'blue'});
                } else {
                    this.setState({colorName: 'green'});
                }
                if (data.unlike) {
                    this.setState({colorNameUnlike: 'black'});
                } else {
                    this.setState({colorNameUnlike: 'red'});
                }
            }.bind(this)
        });
    }
    // Following the question created by Aswini K
    CheckingId() {
        let emailId = Cookie.load('email');
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
                for (let i = 0; i < arr.length; i = i + 1) {
                    if (this.props.id === arr[i].id) {
                        this.setState({iconName: 'minus'});
                    }
                }
            }.bind(this)
        });
    }
    /* To save the card which you follow in mongo db & Neo4j*/
    saveToProfile() {
        let id = window.location.hash.split('id=')[1];
        let emailId = Cookie.load('email');
        $.ajax({

            url: '/users/saveToProfile',
            type: 'PUT',
            data: {
                emailId: emailId,
                id: id,
                displayImage: this.props.displayImage,
                heading: this.props.heading,
                statement: this.props.question,
                postedBy: this.props.postedBy,
                profileImage: this.props.profileImage,
                addedOn: this.props.addedOn,
                views: this.props.views,
                category: this.props.category,
                upVotes: this.props.upVotes,
                downVotes: this.props.downVotes,
                answerCounts: this.props.answerCounts
            },
            success: function() {
                this.setState({iconName: 'add', text: 'saved'});
            }.bind(this),
            error: function() {}
        });
    }

    render() {
        let quesObj = this.state.objArray;
        return (

            <Grid divided='vertically'>
                <Grid.Row columns={3}>
                    <Grid.Column width={13}>
                        <div style={titlestyle}>
                            {quesObj[0].heading}
                            <Button circular style={followstyle}
                              icon={this.state.iconName} size='small'
                              color='red' onClick={this.saveToProfile.bind(this)}/>
                        </div>
                        <div style={questionstyle}>
                          {quesObj[0].question}</div>
                        <Breadcrumb>
                            <Breadcrumb.Section link>{quesObj[0].tags}</Breadcrumb.Section>
                        </Breadcrumb>
                        <Segment floated='right'>
                            <div>Asked on {quesObj[0].addedOn}</div>
                            <Image floated='left' size='mini' src={quesObj[0].profileImage}/>
                            <a>
                                {quesObj[0].postedBy}
                            </a>
                        </Segment>
                        <div style ={crumstyle}>

                            <Icon style={likestyle} name='thumbs up' size='big'
                              color={this.state.colorName || 'green'}
                              onClick={this.updatelike.bind(this)}/>
                            {this.state.upVotes}
                            <Icon style={unlikestyle} name='thumbs down' size='big'
                              color={this.state.colorNameUnlike || 'red'}
                              onClick={this.updateunlike.bind(this)}/>
                              {this.state.downVotes}

                            <Icon name='eye' size='big' style={viewstyle}/>{quesObj[0].views + 1}
                            <Modal trigger={<Button positive
                              style = {buttonfolstyle}
                            size = 'mini' > Click to Answer </Button>}
                            closeIcon='close'>
                                <Modal.Content>
                                    <div style={titlestyle1}>
                                        {quesObj[0].heading}
                                    </div>
                                    <Form>
                                        <TextArea placeholder='Write Your Answer Here.....'
                                          onChange={this.textVal}/>
                                    </Form>
                                </Modal.Content>
                                <Modal.Actions>
                                    <Button color='green' onClick={this.postAnswer.bind(this)}
                                      type='button'>
                                        Submit
                                    </Button>
                                </Modal.Actions>
                            </Modal>
                            <Button negative style ={buttonfolstyle}
                              size='mini'>Report</Button>
                            <Modal trigger={<Button basic color = 'black' size = 'mini'
                              style = {buttonfolstyle} > Add Comments </Button>}>
                                <Form style={formstyle}>
                                    <TextArea onChange={this.comment.bind(this)}
                                      value={this.state.comment}/>
                                </Form>
                                <Button content='Submit' primary
                                  onClick={this.addcomment.bind(this)}/>
                            </Modal>

                        </div>
                        <div style={ansstyle1}>{quesObj[0].answerCounts}
                            Answers</div>
                        <Divider clearing/>
                        <DisplayAnswer ansCollection={this.state.objArray}/>
                    </Grid.Column>
                </Grid.Row>
            </Grid>

        );
    }
}
answerPage.propTypes = {
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
module.exports = answerPage;
