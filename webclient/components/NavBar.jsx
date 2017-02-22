import React, {Component} from 'react';
import {
    Input,
    Menu,
    Segment,
    Sidebar,
    Accordion,
    Grid,
    Image,
    Dropdown
} from 'semantic-ui-react';
import {Link} from 'react-router';
let {browserHistory, Router} = require('react-router');
// let Cards = require('./favourite');
// let Invite = require('./invite');
let style = {
    height: 0
};
let Style = {
    marginTop: '5px',
    marginBottom: '5px',
    float: 'left'
};

export default class NavBar extends Component {
    state = {
        visible: false,
        open: false
    }

    componentDidMount() {
        style = {
            height: $(window).height()
        };
    }

    toggleVisibility = () => {
        this.setState({
            visible: !this.state.visible
        });
    }

    toggleSideBar() {
        if (this.state.visible) {
            this.setState({
                visible: !this.state.visible
            });
        }
    }

    handleItemClick = (e, {name}) => {
        this.setState({activeItem: name});
        if (this.state.visible) {
            this.toggleVisibility();
          }
        }

    togetherJS() {
        const script = document.createElement('script');
        script.src = 'https://togetherjs.com/togetherjs-min.js';
        document.body.appendChild(script);
        // TogetherJS(this);
    }

    logoutCall() {
        $.ajax({
            url: 'http://localhost:8080/users/logout', type: 'GET',
            // datatype: 'JSON',
            // data:{username :this.state.username,password:this.state.password},
            success: function(res) {
                if (typeof res.redirect === 'string') {
                    window.location.replace(window.location.protocol + '//' + window.location.host
                     + res.redirect);
                }
                // console.log(res.responseText);
                // browserHistory.push('/');
            },
            error: function() {
                // alert("error occurred while logging out");
                // console.log(err.responseText);
            }
        });
    }

    render() {
        const {visible} = this.state;
        const {activeItem} = this.state;
        // const {open, dimmer} = this.state;
        return (
            <div>
                <Menu secondary id='divStyle'>
                    <Grid>
                        <Grid.Column width={3}>
                            <Menu.Item icon='list' active={activeItem === 'menu'} size='small'
                              id='divStyle' onClick={this.toggleVisibility}/>
                        </Grid.Column>
                        <Grid.Column width={10}>
                            <Link to='/'>
                                <Image src='./../image/logo.png' name='image' active={activeItem
                                  === 'image'} onClick={this.handleItemClick} className='logosize'/>
                            </Link>
                            <Input action='Search' style={Style} placeholder='Search...'
                              className='search'/>
                        </Grid.Column>
                        <Grid.Column width={3}>
                            <Menu.Menu position='right' style={Style} id='divStyle'>
                                <Menu.Item name='Post Question' active={activeItem === 'Posts'}
                                  id='divStyle' onClick={this.handleItemClick}/>
                                <Menu.Item name='Answer' active={activeItem === 'Answer'}
                                  id='divStyle' onClick={this.handleItemClick}/>
                                <Menu.Item name='chat' active={activeItem === 'chat'}
                                  id='divStyle' onClick={this.togetherJS.bind(this)}/>
                                <Menu.Item name='invite' active={activeItem === 'invite'}
                                  id='divStyle' onClick={this.handleItemClick}/>
                                <Dropdown icon='user' active={activeItem === 'friends'}
                                  id='divStyle' onClick={this.handleItemClick} floating labeled
                                   button className='icon'>
                                    <Dropdown.Menu>
                                        <Input icon='search' iconPosition='left'
                                          className='search'/>
                                        <Dropdown.Divider/>
                                        <Dropdown.Header icon='tags' content='Tag Label'/>
                                        <Dropdown.Menu scrolling>
                                            <Dropdown.Item key='aa'/>
                                            <Dropdown.Item key='aa'/>
                                            <Dropdown.Item key='aa'/>
                                            <Dropdown.Item key='aa'/>
                                        </Dropdown.Menu>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </Menu.Menu>
                        </Grid.Column>
                    </Grid>
                </Menu>
                <Sidebar.Pushable as={Segment}>
                    <Sidebar as={Menu} animation='scale down' width='thin' visible={visible}
                      icon='labeled' vertical id='divStyle'>
                        <Accordion>
                            <Accordion.Title>
                                <h5>Categories</h5>
                            </Accordion.Title>
                            <Accordion.Content>
                                <p>c</p>
                                <p>c++</p>
                            </Accordion.Content>
                            <Accordion.Title>
                                <h5>Notification</h5>
                            </Accordion.Title>
                            <Accordion.Title>
                                <h5>Setting</h5>
                            </Accordion.Title>
                        </Accordion>
                    </Sidebar>
                    <Sidebar.Pusher onClick={this.toggleSideBar.bind(this)}>
                        <Segment basic style={style}>
                            <Router history={browserHistory}/>
                        </Segment>
                    </Sidebar.Pusher>
                </Sidebar.Pushable>
            </div>
        );
    }
}

module.exports = NavBar;
