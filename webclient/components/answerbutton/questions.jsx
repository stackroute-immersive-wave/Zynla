import React from 'react';
import {
    Grid,
    Divider,
    Icon,
    Breadcrumb
} from 'semantic-ui-react';
import Cards from './cards.jsx';
class anspage extends React.Component {
    constructor() {
        super();
        this.state = {
            active: false,
            objArray: []
        };
        this.getQuestions = this.getQuestions.bind(this);
    }
//     getInitialState(){
//   return {
//     objArray :[]
//     }
// }
    getQuestions() {
      // console.log('inside getquestions');
        $.ajax({
            url: 'http://localhost:8080/list/',
            type: 'GET',
            success: function(data) {
                // console.log(JSON.stringify(data, undefined, 2));
                this.setState({objArray: data});
            }.bind(this),
            error: function() {
                // console.log('error occurred on AJAX');
                // console.log(err);
            }
        });
    }
    componentDidMount() {
        this.getQuestions();
    }

    render() {
        return (
            <Grid divided='vertically'>
                <Grid.Row columns={3}>
                    <Grid.Column width={2}/>
                    <Grid.Column width={10}>
                        <h1>
                            <Icon name='star' color='red'/>Questions For You
                        </h1>
                        <div>
                            <Breadcrumb>
                                <Breadcrumb.Section link>Home</Breadcrumb.Section>
                                <Breadcrumb.Divider icon='right angle'/>
                                <Breadcrumb.Section link>suggested questions</Breadcrumb.Section>
                            </Breadcrumb>
                        </div>
                        <Divider clearing/>
                        <div>
                            <Cards quesCollection={this.state.objArray}/>
                        </div>
                        </Grid.Column>
                    <Grid.Column width={2}/>
                </Grid.Row>
            </Grid>
        );
    }
}
module.exports = anspage;
