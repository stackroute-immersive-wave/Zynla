import React from 'react';
import {
    Grid,
    Image,
    Button,
    Divider,
    Card,
    Icon,
    Breadcrumb,
    Menu,
    Segment,
    Form,
    Modal,
    Popup
} from 'semantic-ui-react';
import {PropTypes} from 'react';
import RichTextEditor from 'react-rte';
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
            value: RichTextEditor.createEmptyValue(),
            id: ''
        };
        // this.getData = this.getData.bind(this);
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
    // find({'id':id}).then((docs) => {
    //     res.send(docs);
    // }, (err) => {
    //     res.send(err);
    // });

    //   getData(){
    //     $.ajax({
    //          url: "http://localhost:8080/list",
    //          type: 'GET',
    //          success: function(data) {
    //              console.log(JSON.stringify(data, undefined, 2));
    //              this.setState({objArray: data});
    //          }.bind(this),
    //          error: function(err) {
    //              console.log('error occurred on AJAX');
    //              console.log(err);
    //          }.bind(this)
    //      });
    //  }

    // componentDidMount() {
    //     let id = window.location.hash.split('id=')[1];
    //     // this.setState({id: id});
    //     // console.log('id:'+id);
    //     this.getData();
    // }
    render() {
        // let id = window.location.hash.split('id=')[1];
        return (

            <Grid divided='vertically'>
                <Grid.Row columns={3}>
                    <Grid.Column width={2}/>
                    <Grid.Column width={10}>
                        <div style={titlestyle}>
                            Firebase Invites for React Native
                            <texteditor/>
                            <Icon style={followstyle} name='add' size='small' color='green'/>
                        </div>
                        <div style={questionstyle}>We are currently using Firestack on a React
                          Native project which is great,
                           however we also need the features available via Firebase's "Invites"
                            capability. Is anyone aware of
                            a React Native module (eg on github) for Firebase Invites,
                            iOS and Android ?</div>
                        <Breadcrumb>
                            <Breadcrumb.Section link>Javascript</Breadcrumb.Section>
                            <Breadcrumb.Divider icon='right angle'/>
                            <Breadcrumb.Section link>React</Breadcrumb.Section>
                            <Breadcrumb.Divider icon='right angle'/>
                            <Breadcrumb.Section link>Semantic UI</Breadcrumb.Section>
                        </Breadcrumb>
                        <Segment floated='right'>
                            <div>Asked on feb 14th</div>
                            <Image floated='left' size='mini'
                              src='http://semantic-ui.com/images/avatar/large/steve.jpg'/>
                            <a>
                                Peter
                            </a>
                        </Segment>
                        <div style ={crumstyle}>
                            <Icon style={likestyle} name='thumbs up' size='large' color='green'/>20
                            <Icon style={unlikestyle} name='thumbs down' size='large' color='red'/>5
                            <Button basic color='blue' content='Views' style={viewstyle} label={{
                                as: 'a',
                                basic: true,
                                color: 'blue',
                                pointing: 'left',
                                content: '1,048'
                            }}/>
                            <Modal trigger={< Button positive style = {
                                buttonfolstyle
                            }
                            size = 'mini' > Click to Answer < /Button>}>
                            <Modal.Content>
                                    <Form>
                                        <RichTextEditor
                                          value={this.state.value}
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
                        <div style={ansstyle1}>23 Answers</div>
                        <Divider clearing/>
                        <div>
                          <Card fluid>
                                <Card.Content
                                  style={poststyle1}>
                                    <Image
                                      floated='left'
                                      size='mini'
                                      src='http://semantic-ui.com/images/avatar/large/steve.jpg'/>
                                    <a>
                                        Peter
                                      </a>
                                    <div>Answered on feb 14th
                                        <Icon name='add user'
                                          style={addicon} size='big' color='blue'/></div>
                                      </Card.Content>
                                <Card.Content>
                                  <Card.Header style={ansstyle}>
                                        Updating parent's variable with parent.variable is a wrong
                                         thought on OOP. When you extend
                                        the parent class, think like your child class became
                                        one with the parent, they are not separated anymore,
                                        so think like the variable is child's from now on.
                                        But just Updating parent's variable with parent.variable
                                        is a wrong thought on OOP. When you extend the parent
                                         class, think like your child class became one with
                                        the parent, they are not separated anymore, so think
                                         like the variable is child's now on.
                                    </Card.Header>
                                </Card.Content>
                                <Menu style={commentstyle}>
                                    <Menu.Item>
                                        <Icon name='thumbs up' size='large' color='green'/>
                                        32
                                    </Menu.Item>
                                    <Menu.Item>
                                        <Icon name='thumbs down' size='large' color='red'/>
                                        6
                                    </Menu.Item>
                                    <Menu.Item>
                                        <Icon name='checkmark' size='large' color='green'/>
                                        6
                                    </Menu.Item>
                                    <Menu.Item>
                                        Add comment
                                    </Menu.Item>
                                    <Menu.Menu position='right'>
                                        <Menu.Item>
                                            <Popup on='click' trigger={<
                                              Icon name = 'ellipsis horizontal'
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
                        </div>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        );
    }
}

module.exports = anspage;
