// importing the required files
import React, {PropTypes} from 'react';
import {
   Image,
   Button,
   Card,
   Icon,
   Menu,
   Modal,
   Form
} from 'semantic-ui-react';
import {TextArea} from 'semantic-ui-react';
import RichTextEditor from 'react-rte';
import Cookie from 'react-cookie';
import SuggestedCards from './suggQueCardsCollection.jsx';
class MyCard extends React.Component {
    constructor() {
        super();
        this.state = {
            active: false,
            value: RichTextEditor.createEmptyValue(),
            content: '',
            queSuggest: [],
            open: false,
            modalStatus: false,
            modalOpen: false
        };
        this.textVal = this.textVal.bind(this);
        this.postAnswer = this.postAnswer.bind(this);
    }
    // functions to maintain modal states
    open = () => this.setState({ open: true });
    close = () => this.setState({ open: false });
    modalOpen() {
       this.setState({ modalStatus: true });
     }
    static propTypes = {
        onChange: PropTypes.func
    };
    // setting the written content in answer text area in state
    textVal(e) {
      this.setState({content: e.target.value});
    }
    // setting the written content in answer rich text editor in state
    onChange = (value) => {
        this.setState({value});
        if (this.props.onChange) {
            this.props.onChange(value.toString('html'));
        }
    };
    // function to store answer to mongo and neo4j
    postAnswer() {
      // console.log('inside post Answer');
      let ansdata = {
          questionId: this.props.id,
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
            // console.log('success',data);
            this.showRelatedQues();
            this.setState({
              active: false
            });
          },
        error: function() {
            // console.log(this.props.url, status, err.toString());
          }
      });
    }
    // function to show related questions after answering
    showRelatedQues() {
      // console.log('inside showRelatedQues');
      $.ajax({
          url: 'http://localhost:8080/list/suggestQues/' + this.props.id,
          type: 'GET',
          success: function(data) {
            // console.log('inside success show related questions');
              this.setState({queSuggest: data.records});
                // console.log(JSON.stringify(data, undefined, 2));
          },
          error: function() {
              // console.log('error occurred on AJAX');
              // console.log(err);
          }
      });
    }
    // check whether cookie is available so that only registered users can access
    handleOpen() {
        if(Cookie.load('email')) {
          this.setState({active: true});
        }
        else {
          // alert('Please log in to post answer');
        }
    }
    // function to close the modal
    handleClose = () => {
      this.setState({
      modalStatus: false
  });
  // console.log('close');
}
    render() {
        const { open } = this.state;
        // card component which contains dynamic data
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
                          onClick={this.modalOpen.bind(this)}>Answer</Button>
                        <Menu.Menu position='right'>
                            <Menu.Item>
                                <Icon name='flag' color='red'/>
                            </Menu.Item>
                        </Menu.Menu>
                    </Menu>
                </Card>
                <br/>
                {
                /* modal for writing answers */
              }
                <Modal dimmer={true} open={this.state.modalStatus}>
                  <Modal.Header>{this.props.title}</Modal.Header>
                  <Modal.Content>
                    <Form>
                      <Form.Field>
                        <TextArea className='areasize' placeholder='your answer here..'
                           onChange={this.textVal}/>
                           </Form.Field>
                           </Form>
                  </Modal.Content>
                  <Modal.Actions>
                  <Button color='green' onClick={this.handleClose} inverted>
                    <Icon name='remove' /> Cancel
          </Button>
        {
        /* modal for showing suggested questions */
      }
                    <Modal
                      dimmer={true}
                      open={open}
                      onOpen={this.open}
                      onClose={this.close}
                      size='small'
                      trigger={<Button primary size='large'
                        onClick={this.postAnswer.bind(this)}
                        type='button'>Submit</Button>}>
                      <Modal.Header>does your answer matches with these questions..?</Modal.Header>
                      <Modal.Content>
                        {
                        /* <p>That's everything!</p> */
                      }
                        <SuggestedCards quedata={this.state.queSuggest}/>
                      </Modal.Content>
                      <Modal.Actions>
                        <Button icon='check' content='All Done' onClick={this.close} />
                      </Modal.Actions>
                    </Modal>
                  </Modal.Actions>
                </Modal>
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
