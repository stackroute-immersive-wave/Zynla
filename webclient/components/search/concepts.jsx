import React from 'react';
import ConceptStructure from './conceptStructure.jsx';
import {Grid, Icon} from 'semantic-ui-react';
class Concepts extends React.Component {
    constructor() {
        super();
        this.state = {
            start: 0,
            end: 3
        };
    }

   /* Favourite category maximum 4 display by right side Click*/
    changeStartRight() {
        let start;
        let end;
        if (this.state.start + 4 > this.props.json.length) {
            start = 0;
            end = 0;
        } else {
            start = this.state.start + 4;
        }
        if (this.state.end + 4 > this.props.json.length) {
            end = this.props.json.length;
        } else {
            end = this.state.end + 4;
        }
        if (start === 0) {
            end = 3;
          }
        this.setState({start: start, end: end});
    }
    /* Favourite category maximum 4 display by left side Click*/
    changeStartLeft() {
        let start = 0;
        if (this.state.start - 4 < 0) {
            start = 0;
        } else {
            start = this.state.start - 4;
        }
        let end = this.state.end - 4;
        this.setState({start: start, end: end});
    }

   render() {
        let conceptName = [];
        for (let i = this.state.start; i <= this.state.end; i = i + 1) {
            if (typeof this.props.json[i] !== 'undefined') {
                conceptName.push(this.props.json[i]);
            }
        }
        // map function to send concepts of a topic to child (conceptStructure)
        let Data = conceptName.map(function(item, index) {
            return (
                <Grid.Column key = {index}>
                    <ConceptStructure conceptName={item.name}/>
                </Grid.Column>
            );
        });
        return (
          <div className = 'favbg'>
            <Grid centered stackable style = {{marginTop: -30 + 'px', marginLeft: 75 + 'px'}}>
                <Grid.Column stackable width={2} style={{marginTop: 56 + 'px',
                 marginRight: -35 + 'px' }} className='arrowsize'>

                    <Icon name='chevron left' onClick={this.changeStartLeft.bind(this)}/>
                </Grid.Column>
                <Grid.Column stackable width={6} stackable centered style={{marginLeft: -70 + 'px',
                 marginTop: 40 + 'px', marginBottom: -70 + 'px', marginRight: -50 + 'px'}} >
                    <Grid centered columns={4}>
                        {Data}
                    </Grid>
                </Grid.Column>
                <Grid.Column stackable width={2} style={{marginTop: 56 + 'px',
                 marginLeft: 70 + 'px'}} className='arrowsize'>
                    <Icon name='chevron right' onClick={this.changeStartRight.bind(this)}/>
                </Grid.Column>
             <Grid.Column width={3} stackable className='arrowsize' style={{paddingTop: 80 + 'px'}}>
            <Icon name = "plus circle" color={'red'} size = "huge"
             onClick = {this.props.followTopic.bind(this)}/>
                         {this.props.ques} {this.props.topic}
                </Grid.Column>
            </Grid>
          </div>
        );
    }
  }
  // type that props will accept coming from the parent
  Concepts.propTypes = {
   json: React.PropTypes.array,
   topic: React.PropTypes.string,
   ques: React.PropTypes.string,
   followTopic: React.PropTypes.func
 };
  module.exports = Concepts;
