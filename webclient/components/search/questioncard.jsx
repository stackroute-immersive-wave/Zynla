import React from 'react';
import {
    Icon,
    Image,
    Card,
    Button,
    Segment
} from 'semantic-ui-react';
import {Link} from 'react-router';
import Cookie from 'react-cookie';
class questionCard extends React.Component {
    constructor() {
        super();
        this.state = {
            check1: true,
            check2: false,
            iconName: 'save',
            text: 'save'
        };
    }

    handleShow = () => this.setState({active: true})
    handleHide = () => this.setState({active: false})

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
                noofans: this.props.answerCounts
            },
            success: function() {
                this.setState({iconName: 'add', text: 'saved'});
            }.bind(this),
            error: function() {}
        });
    }
    render() {
        const {active} = this.state;
        const content = (
                <Button circular onClick={this.saveToProfile.bind(this)}
                  icon='plus' className='spacing' id='iconColor'
                  size='tiny' style={{'font-size': 20 + 'px'}}/>
          );

        return (
            <div className='CardSegment'>
                <Card raised='true' className='item' onClick={this.handleChange}>
                    <Link to= {'/answerPage?id=' + this.props.id}>
                        <div className="PaddingCards">
                            <Image src={this.props.displayImage} className="imgsize"
                             onMouseEnter={this.handleShow} dimmer={{active, content}}
                              onMouseLeave={this.handleHide}/>
                            <div>
                            <Card.Header id='textheader' className='spacing'>
                                <b>{this.props.heading}</b>
                            </Card.Header>
                            </div>
                          </div>
                            </Link>
                            <div className='spacing' id='PaddingCards1'>
                                <Image className="border" floated='left' size='mini'
                                  src='http://semantic-ui.com/images/avatar/large/steve.jpg'
                                />
                                <Card.Meta>
                                    <a href='' className='LinkColor'>{this.props.postedBy}</a>
                                </Card.Meta>
                                <Card.Meta>
                                    {this.props.addedOn}
                                </Card.Meta>
                            </div>

                        <div className="PaddingCardsBottom">
                            <Segment.Group horizontal>
                              <Segment><Icon name='like outline' color='green'/>{this.props.upVotes}
                            </Segment>
                              <Segment><Icon name='eye' color='black' size='large'/>
                              <b>{this.props.views}
                              </b></Segment>
                              <Segment><Icon name='write square' size='large'/>
                              <b>{this.props.answerCounts}
                              </b></Segment>
                            </Segment.Group>
                      </div>
                </Card>
            </div>
        );
    }
}
questionCard.propTypes = {
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

module.exports = questionCard;
