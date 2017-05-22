import React from 'react';
import {
    Checkbox,
    Grid,
    Card,
    Image,
    Divider,
    Header,
    Table,
    Container,
    Segment,
    Icon,
    Form,
    Label,
    Dimmer,
    Loader,
    Button,
    Modal,
    Input,
    Dropdown,
    Rating
} from 'semantic-ui-react';
import TextField from 'material-ui/TextField';
import {blue500} from 'material-ui/styles/colors';
let {hashHistory} = require('react-router');
import EditToc from './editToc.jsx';
import Cookie from 'react-cookie';
const styles = {
  style: {
    color: blue500,
    fontFamily:'Philosopher',
  },
};

class AllToc extends React.Component {
    constructor() {
        super();
        this.state = {
            src: '',
            allTocs: [],
            domain:'',
            flag:false,
            forward:false,
            tocDetails: [
                {
                    toc: []
                }
            ],
             listOfDomains:[],
             imageFlag:false,
             rating:'',
             checked:0,
             viewBook:false,
             output:'last2',
             outputDocx:'output'
        }
        this.asdfg={state:{}};
        this.add={state:{}};
        this.qwert={state:{}};
        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.getTocs = this.getTocs.bind(this);
        this.handleDomainAdd = this.handleDomainAdd.bind(this);
        this.getDomains = this.getDomains.bind(this);
        this.getImage=this.getImage.bind(this);
        this.forwardToc=this.forwardToc.bind(this);
        this.checkbox=this.checkbox.bind(this)
        //this.saveToc=this.saveToc.bind(this)
        //this.updateRating=this.updateRating.bind(this);
    }

    handleOpen() {this.setState({ active: true });}
    handleClose() {this.setState({ active: false });}
    // saveToc()
    // {
    //   console.log("inside saveTocMongo")
    //   console.log(this.state.tocDetails)
    //   let editedbook = JSON.stringify(this.state.tocDetails)
    //   console.log(editedbook)
    //   let toc={}
    //   toc["chapdata"]=this.state.tocDetails
    //   let book=this.state.tocDetails.slice();
    //         console.log(book)
    //      var email = Cookie.load('email');
    //      var authorName = Cookie.load('username')
    //      console.log(authorName)
    //      var title = this.state.tocDetails[0]["title"];
    //      var domain = this.state.tocDetails[0]["Domain"]
    //      console.log(JSON.stringify(book))
    //     let check = false;
    //     console.log(check);
    //     $.ajax({
    //       url: '/book/saveToc',
    //       type: 'POST',
    //       data: {book:JSON.stringify(book), type:'editedbook', author:email, domain:domain,title:title,username:authorName,editedbook:editedbook},
    //       success: function(success) {
    //         console.log("success!!");
    //         console.log(success)
    //         console.log((JSON.stringify(success)))
    //         this.state.viewBook=true;
    //         this.setState({viewBook:this.state.viewBook})
    //         console.log(this.state.viewBook)
    //         this.setState({outputDocx:'output'})
    //         this.setState({output:"output"})
    //       }.bind(this),
    //       error: function(error){
    //         console.log("error");
    //         console.log(error)
    //       }
    //     });
    // }
    back()
    {
  this.setState({forward:false});
}
    handleDomainAdd(e,data)
    {
      let d=data.value;
        this.state.domain = d;
        this.setState({domain:this.state.domain});
        console.log(this.state.domain+" "+d);

        if(this.state.domain===d)
        {
                $.ajax({
            url: "/book/getDomainTocs",
            type: 'POST',
            data:{domain:this.state.domain},
            success: function(result) {
                console.log(result)
                console.log(result.length);
                this.setState({allTocs: result});
                console.log(this.state.allTocs, "listofCards..")
                this.setState({imageFlag:true});
                  this.getImage();
                this.state.allTocs.map((data, index) => {
                    console.log("zzcxvcc" + data.author);
                });
              }.bind(this),
            error: function(error) {
                console.log("error");
                console.log(error)
            }
          });
        }
    }
        getTocs() {
        $.ajax({
            url: "/book/getTocs",
            type: 'GET',
            success: function(result) {
                console.log(result)
                //this.setState({listofCards:result})
                console.log(result.length);
                this.setState({allTocs: result});
                console.log(this.state.allTocs, "listofCards..")
                this.state.allTocs.map((data, index) => {
                    console.log("zzcxvcc" + data.author);
                });
            }.bind(this),
            error: function(error) {
                console.log("error");
                console.log(error)
            }
        })
    }
getImage()
{
  if(this.state.imageFlag === true)
  {
    if (this.state.domain === 'react') {
        this.setState({src: '../../image/react.PNG'});
    }
    else if(this.state.domain === 'java') {
        this.setState({src: '../../image/Java.png'});
    }
    else if(this.state.domain === 'html') {
        this.setState({src: '../../image/HTML5.png'});
    }
    else {

        this.setState({src: '../../image/nodejs.png'});
    }
  }
  else {
          this.setState({src: '../../image/react.PNG'});
  }
}
    componentWillMount()
    {
        // let domain = Cookie.load('domain');
        // console.log(domain);
        // if (domain == 'REACT') {
        //     this.setState({src: '../../image/react.PNG'});
        // } else {
        //     this.setState({src: '../../image/nodejs.png'});
        // }
        this.getTocs();
        this.getDomains();
        this.getImage();
    }

    getTocDetails(data)
    {
        let arr = [];
        arr.push(data);
        console.log(data);
        this.setState({tocDetails: arr});
        this.setState({flag:true});
        console.log(this.state.tocDetails);

    }
    // updateRating(data)
    // {
    //   console.log(data);
    //   console.log(data.likes);
    //   if(data.likes===undefined){
    //     let arr = []
    //     arr.push(Cookie.load("email"))
    //     data.likes =arr
    //
    //   }
    //   //console.log({_id:data._id,email:Cookie.load("email"),id:data.id,likes:JSON.parse(JSON.stringify(data.likes))});
    //   $.ajax({
    //     url: '/book/updateLikes',
    //     type: 'POST',
    //     data:{_id:data._id,email:Cookie.load("email"),id:data.id,likes:JSON.stringify(data.likes)},
    //     success: function(data) {
    //         console.log(data);
    //         this.getTocs();
    //     }.bind(this),
    //     error: function(error){
    //       console.log("error");
    //       console.log(error)
    //     }
    //   });
    //   console.log(this.state.rating);
    //   console.log(data);
    // }
    updateRating(data)
    {
      console.log(this.state.rating);
      console.log(data);
    //  console.log({_id:data._id,email:Cookie.load("email"),id:data.id,likes:JSON.parse(JSON.stringify(data.likes))});
      $.ajax({
        url: '/book/updateRating',
        type: 'POST',
        data:{id:data.id,rating:this.state.rating},
        success: function(data) {
            console.log(data);
            this.getTocs();
        }.bind(this),
        error: function(error){
          console.log("error");
          console.log(error)
        }
    });
      // console.log(this.state.rating);
      // console.log(data);
    }
    forwardToc()
    {
      this.setState({forward:true});
    }
    handleRate (e,{rating,maxRating})
    {
      let d=rating;
      console.log(rating);
        this.state.rating = d;
             this.setState({rating:this.state.rating});
             console.log(this.state.rating);
   }
    getDomains(){
           let arr = [];
           $.ajax({
             url: '/book/getDomains',
             type: 'GET',
             success: function(data) {
               console.log("dsskfjdjdkj"+data)
               for (let i=0;i<data.length;i++) {
                   if (i !== null) {
                       arr.push({key: data[i], value: data[i], text: data[i]});
                   }
               }
               console.log(arr)
                 this.setState({listOfDomains: arr});

             }.bind(this),
             error: function(error){
               console.log("error");
               console.log(error)
             }
           });
         }
checkbox(e,data){
  console.log(this.add,"this.add")
  console.log(data.checked,"data.checked")
  if(!data.checked)
  this.setState({checked:(this.state.checked+1)})
  else {
    this.setState({checked:(this.state.checked-1)})
  }
  console.log(this.state.checked);
  console.log(((this.state.checked>0)||(!this.add.state.checked))?false:true);
  this.setState()
  console.log(e)
  console.log(data);
}
    render() {
        //console.log(this.state.tocDetails[0]);
        const { active } = this.state
        let arr = [];
        let arr1=[];
        console.log(this.state.tocDetails[0].toc);
                (this.state.tocDetails[0].toc).forEach((toc, tocIndex, tocArr) => {
            if (toc.hasOwnProperty('name')) {

                arr.push(
                  <div>
                  <Label id='do' color='teal'>Domain</Label>
                <TextField id='tocc'
                  value={toc["name"]}
                  style={styles.style}
                />
              </div>
              )

            } else {

                tocArr[tocIndex]["Chapter"].forEach((chapter, chapterIndex, chapterArr) => {
                    if (chapter.hasOwnProperty('name')) {

                        arr.push(
                            <div>
                              <Label id='ch'>Chapter</Label>
                                <TextField id='chp'
                                  value={chapter["name"]}
                                  style={styles.style}
                                /><br />
                            </div>
                        ) //console.log(Chap);
                    } else {

                        chapterArr[chapterIndex]["Topic"].forEach((topic, topicIndex, topicArr) => {
                            if (topic.hasOwnProperty('name')) {

                                arr.push(
                                    <div>
                                      <Label id='t'>Topic</Label>
                                    <TextField id='top'
                                      value={topic["name"]}
                                      style={styles.style}
                                    /><br />

                                    </div>
                                )
                            } else {

                                arr.push(
                                    <div>
                                      <Label id='st'>Subtopic</Label>
                                      <TextField id='subTop'
                                        value={topicArr[topicIndex]["Subtopic"]}
                                        style={styles.style}
                                      /><br />
                                  </div>
                                )

                            }
                        })
                    }
                })
            }
        })

        return (
          this.state.forward?
          <EditToc data={this.state.tocDetails} backdata={this.back.bind(this)}/>:
            <div>
                <Grid divided='vertically'>
                    <Grid.Row columns={2}>

                        <Grid.Column width={5}>
                            <Table color='teal' id='tabe1'>


                                           <Dropdown id='dd' floating button className='icon' placeholder='Select Domain'
                                              onChange={this.handleDomainAdd}
                                              fluid selection options={this.state.listOfDomains}
                                              />

                                <Divider horizontal>
                                    <h3 id='toc1'>Table of Contents</h3>
                                </Divider>
                                {/* {this.state.tocDetails
                                                ? this.state.tocDetails.map((data, index) => <TextField value={data}/>)
                                                : ''} */}
                                {this.state.flag
                                    ?<div>{arr.map((name, index) => {

                                                return name
                                            })

                                          }
                                          <Button primary  id='edBtn' size='small' inverted onClick={this.forwardToc.bind(this)}>EDIT</Button>

                                          <Dimmer
                                            active={active}
                                            onClickOutside={this.handleClose}
                                            page
                                            >
                                              <Header as='h3' icon inverted>
                                                <Icon size='small' name='book' />
                                                Pdf created Successfully!!! "Will take time to load"
                                                <Header.Subheader>Click anywhere to come out</Header.Subheader>

                                              </Header>
                                              <Loader />
                                            </Dimmer>

                                        </div>
                                    : ''
}

                            </Table>
                        </Grid.Column>
                        <Grid.Column width={11}>
                            <Table color='teal' id='tabe2'>
                                <center>
                                    <Divider horizontal>
                                        <h3 id='preview1'>S-y-n-o-p-s-i-s</h3>
                                    </Divider>
                                </center>
                                <Card.Group itemsPerRow={2} id='card'>
                                    {this.state.allTocs.map((data, index) => <Card color='teal' key={index}>
                                        <Card.Content>
                                            <Card.Header id='head'>
                                              <Label as='a' color='teal' ribbon size='large'>TABLE OF CONTENTS</Label>
                                            </Card.Header>
                                            <Image size='mini' src={this.state.src} floated='left' style={{
                                                height: '200px',
                                                width: '350px'
                                            }}/>
                                            <Card.Description id='cardDes'>
                                                <strong>Book Title:</strong>{data.toc[0].title}<br/>
                                                <Divider horizontal></Divider>
                                                <strong>Author Name:</strong>{data.author}<br/>
                                                <Divider horizontal></Divider>
                                                <strong>Date Of Creation:</strong>{data.timestamp}<br/>
                                                <Divider horizontal></Divider>
                                                {this.state.imageFlag===true?
                                                  <div>
                                                  <strong>Rating:</strong><Rating icon='star' size='tiny' defaultRating={data.rating} maxRating={5} disabled/>
                                                 </div>:
                                                 <div>
                                                   <strong>Rating:</strong><Rating icon='star' size='small' defaultRating={data.rating} maxRating={5} onRate={this.handleRate.bind(this)} clearable />&nbsp;&nbsp;&nbsp;&nbsp;
                                                   <Button icon="thumbs up" color='teal' size='small'  onClick={this.updateRating.bind(this,data)}></Button>
                                                   <br/><br/>
                                                 </div>
                                                }

                                            </Card.Description>
                                        </Card.Content>
                                        <Card.Content extra>
                                            <div className='ui two buttons'>
                                                <Button id='cardBtn' color='blue' onClick={this.getTocDetails.bind(this, data)}><h4>Click here to View</h4></Button>
                                            </div>
                                        </Card.Content>
                                    </Card>)}
                                </Card.Group>
                            </Table>
                        </Grid.Column>

                    </Grid.Row>
                </Grid>
            </div>
        );
    }
}
module.exports = AllToc;
