import React from 'react';
//import Cookie from 'react-cookie';
//import {hashHistory} from 'react-router';
import {
    Image,
    Card,
  //  Icon,
    //Menu,
    Divider
    //Button,
    //Modal,
    //TextArea,
    //Form
} from 'semantic-ui-react';
//const ReactToastr = require('react-toastr');
//const {ToastContainer} = ReactToastr;
//const ToastMessageFactory = React.createFactory(ReactToastr.ToastMessage.animation);

let poststyle1 = {
    fontFamily: 'Georgia',
    fontSize: 15,
    fontWeight: 'serif'
};
let ansstyle = {
    fontFamily: 'Cochin',
    fontWeight: 'serif',
    fontSize: 21
};
// let commentstyle = {
//     fontFamily: 'Cochin',
//     fontSize: 14
// };
// let formstyle = {
//     margin: '3% 3% 3% 3% '
// };
// let commentbutton = {
//   marginBottom: '2%',
//   marginLeft: '5%'
// };
// let commentbutton1 = {
//   marginRight: '3%'
// };
class CommentStructure extends React.Component {
    constructor() {
        super();
    }
    render(){
        let ansHtmlContent = this.props.content;
        return(
        <div><Card fluid>
                    <Card.Content style={poststyle1}>
                        <Image floated='left' size='mini'
                          src='http://semantic-ui.com/images/avatar/large/steve.jpg'/>
                        <div><h4>
                            {this.props.name}</h4>
                        </div>
                        <a>{this.props.createdBy}</a>
                        <div>Commented on
                          {new Date(parseInt(this.props.createdOn, 10))
                            .toString().substring(0, 15)}</div>
                    </Card.Content>
                    <Card.Content style={ansstyle}>
                            <div className='content'
                              dangerouslySetInnerHTML={{__html: ansHtmlContent}} />
                    </Card.Content>
                </Card>
                <Divider clearing/></div>
        );
    }
}
CommentStructure.propTypes = {
    createdBy: React.PropTypes.string.isRequired,
    content: React.PropTypes.string.isRequired,
    createdOn: React.PropTypes.string.isRequired,
    id: React.PropTypes.number.isRequired,
    name: React.PropTypes.string.isRequired
};
module.exports = CommentStructure;
