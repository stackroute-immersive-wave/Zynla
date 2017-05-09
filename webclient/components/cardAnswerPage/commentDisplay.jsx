//import {PropTypes} from 'react';
import React from 'react';
import CommentPage from './commentPage.jsx';
import {
    Grid,
    Image,
   // Button,
    Divider,
   // Icon,
    //Breadcrumb,
    Segment
   // Form,
    // Modal,
    // TextArea,
    // Popup,
    // Checkbox,
    // Dimmer,
    // Loader,
    // Header
} from 'semantic-ui-react';
let date = {
    marginTop: '1%',
    fontSize: 15
};
let titlestyle = {
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: '5%'
};

class CommentCards extends React.Component {
    constructor () {
        super();
        this.state = {
            active: false,
            objArray:{
                id: 0,
                createdBy: '',
                content: '',
                createdOn: '',
                image: '',
                upVote: 0,
                downVote: 0,
                isAccepted: false,
                name: '',
                comment: [
                {
                    id: 0,
                    createdBy: '',
                    content: '',
                    createdOn: '',
                    name: ''
                }
            ]
        },
            ansId: 0
        };
        this.getComments = this.getComments.bind(this);
    }
    handleOpen() {this.setState({ active: true });}
    handleClose() {this.setState({ active: false });}

    getComments() {
        this.handleOpen();
        let retId = window.location.hash.split('qid=')[1];
        let id = retId.split('&aid=');
        console.log("qid & aid: "+id[0] + " "+ id[1]);
        this.setState({ansId: parseInt(id[1], 10)});
        let data = {qid: parseInt(id[0], 10),
                    aid: parseInt(id[1], 10)
                    }
                    console.log(data)
        $.ajax({
            url: '/list/comment',
            type: 'POST',
            data: data,
            success: function(res) {
                console.log("output: ",res)
                console.log(res.createdBy)
                console.log(res.content)
                this.setState({objArray: res});
                this.handleClose();
            }.bind(this),
            error: function(err){
                console.log("Error",err)
            }
        });
    }
 	componentWillMount() {
        this.getComments();

    }
    render(){
        let ansObj = this.state.objArray;
        let dateData = new Date(parseInt(ansObj.createdOn, 10)).toString().substring(0, 15);
        let ansHtmlContent = ansObj.content;
        return (
            <div>
            <Grid divided='vertically'>
                <Grid.Row columns={3}>
                  <Grid.Column width={1}/>
                    <Grid.Column width={12}>

                        <Segment size='big'>
                         <div style={titlestyle} className='content'
                              dangerouslySetInnerHTML={{__html: ansHtmlContent}} />
                            <Image
                               floated='left'
                                size='mini'
                        src='{ansObj.image}'/>
                            <div>{ansObj.name}</div>
                            <a>
                                {ansObj.createdBy}
                            </a>
                            <div
                              style={date}>Answered On
                              {dateData}
                            </div>

                        </Segment>
                        <Divider clearing/>
                        <CommentPage objArray={ansObj} />
                        </Grid.Column>
                </Grid.Row>
            </Grid>
            </div>
            );

}
}

module.exports = CommentCards;
