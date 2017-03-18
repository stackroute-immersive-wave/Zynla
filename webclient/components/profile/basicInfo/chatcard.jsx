import React from 'react';
import {Segment} from 'semantic-ui-react';
class ChatCard extends React.Component {
  constructor() {
    super();
  }

  render() {
    /* eslint-disable */
    let render = (
      <div className = "chatcard">
        <h2>  {this.props.data.message}</h2>
      </div>
    );
    if(this.props.data.by !== 'bot') {
      console.log(this.props.data.by);
      render = (

        <div className = "chatcardhuman">
          <Segment>
          <h2>{this.props.data.message}</h2>
        </Segment>
        </div>

      );
    }
    /* eslint-enable */
    return (
      <div>
        {render}
      </div>
    );
  }
}

module.exports = ChatCard;
