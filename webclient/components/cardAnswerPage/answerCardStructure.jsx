import React from 'react';
import Cookie from 'react-cookie';
import {
    Image,
    Card,
    Icon,
    Menu,
    Popup,
    Divider,
    Button
} from 'semantic-ui-react';
let poststyle1 = {
    fontFamily: 'Georgia',
    fontSize: 15,
    fontWeight: 'serif'
};
let ansstyle = {
    fontFamily: 'Cochin',
    fontWeight: 'serif'
};
let addicon = {
    marginLeft: '70%'
};
let commentstyle = {
    fontFamily: 'Cochin',
    fontSize: 18
};
class cardAnswer extends React.Component {
    constructor() {
        super();
        this.state = {
            isAccepted: false,
            btnValue: 'Accept'
        };
    }
    updateAcceptAns()
    // accepting the answer by user (by sumit on 11/3/2017 )
    {
        let email = Cookie.load('email');
        let id = this.props.id;
        let questionId = this.props.quesId;
        // console.log('Question:' + questionId + '\nAnswer:' + id);
        let ansdata = {
            questionId: questionId,
            id: id,
            email: email
        };
        /*eslint-disable*/
        let context = this;
        /*eslint-enable*/
        $.ajax({
            url: 'http://localhost:8080/list/UpdateAcceptans',
            type: 'POST',
            data: ansdata,
            success: function() {
                context.setState({isAccepted: true, btnValue: 'Accepted'});
            },
            error: function() {}
        });
    }
    render() {
        // accepting the answer by user (by sumit on 10/3/2017 )
        let accept = '';
        let btn = (
            <Button primary onClick={this.updateAcceptAns.bind(this)}>{this.state.btnValue}</Button>
        );
        if (this.props.isAccepted) {
            accept = (<Icon name='checkmark' size='large' color='green'/>);
        } else if (Cookie.load('email') === this.props.postedBy) {
            accept = btn;
        }
        // displaying answer in answerpage created by Aswini K
        return (
            <div>

                <Card fluid>
                    <Card.Content style={poststyle1}>
                        <Image floated='left' size='mini'
                          src='http://semantic-ui.com/images/avatar/large/steve.jpg'/>
                        <a>
                            {this.props.createdBy}
                        </a>
                        <div>Answered on {this.props.createdOn}
                            <Icon name='add user' style={addicon} size='big' color='blue'/></div>
                    </Card.Content>
                    <Card.Content>
                        <Card.Header style={ansstyle}>
                            {this.props.content}
                        </Card.Header>
                    </Card.Content>
                    <Menu style={commentstyle}>
                        <Menu.Item>
                            <Icon name='thumbs up' size='large' color='green'/>
                            {this.props.upvote}
                        </Menu.Item>
                        <Menu.Item>
                            <Icon name='thumbs down' size='large' color='red'/>
                            {this.props.downvote}
                        </Menu.Item>
                        <Menu.Item>
                            {accept}
                        </Menu.Item>
                        <Menu.Item>Add Comment</Menu.Item>
                        <Menu.Menu position='right'>
                            <Menu.Item>
                                <Popup on='click' trigger={<Icon name = 'ellipsis horizontal'
                                  size = 'large' />} hideOnScroll>
                                    <Menu vertical>
                                        <Menu.Item>Comments</Menu.Item>
                                        <Menu.Item>Save Answer</Menu.Item>
                                    </Menu>

                                </Popup>

                            </Menu.Item>
                        </Menu.Menu>
                    </Menu>
                </Card>
                <Divider clearing/>
            </div>
        );
    }
}
cardAnswer.propTypes = {
    createdBy: React.PropTypes.string.isRequired,
    createdOn: React.PropTypes.number.isRequired,
    content: React.PropTypes.string.isRequired,
    upvote: React.PropTypes.number.isRequired,
    downvote: React.PropTypes.number.isRequired,
    isAccepted: React.PropTypes.string.isRequired,
    id: React.PropTypes.number.isRequired,
    quesId: React.PropTypes.number.isRequired,
    postedBy: React.PropTypes.string.isRequired

};
module.exports = cardAnswer;
