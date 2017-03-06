import React from 'react';
import { Card, Image, Button} from 'semantic-ui-react';
// const logger = require('./../../applogger');

class suggQueCard extends React.Component {
  constructor() {
    super();
  }


  render() {
      return(
        <Card fluid>
            <Card.Content extra>
                <Image className='imageAns' floated='left'
                  size='mini' src={this.props.dp}/>
                <a>
                    {this.props.name}
                </a>
                <p>
                    questioned on {this.props.time}
                    <Button className='plusbtn' color='green' >Add</Button>
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
        </Card>
    );
  }
}
suggQueCard.propTypes = {
  id: React.PropTypes.number.isRequired,
  dp: React.PropTypes.string.isRequired,
  name: React.PropTypes.string.isRequired,
  time: React.PropTypes.number.isRequired,
  title: React.PropTypes.string.isRequired,
  content: React.PropTypes.string.isRequired
  };
module.exports = suggQueCard;
