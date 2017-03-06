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
    float: 'right'
};
let astyle = {
    marginLeft: '5%'
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
    }
    render() {
        let quesObj = this.state.objArray;
        return (

            <Grid divided='vertically'>
                <Grid.Row columns={3}>
                    <Grid.Column width={2}/>
                    <Grid.Column width={10}>
                        <div style={titlestyle}>
                            {quesObj[0].heading}
                            <Icon style={followstyle} name='add' size='small' color='green'/>
                        </div>
                        <div style={questionstyle}>{quesObj[0].question}</div>
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
                            <Icon style={likestyle} name='thumbs up' size='large' color='green'/>
                            {quesObj[0].upVotes}
                            <Icon style={unlikestyle} name='thumbs down' size='large' color='red'/>
                            {quesObj[0].downVotes}
                            <Button basic color='blue' content='Views' style={viewstyle} label={{
                                as: 'a',
                                basic: true,
                                color: 'blue',
                                pointing: 'left',
                                content: quesObj[0].views + 1
                            }}/>
                            <Modal trigger={< Button positive style = {
                                buttonfolstyle
                            }
                            size = 'mini' > Click to Answer < /Button>}>
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
                                    <Button color='red'>
                                        Cancel
                                    </Button>
                                    <Button color='green' onClick={this.postAnswer.bind(this)}
                                      type='button'>
                                        Submit
                                    </Button>
                                </Modal.Actions>
                            </Modal>
                            <Button negative style ={buttonfolstyle} size='mini'>Report</Button>
                            <Modal trigger={< a style = {
                                astyle
                            } > Add Comment < /a>}>
                                <Form style={formstyle}>
                                    <Form.TextArea/>
                                    <Button content='Submit' primary/>
                                </Form>
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

module.exports = answerPage;
