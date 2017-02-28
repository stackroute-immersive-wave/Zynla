import React from 'react';
import {
   Grid,
   Card,
   Icon,
   Menu
} from 'semantic-ui-react';
class questionpage extends React.Component {
   constructor() {
       super();
     }
   render() {
       return (
        <div>
           <Grid divided='vertically'>
               <Grid.Row columns={3}>
                   <Grid.Column width={2}/>
                   <Grid.Column width={10}>

                       <div>
                           <Card fluid>
                               <Card.Content>
                                   <Card.Header>
                                          How can a child class can change the value of parent
                                          class instance variable
                                   </Card.Header>
                                   <Card.Description className='ansWidth'>
                                     I am working in reactjs and having some errors to resolve.
                                   </Card.Description>
                               </Card.Content>
                                  <Menu>
                                       <Menu.Item>
                                           <Icon name='thumbs up' color='green' size='large'/>
                                           32
                                       </Menu.Item>
                                       <Menu.Item>
                                           <Icon name='thumbs down' color='red' size='large'/>
                                           6
                                           </Menu.Item>
                                           <Menu.Item>
                                               <Icon name='checkmark' color='green' size='large'/>
                                                20 Accepted
                                               </Menu.Item>

                                   </Menu>
                              </Card>
                       </div>
                       <br/>
                       <div>
                           <Card fluid>

                               <Card.Content>
                                   <Card.Header>
                                          How can a child class can change the value of parent
                                           class instance variable
                                   </Card.Header>
                                   <Card.Description className='ansWidth'>
                                     I am working in reactjs and having some errors to resolve.
                                   </Card.Description>
                               </Card.Content>
                                  <Menu>
                                       <Menu.Item>
                                           <Icon name='thumbs up' color='green' size='large'/>
                                           32
                                       </Menu.Item>
                                       <Menu.Item>
                                           <Icon name='thumbs down' color='red' size='large'/>
                                           6
                                           </Menu.Item>
                                           <Menu.Item>
                                               <Icon name='checkmark' color='green' size='large'/>
                                                20 Accepted
                                               </Menu.Item>
                                   </Menu>
                              </Card>
                       </div>
                   </Grid.Column>
                   <Grid.Column width={2}/>
               </Grid.Row>
           </Grid>
           </div>
       );
   }
}
module.exports = questionpage;
