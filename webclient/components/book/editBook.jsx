import React from 'react';
import {
    Grid,
    Card,
    Image,
    Divider,
    Header,
    Table,
    Container,
    Icon,
    Form,
    Label,
    Dimmer,
    Loader,
    Segment,
    Button,
    Modal,
    Input,
    Dropdown,
    Checkbox,
    TextArea,

} from 'semantic-ui-react';
import TextField from 'material-ui/TextField';
import {blue500} from 'material-ui/styles/colors';
let {hashHistory} = require('react-router');
import Cookie from 'react-cookie';
const styles = {
  style: {
    color: blue500,
    fontFamily:'Philosopher',
  },
};

let cb={
  marginLeft:'30px'
}


class EditBook extends React.Component {
    constructor(props) {
        super(props);
        this.state={
        something:'aaaaaaaa',
        check:'',
        dataArray:[],
        arrOfData:[],
        arr:[],
        value:'',
        intent : [],
        data : JSON.parse(this.props.data),
        book: null,
        emptyCheck : false,
        title:'',
        nameInIntent:{},
        flag:false,
        tFlag:false,
        viewBook:false,
        listOfTemplates:[],
        path:'../../BookDocs/input.docx',
        active:false,
        outputDocx:'input.pdf'




}
this.handleOpen = this.handleOpen.bind(this);
this.handleClose = this.handleClose.bind(this);
 this.handleTemplate = this.handleTemplate.bind(this);
 this.handleTitleChange = this.handleTitleChange.bind(this);
    }
    handleOpen() {this.setState({ active: true });}
    handleClose() {this.setState({ active: false });}
    handleTitleChange(e,data){
      //console.log(e.target.value)

      this.state.title=e.target.value;
      this.setState({title:this.state.title})
      //console.log(this.state.title)
    }
    handleRadio(e,data){

      //console.log(e.target.id)
    	//console.log(data.id)
        let dataArray = [];
        //console.log("hey")
        //console.log(e.target.value);
        let va = e.target.value;


      	//console.log(this.state.check)

       let dataArray1
       console.log(this.state.data);
       let book = JSON.parse(this.props.data)
       this.setState({data:book})
            book.forEach((book, bookIndex, bookArr) => {
                if(book.hasOwnProperty('name')){
                  if(this.state.title!=='')
                  this.state.data[bookIndex]['title']=this.state.title
                  console.log(this.state.title)
                  console.log(this.state.data[bookIndex]['title'])
                }
                if (!book.hasOwnProperty('name'))
                	 {
                    bookArr[bookIndex]["Chapter"].forEach((chapter, chapterIndex, chapterArr) => {
                        if (chapter.hasOwnProperty("content")) {
                            var chapter = '';
                            chapterArr[chapterIndex]["content"].forEach((contentChap, contentIndex, contentArray) => {
                                if (contentChap.hasOwnProperty('name')) {
                                    chapter = contentChap["name"]
                                    //console.log(chapter)
                                    this.state.nameInIntent=contentChap
                                    this.setState({nameInIntent:this.state.nameInIntent})

                                }
                                else{
                                  if (chapter === e.target.value) {
                                    if(contentChap!==undefined){
                                      //console.log(contentChap)
                                      let intent = {}
                                      intent.intent = contentChap.intent
                                      let values = []
                                      if(contentChap.value!==undefined){
                                        contentChap.value.forEach((content)=>{
                                          if(content.label==='video'){
                                            let cont = {}
                                            cont.label = 'video'
                                            cont.value = content.value
                                            values.push(cont)

                                          }
                                          else if(content.label==='text'){
                                            let cont = {}
                                            cont.label = 'text'
                                            cont.value = content.value
                                            values.push(cont)

                                          }
                                          else if(content.label==='blog'){
                                            let cont = {}
                                            cont.label = 'blog'
                                            cont.value = content.value
                                            values.push(cont)

                                          }
                                        })
                                        intent.value = values
                                        this.state.intent.push(intent)
                                        this.setState({intent:this.state.intent})
                                          this.state.check = e.target.value
                                          this.setState({check:this.state.check})
                                           console.log(this.state.intent)
                                      }

                                    }
                                    else{
                                      this.state.emptyCheck = true
                                      this.setState({emptyCheck:this.state.emptyCheck})
                                    }

                                  }
                                  else if (e.target.id === 'subBtn' && this.state.check===chapter){
                                    // //console.log(chapter)
                                    // //console.log('chapter')
                                    // //console.log(this.state.intent)
                                    // this.state.intent.push(this.state.nameInIntent)
                                    // this.setState({intent:this.state.intent})
                                    // console.log(this.state.nameInIntent)
                                    // console.log(this.state.intent)
                                    let arrOfIntents = []
                                    let intent = this.state.intent
                                    console.log("intent",this.state.intent)
                                    arrOfIntents.push(this.state.nameInIntent)
                                    intent.forEach((intents)=>{
                                        arrOfIntents.push(intents)
                                    })
                                    //arrOfIntents.pop()
                                    console.log(arrOfIntents)
                                    this.state.data[bookIndex]['Chapter'][0]['content']=arrOfIntents;
                                    // console.log(this.state.intent)
                                    this.setState({data:this.state.data})
                                    console.log(this.state.data);
                                    // console.log(this.state.intent);
                                    //this.state.intent.splice(0,this.state.intent.length)
                                    this.setState({intent:[]})

                                    // // console.log(this.state.dataArray)
                                  }
                                }

                            });
                        }
                        else
                         {
                            chapter["Topic"].forEach((topic, topicIndex, topicArr) =>
                            {
                                if(topic.hasOwnProperty('content'))
                                 {
                                    var topic = '';
                                    topicArr[topicIndex]["content"].forEach((contentTopic, contentIndex, contentArr) =>
                                     {
                                        if (contentTopic.hasOwnProperty('name'))
                                         {
                                            topic = contentTopic["name"]
                                            //console.log(topic)
                                            this.state.nameInIntent=contentTopic
                                            this.setState({nameInIntent:this.state.nameInIntent})

                                          }
                                          else{
                                            if (topic === e.target.value)
                                            {
                                              if(contentTopic.value!==undefined){
                                                //console.log(contentTopic);
                                                let intent = {}
                                                intent.intent = contentTopic.intent
                                                let values = []
                                                contentTopic.value.forEach((content)=>{
                                                  if(content.label==='video'){
                                                    let cont = {}
                                                    cont.label = 'video'
                                                    cont.value = content.value
                                                    values.push(cont)

                                                  }
                                                  else if(content.label==='text'){
                                                    let cont = {}
                                                    cont.label = 'text'
                                                    cont.value = content.value
                                                    values.push(cont)

                                                  }
                                                  else if(content.label==='blog'){
                                                    let cont = {}
                                                    cont.label = 'blog'
                                                    cont.value = content.value
                                                    values.push(cont)

                                                  }
                                                })
                                                intent.value = values
                                                this.state.intent.push(intent)
                                                this.setState({intent:this.state.intent})
                                        this.state.check = e.target.value
                                        this.setState({check:this.state.check})
                                                 //console.log(this.state.intent)

                                              }
                                              else{
                                                this.state.emptyCheck = true
                                                this.setState({emptyCheck:this.state.emptyCheck})
                                              }

                                            }
                                            else if (e.target.id === 'subBtn' && this.state.check===topic){
                                    				//console.log('topic')
                                            //console.log(topic)
                                            //console.log(this.state.intent)
                                            // this.state.intent.push(this.state.nameInIntent)
                                            // this.setState({intent:this.state.intent})
                                            // console.log(this.state.nameInIntent)
                                            // console.log(this.state.intent)
                                            let arrOfIntents = []
                                            let intent = this.state.intent
                                            console.log("intent",this.state.intent)
                                            arrOfIntents.push(this.state.nameInIntent)
                                            intent.forEach((intents)=>{
                                                arrOfIntents.push(intents)
                                            })
                                            //arrOfIntents.pop()
                                            console.log(arrOfIntents)
                                            this.state.data[bookIndex]['Chapter'][chapterIndex]['Topic'][topicIndex]['content']=arrOfIntents
                                            // console.log(this.state.intent)
                                            this.setState({data:this.state.data})
                                            console.log(this.state.data);
                                            // //console.log(this.state.intent);
                                            //this.state.intent.splice(0,this.state.intent.length)
                                            this.setState({intent:[]})

                                    }
                                          }
                                 });
                                }
                                else
                         		{
                         			 var sub = '';
                            	topic["Subtopic"].forEach((subtopic, subtopicIndex, subtopicArr) => {

                                if(subtopic.hasOwnProperty('name')){
                                	sub = subtopic['name']
                                  //console.log(sub)
                                  this.state.nameInIntent=subtopic
                                  this.setState({nameInIntent:this.state.nameInIntent})
                                }
                                if (!subtopic.hasOwnProperty('name')) {

                                    if (sub === e.target.value) {
                                      if(subtopic.value!==undefined){
                                        //console.log(subtopic)
                                        let intent = {}
                                        intent.intent = subtopic.intent
                                        let values = []
                                        subtopic.value.forEach((content)=>{
                                          if(content.label==='video'){
                                            let cont = {}
                                            cont.label = 'video'
                                            cont.value = content.value
                                            values.push(cont)

                                          }
                                          else if(content.label==='text'){
                                            let cont = {}
                                            cont.label = 'text'
                                            cont.value = content.value
                                            values.push(cont)

                                          }
                                          else if(content.label==='blog'){
                                            let cont = {}
                                            cont.label = 'blog'
                                            cont.value = content.value
                                            values.push(cont)

                                          }
                                        })
                                        intent.value = values
                                        this.state.intent.push(intent)
                                        this.setState({intent:this.state.intent})
                                        this.state.check = e.target.value
                                        this.setState({check:this.state.check})
                                         //console.log(this.state.intent)
                                      }
                                      else{
                                        this.state.emptyCheck = true
                                        this.setState({emptyCheck:this.state.emptyCheck})
                                      }

                                    }
                                    else if (e.target.id === 'subBtn' && this.state.check===sub){
                                      //console.log(sub)
                                    				//console.log('subtopic')
                                                // this.state.intent.push(this.state.nameInIntent)
                                                // this.setState({intent:this.state.intent})
                                                // console.log(this.state.nameInIntent)
                                                // console.log(this.state.intent)
                                                let arrOfIntents = []
                                                let intent = this.state.intent
                                                console.log("intent",this.state.intent)
                                                arrOfIntents.push(this.state.nameInIntent)
                                                intent.forEach((intents)=>{
                                                    arrOfIntents.push(intents)
                                                })

                                                //arrOfIntents.pop()

                                                console.log(arrOfIntents)
                                               this.state.data[bookIndex]['Chapter'][chapterIndex]['Topic'][topicIndex]['Subtopic']=arrOfIntents;
                                               this.setState({data:this.state.data})
                                               console.log(this.state.data);
                                          //   //console.log(this.state.intent);
                                            //this.state.intent.splice(0,this.state.intent.length)
                                            this.setState({intent:[]})
                                    }
                                }
                            });
                        	}
                            });
                        }
                    });
					}

				});



		}
    handleTemplate(e,data)
    {
     // console.log("out "+this.state.tFlag)
     this.state.flag = true;
   this.setState({flag:this.state.flag})

   if(data.value === '../../BookDocs/input.docx')
   {
     this.state.flag = true;
   this.setState({flag:this.state.flag})
     //console.log("in "+this.state.tFlag)
   }
   else if(data.value === '../../BookDocs/input1.docx')
   {
   this.setState({tFlag:false})
   //console.log("else "+this.state.tFlag)
   }
      this.setState({path:data.value});
      //console.log(this.state.path)
    }

    componentDidMount()
    {
      var template=[{key:'../../BookDocs/input.docx',
       value:'../../BookDocs/input.docx',text:'Template uno'},
     {key:'../../BookDocs/input1.docx',
      value:'../../BookDocs/input1.docx',text:'Template dos'}];

      this.setState({listOfTemplates:template})
    }

    saveToMongo(){
      this.handleOpen()

      //console.log("inside saveTocMongo")
      //console.log(this.props.toc);
      var path = this.state.path;
      //console.log('path............')
      //console.log('consoling this.state.path',this.state.path)

      let editedbook = JSON.stringify(this.state.data)
      console.log(this.state.data)
      //console.log('state.data')
      //console.log(this.state.data)
      //console.log(editedbook)
      let toc={}
      toc["chapdata"]=this.props.toc;

      let book=this.props.toc.slice();
      // book.forEach((toc,tocIndex,content)=>{
      //     if(content.hasOwnProperty('title')){
      //       content[tocIndex]['title'] = this.state.title
      //     }
      //   })
        book[0]['title'] = this.state.title
        console.log(book[0]['title'])
            //console.log(book)
         var email = Cookie.load('email');
         var authorName = Cookie.load('username')
         //console.log(authorName)
         var title = this.state.title
         console.log(title)
         let output = email+'_'+title+'.pdf'
         //console.log('title')
         //console.log(this.state.title)
         var domain = this.props.toc[0]["Domain"]
         //console.log(JSON.stringify(book))
        let check = false;
        //console.log(check);
        $.ajax({
          url: '/book/saveToc',
          type: 'POST',
          data: {book:JSON.stringify(book), type:'editedbook', author:email,template:path, domain:domain,title:title,username:authorName,editedbook:editedbook},
          success: function(success) {
            console.log("success!!");
            //console.log(success.path)
            //console.log((JSON.stringify(success)))
            console.log(success)
            console.log(output)
            this.setState({outputDocx:output})
            //console.log(this.state.outputDocx);

            //console.log(this.state.viewBook)

            this.state.viewBook=true;
            this.setState({viewBook:this.state.viewBook})
          }.bind(this),
          error: function(error){
            //console.log("error");
            console.log(error)
          }
        });
    }
back()
{
  this.props.backdata();
}
handleTextChange(e,data){
  this.state.intent.forEach((intents,intentIndex,intentArray)=>{
    if(data.id===intentIndex){
        intents.value.forEach((val,valIndex,valArray)=>{
          if(val.label==='text'){
            intentArray[intentIndex]['value'][valIndex]['value']=data.value
          }
        })
    }

})
this.setState({intent:this.state.intent})
console.log(this.state.intent)
}
handleBlogChange(e,data){
  this.state.intent.forEach((intents,intentIndex,intentArray)=>{
    if(data.id===intentIndex){
        intents.value.forEach((val,valIndex,valArray)=>{
          if(val.label==='blog'){
            intentArray[intentIndex]['value'][valIndex]['value']=data.value
          }
        })
    }

})
this.setState({intent:this.state.intent})
console.log(this.state.intent)
}
handleVideoChange(e,data){
  this.state.intent.forEach((intents,intentIndex,intentArray)=>{
    if(data.id===intentIndex){
        intents.value.forEach((val,valIndex,valArray)=>{
          if(val.label==='video'){
            intentArray[intentIndex]['value'][valIndex]['value']=data.value
          }
        })
    }

})
this.setState({intent:this.state.intent})
console.log(this.state.intent)
}
              render() {
                  const { active } = this.state;
                let arr=[];
                let arrOfText=[];
                let output = this.state.outputDocx;
                console.log(output)
                this.props.toc.forEach((book,bookIndex,bookArr) => {

                            if(book.hasOwnProperty('name')){



                              arr.push(
                                <div>
                                  <Label id='tit1' color='teal' size='small'>Title</Label>

                                  <TextField value={this.state.title} onChange={this.handleTitleChange}
                                    style={styles.style}
                                  />
                                </div>)
                            }
                            else{
                              book["Chapter"].forEach((chapter,chapterIndex,chapterArr)=>{

                                      if(chapter.hasOwnProperty('name')){

                                        arr.push(
                                          <div>
                                            <Label id='cha1'>Chapter</Label>
                                            <TextField value={chapter["name"]}
                                              id='te1'
                                              style={styles.style}/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                            <input type='radio'
                                                    name="radiogroup"
                                                  ref={chapter["name"]}
                                                  id={chapter["name"]}
                                                  value= {chapter["name"]}
                                                  //checked={this.state.value === topic}
                                                  onClick={this.handleRadio.bind(this)} /></div>)
                                          //.setState({arr:arr})
                                        //console.log(content['name'])
                                      }



                                else{
                                  console.log(chapter)
                                  chapter["Topic"].forEach((topic,topicIndex,topicArr)=>{

                                        if(topic.hasOwnProperty('name')){
                                         arr.push(
                                           <div>
                                             <Label id='t1'>Topic</Label>
                                             <TextField id='te2' value={topic["name"]}
                                               style={styles.style}
                                               />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                           <input type='radio'
                                                    name="radiogroup"
                                                  ref={topic["name"]}
                                                  id={topic["name"]}
                                                  value= {topic["name"]}
                                                  //checked={this.state.value === topic}
                                                  onClick={this.handleRadio.bind(this)} /></div>)
                                                 // this.setState({arr:arr})
                                          //console.log(content['name'])
                                        }



                                    else{

                                      arr.push(<div>
                                        <Label id='su1'>Subtopic</Label>
                                        <TextField id='te3' value={topic['Subtopic']}
                                          style={styles.style}
                                          />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                        <input type="radio"
                                                  name="radiogroup"
                                              id={topic['Subtopic']}
                                              ref={topic['Subtopic']}
                                              value= {topic['Subtopic']}
                                              //checked={this.state.value === sub}
                                              onClick={this.handleRadio.bind(this)} /></div>)
                                    }
                                  })
                                }
                              })
                            }
                            })

                            this.state.intent.forEach((intents,intentIndex,intentArray)=>{
                              console.log(intentIndex)
                              intents.value.forEach((val,valIndex,valArray)=>{
                                const constant = val.value;
                                if(val.label==='text'){
                                  let ansHtmlContent = val.value;
                                  if(this.state.emptyCheck=== false){
                                    arrOfText.push(<div><Form id='text'>
                                        <Label as='a' color='teal' ribbon>Text</Label>
                                        <TextArea placeholder='Edit Text' id = {intentIndex} autoHeight value={this.state.intent[intentIndex]['value'][valIndex]['value']} onChange={this.handleTextChange.bind(this)} />
                                      </Form><br/></div>)

                                  }
                                  else{
                                    arrOfText.push(<div><Form id='text'>
                                        <Label as='a' color='teal' ribbon>Text</Label>
                                        <div>NO DATA FOUNT</div>
                                        <TextArea placeholder='Edit Text' id = {intentIndex} autoHeight  onChange={this.handleTextChange.bind(this)}  />
                                      </Form><br/></div>)

                                  }

                                }
                                else if(val.label==='blog'){
                                  const constant = val.value;
                                  let ansHtmlContent = val.value;
                                  if(this.state.emptyCheck===false){
                                    arrOfText.push(<div><br/>
                                       <Form id='blog'>
                                        <Label as='a' color='teal' ribbon>Blog</Label>
                                        <TextArea placeholder='Edit Blog Link' id={intentIndex} autoHeight value={this.state.intent[intentIndex]['value'][valIndex]['value']} onChange={this.handleBlogChange.bind(this)}/>
                                      </Form>
                                      <br/></div>)
                                  }
                                  else {
                                    arrOfText.push(<div><br/>
                                       <Form id='blog'>
                                        <Label as='a' color='teal' ribbon>Blog</Label>
                                      <div>NOT DATA FOUND</div>
                                        <TextArea placeholder='Edit Blog Link' id={intentIndex} autoHeight value={this.state.intent[intentIndex]['value'][valIndex]['value']} onChange={this.handleBlogChange.bind(this)}/>
                                      </Form>
                                      <br/></div>)
                                  }

                                }
                                else if(val.value==='video'){
                                  const constant = val.value;
                                  let ansHtmlContent = val.value;
                                  if(this.state.emptyCheck===false){
                                    arrOfText.push(<div><br/>
                                    <Form id='video'>
                                      <Label as='a' color='teal' ribbon>Video</Label>
                                      <TextArea placeholder='Edit Video Link' id={intentIndex} autoHeight   value={this.state.intent[intentIndex]['value'][valIndex]['value']} onChange={this.handleVideoChange.bind(this)}/>
                                    </Form>
                                    <br/></div>)
                                  }
                                  else{
                                    arrOfText.push(<div><br/>
                                    <Form id='video'>
                                      <Label as='a' color='teal' ribbon>Video</Label>
                                      <div>NO DATA FOUND</div>
                                      <TextArea placeholder='Edit Video Link' id={intentIndex} autoHeight  value={this.state.intent[intentIndex]['value'][valIndex]['value']} onChange={this.handleVideoChange.bind(this)}/>
                                    </Form>
                                    <br/></div>)
                                  }

                                }
                              })
                            })

                  return (

                    <div class='Container'>
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

                        <Button color='green' icon='arrow left' id='edBtn12' size='medium' inverted  onClick={this.back.bind(this)}/>
                        <Grid divided='vertically'>
                            <Grid.Row columns={2}>
                              <Segment>
                                <Grid.Column width={5}>

                                    <Table color='teal' id='table'>
                                        <Divider horizontal>
                                            <h3 id='toc1'>Table of Contents</h3>
                                          </Divider>
                                          <Dropdown  id='dropdown1'  placeholder='Select Templates'
                                             onChange={this.handleTemplate}
                                            fluid selection options={this.state.listOfTemplates}
                                             />
                                            <h3 id='sc'>Select-and-Change</h3>
                                            {arr.map((name, index)=>{
                          return name
                       })}



                                          <Button color='blue'  primary id='edBtn11' icon='book' size='small'  onClick={this.saveToMongo.bind(this)} content='Create Book'/><br/><br/>

                                          <div>
                                             <Button color='teal'  id='subBtn' onClick = {this.handleRadio.bind(this)}>Save Changes</Button>
                                          </div>
                                    </Table>
                                </Grid.Column>
                              </Segment>
                                <Grid.Column width={11}>
                                  <Table color='teal' id='table7'>
                                    {this.state.viewBook?
                                      <div>
                                      <embed id='pdf'
                                      src={require('../../../BookDocs/pdf/'+output)}
                                      width='855' height='600' type='application/pdf'/>
                                    </div>:
                                  //   <div>
                                  //   <embed id='pdf'
                                  //   src={require('../../../BookDocs/pdf/'+output)}
                                  //   width='855' height='600' type='application/pdf'/>
                                  // </div>}
                                      <div>
                                  <Divider horizontal>
                                      <h3 id='preview'>Edit Answers</h3>
                                  </Divider><br/>

                                  <div>
                                    {arrOfText.map((name,index)=>{
                                      return name
                                    })}
                                    <br/>

                                   </div>
                                   </div>
                                 }
                              </Table>
                          </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </div>
                    );
                }
            }
            module.exports = EditBook;
