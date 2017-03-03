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
    Modal
} from 'semantic-ui-react';
import {PropTypes} from 'react';
import RichTextEditor from 'react-rte';
const DisplayAnswer = require('./AnswerDisplay');
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
    marginLeft: '30%'
};
class anspage extends React.Component {
    constructor() {
        super();
        this.state = {
            active: false,
            value: RichTextEditor.createEmptyValue(),
            id: '',
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
        this.getData = this.getData.bind(this);
    }
    static propTypes = {
        onChange: PropTypes.func
    };
    onChange = (value) => {
        this.setState({value});
        if (this.props.onChange) {
            this.props.onChange(value.toString('html'));
        }
    };

    getData() {
        let id = window.location.hash.split('id=')[1];
        $.ajax({
            url: 'http://localhost:8080/list/' + id,
            type: 'GET',
            success: function(data) {
                // console.log('inside ajax call', JSON.stringify(data, undefined, 2));
                this.setState({objArray: data});
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
                            <texteditor/>
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
                                content: quesObj[0].views
                            }}/>
                            <Modal trigger={<Button positive style = {
                                buttonfolstyle
                            }
                            size = 'mini'> Click to Answer </Button>}>
                                <Modal.Content>
                                    <Form>
                                        <RichTextEditor value={this.state.value}
                                          onChange={this.onChange}/>
                                      </Form>
                                </Modal.Content>
                                <Modal.Actions>
                                    <Button color='red'>
                                        Cancel
                                    </Button>
                                    <Button color='green'>
                                        Submit
                                    </Button>
                                </Modal.Actions>
                            </Modal>
                            <Button negative style ={buttonfolstyle} size='mini'>Report</Button>
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

module.exports = anspage;
