import React from 'react';
import {
   Image,
   Button,
   Card,
   Icon,
   Menu,
   Header,
   Dimmer
} from 'semantic-ui-react';
import { Form, TextArea, Container } from 'semantic-ui-react';
// import RichTextEditor from 'react-rte';
// import Cookie from 'react-cookie';
// const logger = require('./../../applogger');

class MyCard extends React.Component {
    constructor() {
        super();
        this.state = {
            active: false,
            // value: RichTextEditor.createEmptyValue(),
            content: ''
        };
        this.textVal = this.textVal.bind(this);
        this.postAnswer = this.postAnswer.bind(this);
    }
    // static propTypes = {
    //     onChange: PropTypes.func
    // };
    textVal(e) {
      this.setState({content: e.target.value});
    }
    // onChange = (value) => {
    //     this.setState({value});
    //     if (this.props.onChange) {
    //         this.props.onChange(value.toString('html'));
    //     }
    // };
    postAnswer() {
      // console.log('inside post Answer');
      let ansdata = {
          questionId: this.props.id,
          mail: 'Arun',
          content: this.state.content
      };
      // let context = this;
      // console.log(JSON.stringify(ansdata));
      $.ajax({
        url: 'http://localhost:8080/answers/add',
        type: 'POST',
        data: ansdata,
        success: function() {
            // console.log('success',data);
            this.setState({
              active: false
            });
          },
        error: function() {
            // console.log(this.props.url, status, err.toString());
          }
      });
    }
    handleOpen() {
        this.setState({active: true});
    }
    handleClose() {
        this.setState({active: false});
    }
    render() {
        const {active} = this.state;
        return (
            <div>
                <Card fluid>
                    <Card.Content extra>
                        <Image className='imageAns' floated='left'
                          size='mini' src={this.props.dp}/>
                        <a>
                            {this.props.name}
                        </a>
                        <p>
                            questioned on {this.props.time}
                            <Icon name='add' circular
                              className='plusbtn' color='green' size='large'/>
                        </p>
                    </Card.Content>
                    <Card.Content>
                        <Card.Header>
                            {this.props.title}
                        </Card.Header>
                        <Card.Description className='ansWidth'>
                            {this.props.content}
                        </Card.Description>
                    </Card.Content>
                    <Menu>
                        <Menu.Item>
                            <Icon name='thumbs up' color='green' size='large'/>
                            {this.props.upvote}
                        </Menu.Item>
                        <Menu.Item>
                            <Icon name='thumbs down' color='red' size='large'/>
                            {this.props.downvote}
                        </Menu.Item>
                        <Menu.Item>
                            <Icon name='write' color='grey' size='large'/>
                            {this.props.anscount}
                        </Menu.Item>
                        <Button className='anspad' color='teal'
                          onClick={this.handleOpen.bind(this)}>Answer</Button>
                        <Menu.Menu position='right'>
                            <Menu.Item>
                                <Icon name='flag' color='red'/>
                            </Menu.Item>
                        </Menu.Menu>
                    </Menu>
                </Card>
                <br/>
                <Dimmer active={active} onClickOutside={this.handleClose.bind(this)} page>
                    <Header as='h2' icon>
                        <Header.Subheader>
                            <Container>
                                <Form>
                                    <Form.Field>
                                      <h1 className='ques'>{this.props.title}</h1>
                                        <h2 style={{
                                            marginLeft: -940 + 'px',
                                            color: 'white'
                                        }}>Your answer here:</h2>
                                    </Form.Field>
                                    <Form.Field>
                                        <TextArea onChange={this.textVal}/>
                                    </Form.Field>
                                    <Form.Field>
                                        <Button primary size='large'
                                          onClick={this.postAnswer.bind(this)}
                                          type='button'>Submit</Button>
                                    </Form.Field>
                                </Form>
                            </Container>
                        </Header.Subheader>
                    </Header>
                </Dimmer>
            </div>
        );
    }
}
MyCard.propTypes = {
  id: React.PropTypes.number.isRequired,
  dp: React.PropTypes.string.isRequired,
  name: React.PropTypes.string.isRequired,
  time: React.PropTypes.number.isRequired,
  title: React.PropTypes.string.isRequired,
  content: React.PropTypes.string.isRequired,
  upvote: React.PropTypes.string.isRequired,
  downvote: React.PropTypes.string.isRequired,
  anscount: React.PropTypes.string.isRequired
};
module.exports = MyCard;
