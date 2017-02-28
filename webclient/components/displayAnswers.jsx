import React from 'react';
import {
    Grid,
    Divider,
    Card,
    Icon,
    Breadcrumb,
    Menu
} from 'semantic-ui-react';
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
// let poststyle1 = {
//     fontFamily: 'Georgia',
//     fontSize: 15,
//     fontWeight: 'serif'
// };
// let tagstyle = {
//     fontFamily: 'Cochin',
//     fontSize: 18,
//     marginTop: '3%'
// };
let ansstyle = {
    fontFamily: 'Cochin',
    fontWeight: 'serif',
    marginBottom: '50px'
};
let cardstyle = {
    marginBottom: '50px',
    height: '50px'
};

// let addicon = {
//     marginLeft: '70%'
// };
let commentstyle = {
    fontFamily: 'Cochin',
    fontSize: 18
};
// let buttonfolstyle = {
//     marginLeft: '5%'
// };
// let astyle = {
//     marginLeft: '4%'
// }
// let crumstyle = {
//     marginTop: '2%'
// }
// let iconstyle1 = {
//     marginLeft: '3%'
// }
// let viewstyle = {
//     marginLeft: '4%'
// }
// let likestyle = {
//     marginLeft: '4%'
// }
// let unlikestyle = {
//     marginLeft: '4%'
// }
class anspage extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
            <Grid divided='vertically'>
                <Grid.Row columns={3}>
                    <Grid.Column width={2}/>
                    <Grid.Column width={10}>
                        <div style={titlestyle}>
                            Firebase Invites for React Native
                        </div>
                        <div style={questionstyle}>We are currently using Firestack on a React
                          Native project which is great, however we also need the features
                          available via Firebases Invites capability. Is anyone aware of a
                           React Native module (eg on github) for Firebase Invites, iOS and
                           Android ?</div>
                        <Breadcrumb>
                            <Breadcrumb.Section link>Home</Breadcrumb.Section>
                            <Breadcrumb.Divider icon='right angle'/>
                            <Breadcrumb.Section link>Store</Breadcrumb.Section>
                            <Breadcrumb.Divider icon='right angle'/>
                            <Breadcrumb.Section link>T-Shirt</Breadcrumb.Section>
                        </Breadcrumb>

                        <Divider clearing/>
                        <div>
                            <Card fluid>

                                <Card.Content style={cardstyle}>
                                    <Card.Header style={ansstyle}>
                                        Updating parent's variable with parent.variable is a
                                        wrong thought on OOP. When you extend the parent class,
                                        think like your child class became one with the parent,
                                        they are not separated anymore, so think like the variable
                                         is child's from now on. But just Updating parent's
                                         variable with parent.variable is a wrong thought on OOP.
                                          When you extend the parent class, think like your child
                                           class became one with the parent, they are not
                                           separated anymore, so think like the variable
                                         is child's from now on.
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
