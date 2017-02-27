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
import Cookie from 'react-cookie';
import {Route, Router, hashHistory} from 'react-router';
let Cards = require('./Home');
let Invite = require('./Invite');
let style = {
    height: 0
};
let Style = {
    marginTop: '5px',
    marginBottom: '5px',
    float: 'left'
};

class NavBar extends Component {
    state = {
        visible: false,
        open: false
    }

    componentWillMount() {
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
        const backImage = {
            image: Cookie.load('profilepicture')
        };
        // const {open, dimmer} = this.state;
        return (
            <div style={style}>
                <Menu secondary id='divStyle'>
                    <Grid>
                        <Grid.Column width={3}>
                            <Menu.Item icon='list' active={activeItem === 'menu'} size='small'
                              id='divStyle' onClick={this.toggleVisibility}/>
                        </Grid.Column>
                        <Grid.Column width={10}>
                            <Link to='/home'>
                                <Image src='./../image/logo.png' name='image' active=
                                {activeItem === 'image'} onClick={this.handleItemClick}
                                className='logosize'/>
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
                                <Link to='/invite'>
                                    <Menu.Item name='invite' active={activeItem === 'invite'}
                                      id='divStyle' onClick={this.handleItemClick}/>
                                </Link>
                                <Dropdown icon='user' style={backImage} active={activeItem ===
                                  'friends'} id='divStyle' onClick={this.handleItemClick} floating
                                  labeled button className='icon'>
                                    <Dropdown.Menu>
                                        <Image src={Cookie.load('profilepicture')} alt='img'/>
                                        <span className='profileColor'>
                                            {Cookie.load('username')}</span>
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
                        <Segment basic>
                            <Router history={hashHistory}>
                                <Route path='/home' component={Cards}/>
                                <Route path='/invite' component={Invite}/>
                            </Router>
                        </Segment>
                    </Sidebar.Pusher>
                </Sidebar.Pushable>
            </div>
        );
    }
}

module.exports = NavBar;
