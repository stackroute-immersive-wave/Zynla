import React from 'react';
/* eslint-disable */
class ListOfToc extends React.Component {
   constructor(props) {
       super(props);
       this.state = {
 };
}
componentWillMount(){

}
    render()
    {
      console.log(this.props.toc.toc)
      return(
        <Card>
    <Card.Content>
      {this.props.toc.toc}
        </Card.Content>

    </Card>
      )

    }
}
module.exports = ListOfToc;
/* eslint-enable */
