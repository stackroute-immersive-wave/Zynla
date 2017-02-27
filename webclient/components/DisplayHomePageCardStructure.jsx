import React from 'react';
import {Icon, Image, Card} from 'semantic-ui-react';

class Cards extends React.Component {
    constructor() {
        super();
        this.state = {
            check1: true,
            check2: false
        };
    }

    render() {
        return (
            <div id='qw'>
                <Card raised='true'color = 'red' className='item' onClick={this.handleChange}>
                    <Image src={this.props.displayImage} className="imgsize"/>
                    <Card.Header id='textheader' className='spacing'>
                        <b>{this.props.heading}</b>
                    </Card.Header>
                    <div id='textsize' className='spacing'>
                        {this.props.question}
                    </div>
                    <div className='spacing'>
                        <Image className="border" floated='left' size='mini'
                          src='http://semantic-ui.com/images/avatar/large/steve.jpg'/>
                        <Card.Meta>Posted by
                            <a href='' className='clr'>{this.props.postedBy}</a>
                        </Card.Meta>
                        <Card.Meta>On {this.props.addedOn}</Card.Meta>
                        <div>
                            <Card.Meta>Under
                                <a href='' className='clr'>{this.props.category}</a>
                            </Card.Meta>
                        </div>
                    </div>
                    <div className='spacing'>
                        <Icon name='like outline' color='green' id='space'/>{this.props.upVotes}
                        <Icon name='dislike outline' color='red' className='space1'/>
                        {this.props.downVotes}
                        <Icon name='add circle' className="margin" size='large'/>
                    </div>
                    <div id="footer" className='spacing'>
                        <Icon name='write square' size='large'/>
                        <b>{this.props.answerCounts}  Answers</b>
                        <Icon name='checkmark box' color='green' size='large'
                          className="checkmark"/>
                        <b>{this.props.acceptedCounts}  Accepted</b>
                    </div>
                </Card>
            </div>
        );
    }
}
Cards .propTypes = {
   displayImage: React.PropTypes.string.isRequired,
   heading: React.PropTypes.string.isRequired,
   question: React.PropTypes.string.isRequired,
   postedBy: React.PropTypes.string.isRequired,
   addedOn: React.PropTypes.number.isRequired,
   category: React.PropTypes.string.isRequired,
   upVotes: React.PropTypes.string.isRequired,
   downVotes: React.PropTypes.string.isRequired,
   answerCounts: React.PropTypes.string.isRequired,
   acceptedCounts: React.PropTypes.string.isRequired,
   remove: React.PropTypes.func.isRequired
 };

module.exports = Cards;
