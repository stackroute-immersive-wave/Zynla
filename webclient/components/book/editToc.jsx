import React from 'react';
import {
    Grid,
    Divider,
    Table,
    Segment,
    Label,
    Button,
    Dimmer,
    Header,
    Icon,
    Loader
} from 'semantic-ui-react';
import TextField from 'material-ui/TextField';
import {blue500} from 'material-ui/styles/colors';
import Cookie from 'react-cookie';
import Chapter from './chapter';
import EditBook from './editBook';
const styles = {
  style: {
    color: blue500,
    fontFamily:'Philosopher'
  }
};
/* eslint-disable */
class EditToc extends React.Component {
    constructor(props) {
        super(props);
        var arr=new Set();
        this.state = {
          chapArr:arr,
          dataArr:[],
          dataArr2:[],
          forward:false,
          bookArr : null,
          active: false,
          viewBook:true,
          email : ''

        };
        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.checkvalues=this.checkvalues.bind(this);
        this.createJson=this.createJson.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
        this.handleRemove = this.handleRemove.bind(this);
        this.handleAddTopic = this.handleAddTopic.bind(this);
        this.handleRemoveTopic = this.handleRemoveTopic.bind(this);
        this.handleAddSubTopic = this.handleAddSubTopic.bind(this);
        this.handleRemoveSubTopic = this.handleRemoveSubTopic.bind(this);
    }
    handleOpen() {this.setState({ active: true });}
    handleClose() {this.setState({ active: false });}
    componentWillMount()
     {

       this.state.email = Cookie.load('email')
       this.setState({email:this.state.email})
       console.log(this.state.email)
    }

    handleAdd(chapterName,index){
      console.log(this.state.dataArr)
      console.log(this.state.dataArr.length)
      console.log(chapterName)
      console.log(index)
      console.log("handle add")
      let tempChap="";
      let chap = "Chapter";
      let arrOfTopics = []
      console.log(chapterName)
        if((chapterName === '')){
            if(this.state.dataArr.length>index){
              console.log("if checkedd")
              let chapter = {};
              chapter["name"]=chapterName;
              arrOfTopics.push(chapter);
              this.state.dataArr[index][chap]=arrOfTopics;
              this.setState({dataArr:this.state.dataArr});
            }
            else{
              console.log("checked")
              console.log(chapterName)
              let chapterObject = {}
              chapterObject[chap]= chapterName;
              this.state.dataArr.push(chapterObject)
              this.setState({dataArr:this.state.dataArr});
              console.log(chapterObject)
              console.log(this.state.dataArr)
            }
        }
        else {
          console.log("else checked")
          let chapter = {};
          chapter["name"]=chapterName;
          arrOfTopics.push(chapter);
          this.state.dataArr[index][chap]=arrOfTopics;
          this.setState({dataArr:this.state.dataArr});

        }
    };

    handleRemove(index){

        this.state.dataArr.splice(index, 1);
        let newChapterData = [];
        for( let x in this.state.dataArr)
        {
          if(this.state.dataArr[x].hasOwnProperty('name'))
          {
              newChapterData.push(this.state.dataArr[x])
            continue;
          }
          else{
            let chapter = {};
            Object.keys(this.state.dataArr[x]).map((input, index)=>{
            let chap = "Chapter"
            chapter[chap]= this.state.dataArr[x][input];
            });
            newChapterData.push(chapter)
          }

        }
        this.setState({dataArr:newChapterData})

    }

    handleAddTopic(topicName,topicIndex,chapterIndex){
      let chapterType = chapterIndex
      let chapterInd = "Chapter"
      let topicInd = "Topic";
      let arrOfSubTopics = []

      if((topicName === '')){
          if(this.state.dataArr[chapterIndex][chapterInd].length>topicIndex){

            let topic = {};
            topic["name"]=topicName;
            arrOfSubTopics.push(topic);
            this.state.dataArr[chapterIndex][chapterInd][topicIndex][topicInd]=arrOfSubTopics;
            this.state.chapterType = chapterType
            this.setState({chapterType:this.state.chapterType})
            this.setState({dataArr:this.state.dataArr});

          }
          else{


            let topic = {}
            topic[topicInd]= topicName;
            this.state.dataArr[chapterIndex][chapterInd].push(topic)
            this.state.chapterType = chapterType
            this.setState({chapterType:this.state.chapterType})
            this.setState({dataArr:this.state.dataArr,chapterType:chapterType});



        }
      }
      else {
        let topic = {};
        topic["name"]=topicName;
        arrOfSubTopics.push(topic);
        this.state.dataArr[chapterIndex][chapterInd][topicIndex][topicInd]=arrOfSubTopics;
        this.setState({dataArr:this.state.dataArr,chapterType:chapterType});

      }

    }

    handleRemoveTopic(topicindex,chapterIndex){

      let chapterInd = "Chapter"
      this.state.dataArr[chapterIndex][chapterInd].splice(topicindex, 1);
      let newChapterData = [];
      for( let x in this.state.dataArr[chapterIndex][chapterInd])
      {
        if(this.state.dataArr[chapterIndex][chapterInd][x].hasOwnProperty('name'))
        {
          newChapterData.push(this.state.dataArr[chapterIndex][chapterInd][x])
          continue;
        }
        else{
          let topic = {};
          Object.keys(this.state.dataArr[chapterIndex][chapterInd][x]).map((input, index)=>{
          let topicInd = "Topic"
          topic[topicInd]= this.state.dataArr[chapterIndex][chapterInd][x][input];
          });
          newChapterData.push(topic)
        }

      }
      this.state.dataArr[chapterIndex][chapterInd]=newChapterData
      this.setState({dataArr:this.state.dataArr})


    }

    handleAddSubTopic(subTopicName,subTopicIndex,topicIndex,chapterIndex){

      let chapterType = "Chapter"
      let chapterInd = "Chapter"
      let topicInd = "Topic";
      let subTopicInd = "Subtopic";
      let topicType = chapterInd+topicInd
      let arrOfSubTopics = []

      if((subTopicName === '')){
        console.log(this.state.dataArr[chapterIndex][chapterInd][topicIndex][topicInd])
        if((typeof this.state.dataArr[chapterIndex][chapterInd][topicIndex][topicInd])==="string"){
          if(this.state.dataArr[chapterIndex][chapterInd][topicIndex][topicInd].trim()==="")
          console.log(this.state.dataArr[chapterIndex][chapterInd][topicIndex][topicInd])

        }
        else{
        for(let x in this.state.dataArr[chapterIndex][chapterInd][topicIndex][topicInd])
        {
          if((typeof this.state.dataArr[chapterIndex][chapterInd][topicIndex][topicInd][x])==="string"){
            if(this.state.dataArr[chapterIndex][chapterInd][topicIndex][topicInd][x].trim()===""){
              console.log(this.state.dataArr[chapterIndex][chapterInd][topicIndex][topicInd])

          }

        }
        }
      }


          if(this.state.dataArr[chapterIndex][chapterInd][topicIndex][topicInd].length>subTopicIndex){
            let subTopic={}
            subTopic[subTopicInd]=subTopicName
            this.state.dataArr[chapterIndex][chapterInd][topicIndex][topicInd][subTopicIndex]=subTopic
            this.setState({dataArr:this.state.dataArr,topicType:topicType});
                }
          else{


            this.state.dataArr[chapterIndex][chapterInd][topicIndex][topicInd].push(subTopicName)
            this.setState({dataArr:this.state.dataArr,topicType:topicType});

          }
      }
      else {
      let  subTopic={}
        subTopic[subTopicInd]=subTopicName
        this.state.dataArr[chapterIndex][chapterInd][topicIndex][topicInd][subTopicIndex]=subTopic;
        this.setState({dataArr:this.state.dataArr,topicType:topicType});

      }

  }


    handleRemoveSubTopic(subTopicIndex,topicIndex,chapterIndex){

        let chapterInd = "Chapter";
        let topicInd = "Topic";
        this.state.dataArr[chapterIndex][chapterInd][topicIndex][topicInd].splice(subTopicIndex, 1);
        let newChapterData = [];
        for( let x in this.state.dataArr[chapterIndex][chapterInd][topicIndex][topicInd])
        {
          if(this.state.dataArr[chapterIndex][chapterInd][topicIndex][topicInd][x].hasOwnProperty('name'))
          {
            newChapterData.push(this.state.dataArr[chapterIndex][chapterInd][topicIndex][topicInd][x])
            continue;
          }
          else{
            let subTopic = {};
            Object.keys(this.state.dataArr[chapterIndex][chapterInd][topicIndex][topicInd][x]).map((input, index)=>{
            let subTopicInd = "Subtopic"
            subTopic[subTopicInd]= this.state.dataArr[chapterIndex][chapterInd][topicIndex][topicInd][x][input];
            });
            newChapterData.push(subTopic)
          }

        }
        this.state.dataArr[chapterIndex][chapterInd][topicIndex][topicInd]=newChapterData
        this.setState({dataArr:this.state.dataArr})
          }
createJson()
        {

          this.handleOpen();
          this.state.forward = false;
          this.setState({forward:this.state.forward})
          console.log(this.state.dataArr2)
          this.state.dataArr2.splice(0,this.state.dataArr2.length)
          console.log(this.state.dataArr2)
          console.log(this.state.chapArr)
          let len=this.state.chapArr;
          for (let item of len.values()) console.log(item);
          console.log(len.size);
          (this.props.data[0].toc).forEach((toc,tocIndex,tocArr) => {
              if (toc.hasOwnProperty('name')) {
                  if(this.state.dataArr2.length===0)
                      this.state.dataArr2.push(toc)
              // arr.push(<TextField value={"toc:"+toc["name"]}/>)
              console.log("toc"+toc["name"]);

             }
            })
          for (let item of len.values())
          {
              //console.log(len(i));
              console.log("pppppp");
              (this.props.data[0].toc).forEach((toc,tocIndex,tocArr) => {

              if (!toc.hasOwnProperty('name')) {
                  let arr=[]
                  tocArr[tocIndex]["Chapter"].forEach((chapter, chapterIndex, chapterArr) => {
                    console.log(chapterArr)
                    let id ;
                      if (chapter.hasOwnProperty('name')) {
                            id=chapter["name"];
                            console.log(id,item);
                          // if(this.state.chapArr.has(id)){
                          if(id==item){


                               this.state.dataArr2.push({Chapter:chapterArr})
                            }

                   }
                      })


                     }
                  })
                }
                this.state.dataArr.forEach((chapter,chapterIndex)=>{
                    this.state.dataArr2.push(chapter)
                })
              //  var path = this.state.path;
                console.log(this.state.dataArr2);
                $.ajax({
                  url: '/book/saveToc',
                  type: 'POST',
                  data: {author:Cookie.load('email'),template:'../../BookDocs/input.docx',book:JSON.stringify(this.state.dataArr2),type:"editedToc",username:Cookie.load('username')},
                  success: function(success) {
                    console.log("success");
                    console.log(success.data);
                    console.log(success.path);
                    this.state.bookArr = success.data;
                    this.setState({bookArr:this.state.bookArr});
                      console.log(JSON.parse(this.state.bookArr));
                      this.state.forward=true;
                  this.setState({forward:this.state.forward});
                  console.log(this.state.forward);
                  this.handleClose();
                  }.bind(this),
                  error: function(error){
                    console.log("error");
                    console.log(error)
                  }
                })
        }
        back1()
        {
          this.setState({forward:false});
        }
        back()
        {
          this.props.backdata();

        }
checkvalues(e)
{
  console.log(e.target.value)
  let re=e.target.value;
  console.log(this.state.chapArr);
  if(this.refs[re].checked)
  {
    this.state.chapArr.add(e.target.value);
  }
  else {
    if(this.state.chapArr.has(e.target.value))
    this.state.chapArr.delete(e.target.value);
  }
  console.log(this.state.chapArr);
  }
              render() {
                  const { active } = this.state
                let arr=[];
                let title = '';
                let email = this.state.email;
              (this.props.data[0].toc).forEach((toc,tocIndex,tocArr) => {
                  if (toc.hasOwnProperty('name')) {

                    title = email+'_'+toc['title']
                  arr.push(
                    <div>
                      <Label id='do' color='teal'>Title</Label>
                    <TextField id='tn' value={toc["title"]}
                    style={styles.style}
                  />
                  </div>
                  )

                  } else {

                      tocArr[tocIndex]["Chapter"].forEach((chapter, chapterIndex, chapterArr) => {
                          if (chapter.hasOwnProperty('name')) {
                    let id=chapter["name"];
                                arr.push(
                                  <div>
                                    <Label id='cha'>Chapter</Label>

                                    <TextField id='cn' value={chapter["name"]}
                                      style={styles.style}
                                      />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    <input type="checkbox" ref={chapter["name"]} id={chapter["name"]}
                                      value={chapter["name"]} onClick={this.checkvalues}/>
                                    </div> )                                 //console.log(Chap);
                          } else {

                              chapterArr[chapterIndex]["Topic"].forEach((topic, topicIndex,topicArr) => {
                                  if (topic.hasOwnProperty('name')) {

                                  arr.push(<div>
                                    <Label id='t'>Topic</Label>
                                    <TextField id='ton' value={topic["name"]}
                                      style={styles.style}
                                    />

                                    </div>)
                                  }
                                  else {

                                      arr.push(<div>
                                        <Label id='su'>Subtopic</Label>
                                        <TextField id='ts' value={topicArr[topicIndex]["Subtopic"]}
                                          style={styles.style}
                                        />
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
                    <EditBook data={this.state.bookArr} toc ={this.state.dataArr2} backdata={this.back1.bind(this)}/>:
                    <div class='Container'>
                      <Dimmer
                        active={active}
                        onClickOutside={this.handleClose}
                        page
                        >
                          <Header as='h3' icon inverted>
                            <Icon size='small' name='book' />
                           "Will take few secs to load"
                            <Header.Subheader>Click anywhere to come out</Header.Subheader>

                          </Header>
                          <Loader />
                        </Dimmer>
                        <Button color='green' icon='arrow left' id='edBtn1' size='small' inverted onClick={this.back.bind(this)}/>
                        <Grid divided='vertically'>
                            <Grid.Row columns={2}>
                              <Segment>
                                <Grid.Column width={5}>
                                    <Table color='teal' id='table'>
                                        <Divider horizontal>
                                            <h3 id='toc1'>Table of Contents</h3>
                                          </Divider>
                                            <h3 id='sc'>Select-and-Change</h3>

                          <div>{arr.map((name,index)=>{
                                       return  name
                                     })}</div>
                                     <Chapter chapterData= {this.state.dataArr}
                                       handleAdd = {this.handleAdd}
                                       handleRemove={this.handleRemove}
                                       handleAddTopic={this.handleAddTopic}
                                       handleRemoveTopic={this.handleRemoveTopic}
                                       handleAddSubTopic={this.handleAddSubTopic}
                                       handleAddSubTopic={this.handleAddSubTopic}
                                       handleRemoveSubTopic={this.handleRemoveSubTopic}
                                        chapterType={this.state.chapterType} topicType={this.state.topicType}/>
                                          <Button primary icon='settings' id='edBt' size='medium' inverted onClick={this.createJson} content='View & Edit'/>
                                    </Table>
                                </Grid.Column>
                              </Segment>
                                <Grid.Column width={11}>
                                    <Table color='teal' id='table2'>
                                        <center>
                                            <Divider horizontal>
                                                <h3 id='preview'>P-R-E-V-I-E-W</h3>
                                            </Divider>
                                        </center>

                                   <div>
                                   <embed id='pdf'
                                    src={require('../../../BookDocs/pdf/'+title+'.pdf')}
                                    width='855' height='600' type='application/pdf'/>}
                                  </div>

                                    </Table>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </div>
                    );
                }
            }
            module.exports = EditToc;
/* eslint-enable */
