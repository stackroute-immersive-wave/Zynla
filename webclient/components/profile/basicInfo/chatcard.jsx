import React from 'react';
import {Segment} from 'semantic-ui-react';
class ChatCard extends React.Component {
  constructor() {
    super();
  }

  render() {
    /* eslint-disable */
    let chatContent = this.props.data.message;
    console.log(chatContent);
    let chatCardContent = (
      <div className = "chatcard">
        {this.props.data.message}
      </div>
    );
    // if(this.props.data.by !== 'bot') {
    //   console.log(this.props.data.by);
    //   chatCardContent = (
    //
    //     <div className = "chatcardhuman">
    //       <Segment>
    //       {this.props.data.message}
    //     </Segment>
    //     </div>
    //
    //   );
    // }
    /* eslint-enable */
    return (
      <div>
        {chatCardContent}
      </div>
    );
  }
}

module.exports = ChatCard;
