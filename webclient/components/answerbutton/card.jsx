// written by Arun Mohan Raj
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
// question card component
class QueCard extends React.Component {
    constructor() {
        super();
        this.state = {
            active: false,
            value: RichTextEditor.createEmptyValue(),
            anscontent: '',
            queSuggest: [],
            open: false,
            modalStatus: false,
            modalOpen: false,
            selectques: [],
            questionLists: [],
            iconName: 'add',
            upVotes: 0,
            downVotes: 0,
            colorName: 'green',
            colorNameUnlike: 'red'
        };
        this.textVal = this.textVal.bind(this);
        this.postAnswer = this.postAnswer.bind(this);
        this.handleOpenLoader = this.handleOpenLoader.bind(this);
        this.handleCloseLoader = this.handleCloseLoader.bind(this);
    }
    // functions to maintain modal states
    open = () => this.setState({ open: true });
    close = () => this.setState({ open: false, modalStatus: false });
    // function to open loader initially
    handleOpenLoader() {
      this.setState({ active: true });
    }
    // function to close loader after fetching data
    handleCloseLoader() {
      this.setState({ active: false });
    }
    // function to open modal
    modalOpen() {
       this.setState({ modalStatus: true });
    }
    static propTypes = {
        onChange: PropTypes.func
    };
    // setting the written content in answer text area in state
    textVal(e) {
      this.setState({anscontent: e.target.value});
    }
    // setting the written content in answer rich text editor in state
    onChange = (value) => {
        this.setState({value});
        if (this.props.onChange) {
            this.props.onChange(value.toString('html'));
        }
    };
    // an ajax call inside to find whether a card is already followed or not
    componentWillMount() {
      this.getLikeStatus();
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
            for(let i = 0; i < arr.length; i = i + 1) {
              if(this.props.id === arr[i].id) {
                this.setState({iconName: 'minus'});
              }
            }
          }.bind(this)
        });
    }
    // function to store answer to mongo and neo4j
    postAnswer() {
      // console.log('inside post Answer');
      // answer data to be stored
      this.handleOpenLoader();
      let ansdata = {
          questionId: this.props.id,
          mail: Cookie.load('email'),
          content: this.state.anscontent
      };
      /* eslint-disable */
      let context = this;
      /* eslint-enable */
      // console.log(JSON.stringify(ansdata));
      // ajax call to add answer in neo4j and mongoDB
      $.ajax({
        url: 'http://localhost:8080/answers/add',
        type: 'POST',
        data: ansdata,
        success: function() {
            // console.log('success',data);
            context.showRelatedQues();
            context.setState({
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
      /* eslint-disable */
      let context = this;
      /* eslint-enable */
      // ajax call to get related questions
      $.ajax({
          url: 'http://localhost:8080/list/suggestQues/' + this.props.id,
          type: 'GET',
          success: function(data) {
            // console.log('inside success show related questions');
              context.setState({queSuggest: data.records});
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
// function to get the selected questions
// addSimiliarQuestions(selectedQue, questions)
// {
//  // console.log('getting items from createcards',items);
//    this.setState({selectques: selectedQue});
//    this.setState({questionLists: questions});
//    // console.log('display states',this.state.follows);
// }
// to get array containing the user selected queIDs
    getSuggQueArray(arr) {
      this.setState({questionLists: arr});
    }
    // linking answers with all suggested queIDs
    linkAnswer() {
      let queArray = this.state.questionLists;
      for (let i = 0; i < queArray.length; i = i + 1) {
        let ansdata = {
            questionId: queArray[i],
            mail: Cookie.load('email'),
            content: this.state.anscontent
        };
        /* eslint-disable */
        let context = this;
        /* eslint-enable */
        $.ajax({
          url: 'http://localhost:8080/answers/add',
          type: 'POST',
          data: ansdata,
          success: function() {
              // console.log('success', data);
            },
          error: function() {
              // console.log(this.props.url, status, err.toString());
            }
        });
      }
      this.close();
    }
    // function to save card in profile
    saveToProfile() {
        let emailId = Cookie.load('email');
        $.ajax({
            url: '/users/saveToProfile',
            type: 'PUT',
            data: {
                emailId: emailId,
                id: this.props.id,
                displayImage: this.props.dp,
                heading: this.props.title,
                statement: this.props.content,
                postedBy: this.props.name,
                views: this.props.views,
                profileImage: this.props.profileImage,
                addedOn: this.props.time,
                category: this.props.category,
                upVotes: this.props.upvote,
                downVotes: this.props.downvote,
                answerCounts: this.props.anscount
            },
            success: function() {
                 this.setState({iconName: 'minus', text: 'saved'});
            }.bind(this),
            error: function() {}
        });
    }
    // getting the initial like status to display
    getLikeStatus() {
        let id = this.props.id;
        let email = Cookie.load('email');
        this.setState({upVotes: this.props.upvote, downVotes: this.props.downvote});
     $.ajax({
            url: 'http://localhost:8080/list/likestatus',
            type: 'POST',
            data: {
                id: id,
                email: email
            },
            success: function(data) {
                // console.log(data);
                if(data.like) {
                    this.setState({
                        colorName: 'blue'
                    });
                }
                else {
                    this.setState({
                        colorName: 'green'
                    });
                }
                if(data.unlike) {
                    this.setState({
                        colorNameUnlike: 'black'
                    });
                }
                else {
                    this.setState({
                        colorNameUnlike: 'red'
                    });
                }
            }.bind(this)
          });
    }
    // function to update like for queCards
    updatelike() {
      // console.log('inside update like');
        let type = 'add';
        let color = 'blue';
        let upVotesTemp = parseInt(this.state.upVotes, 10) + 1;
        if(this.state.colorName === 'green') {
            type = 'add';
            upVotesTemp = parseInt(this.state.upVotes, 10) + 1;
            color = 'blue';
        }
        else {
            type = 'delete';
            upVotesTemp = parseInt(this.state.upVotes, 10) - 1;
            color = 'green';
        }
      let id = this.props.id;
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
                // console.log('comes success update like');
                this.setState({
                    colorName: color,
                    upVotes: upVotesTemp
                });
            }.bind(this)
          });
    }
    // function to update dislike for queCards
    updateunlike() {
        // console.log("coming to update unlike");
        let type = 'add';
        let color = 'red';
        let downVotesTemp = parseInt(this.state.downVotes, 10) + 1;
        if(this.state.colorNameUnlike === 'red') {
            type = 'add';
            downVotesTemp = parseInt(this.state.downVotes, 10) + 1;
            color = 'black';
        }
        else {
            type = 'delete';
            downVotesTemp = parseInt(this.state.downVotes, 10) - 1;
            color = 'red';
        }
      let id = this.props.id;
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
              // console.log('success dislike');
                this.setState({
                    colorNameUnlike: color,
                    downVotes: downVotesTemp
                });
            }.bind(this)
          });
    }
    render() {
        const { open } = this.state;
        // const { active } = this.state;
        let save = (<Icon name={this.state.iconName} circular
                    className='plusbtn' color='green' size='large'/>);
        // let save = <Icon name='minus' circular
        //             className='plusbtn' color='green' size='large'/>;
        // card component which contains dynamic data
        return (
            <div>
                {
                  /* <Dimmer active={active} page>
                  <Loader>Fetching Related Questions</Loader>
                </Dimmer> */
              }
                <Card fluid>
                    <Card.Content extra>
                        <Image className='imageAns' floated='left'
                          size='mini' src={this.props.dp}/>
                        <a>
                            {this.props.name}
                        </a>
                        <p>
                            questioned on {this.props.time}
                            <span className='plusbtnhover' onClick={this.saveToProfile.bind(this)}>
                              {save}
                            </span>
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
                          <span onClick={this.updatelike.bind(this)}>
                            <Icon name='thumbs up'
                              color={this.state.colorName || 'green'} size='large'/>
                            {this.state.upVotes}
                          </span>
                        </Menu.Item>
                        <Menu.Item>
                          <span onClick={this.updateunlike.bind(this)}>
                            <Icon name='thumbs down'
                              color={this.state.colorNameUnlike || 'red'} size='large'/>
                            {this.state.downVotes}
                          </span>
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
                        <SuggestedCards qid={this.props.id} quedata={this.state.queSuggest}
                          ansContent={this.state.anscontent}
                          suggArr={this.getSuggQueArray.bind(this)}/>
                      </Modal.Content>
                      <Modal.Actions>
                        <Button icon='check' color='teal' content='All Done'
                          onClick={this.linkAnswer.bind(this)} />
                      </Modal.Actions>
                    </Modal>
                  </Modal.Actions>
                </Modal>
            </div>
        );
    }
}
QueCard.propTypes = {
  id: React.PropTypes.number.isRequired,
  dp: React.PropTypes.string.isRequired,
  name: React.PropTypes.string.isRequired,
  time: React.PropTypes.number.isRequired,
  title: React.PropTypes.string.isRequired,
  content: React.PropTypes.string.isRequired,
  upvote: React.PropTypes.number.isRequired,
  downvote: React.PropTypes.number.isRequired,
  anscount: React.PropTypes.number.isRequired,
  views: React.PropTypes.number.isRequired,
  profileImage: React.PropTypes.string.isRequired,
  category: React.PropTypes.string.isRequired
};
module.exports = QueCard;
