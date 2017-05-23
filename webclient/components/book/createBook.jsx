import React from 'react';
import {
   Grid,
   Divider,
   Header,
   Icon,
   Segment,
   Label,
   Dimmer,
   Loader,
   Button,
   Table,
   Input,
   Dropdown
} from 'semantic-ui-react';
import Cookie from 'react-cookie';
import Chapter from './chapter'
let mainGrid={
marginLeft:'5px'
};
let grid1={
color:'black',
'margin-left':'-30px'
};
let tit={
  fontFamily:'Philosopher'
};

let grid2={
color:'green'
};
let submitform={
  marginLeft:'128px'
};

/* eslint-disable */
class CreateBook extends React.Component {
   constructor() {
       super();
       this.state = {
           active: false,
           counter:0,
           chapterData:[{name:"react"}],
           chapterType:"",
           topicType:"",
           flag:false,
           tFlag:false,
           viewBook:true,
           listOfDomains:[],
           output:'last2',
           listOfTemplates:[],
           outputDocx:'',
           path:'../../BookDocs/input.docx'
           };
           this.handleOpen = this.handleOpen.bind(this);
           this.handleClose = this.handleClose.bind(this);
           this.handleAdd = this.handleAdd.bind(this);
           this.handleRemove = this.handleRemove.bind(this);
           this.handleAddTopic = this.handleAddTopic.bind(this);
           this.handleRemoveTopic = this.handleRemoveTopic.bind(this);
           this.handleAddSubTopic = this.handleAddSubTopic.bind(this);
           this.handleRemoveSubTopic = this.handleRemoveSubTopic.bind(this);
           this.saveToMongo = this.saveToMongo.bind(this);
           this.handleDomainAdd = this.handleDomainAdd.bind(this);
           this.handleTitleAdd = this.handleTitleAdd.bind(this);
           this.getDomains = this.getDomains.bind(this);
           this.handleTemplate = this.handleTemplate.bind(this);
       }
        handleOpen() {this.setState({ active: true });}
        handleClose() {this.setState({ active: false });}
        handleDomainAdd(e,data){
          this.state.chapterData[0]["Domain"]=data.value
          this.setState({chapterData:this.state.chapterData})
        }
        handleTitleAdd(e,data){
          this.state.chapterData[0]["title"]=data.value
          this.setState({chapterData:this.state.chapterData})
        }
        handleAdd(chapterName,index){

          console.log("handle add")

          let tempChap="";
          let chap = "Chapter";
          let arrOfTopics = []

           if((chapterName === '')){

            if(this.state.chapterData.length>index){
                  let chapter = {};
                  chapter["name"]=chapterName;
                  arrOfTopics.push(chapter);
                  this.state.chapterData[index][chap]=arrOfTopics;
                  this.setState({chapterData:this.state.chapterData});

                   }
            else{

                  let chapterObject = {}
                  chapterObject[chap]= chapterName;
                  this.state.chapterData.push(chapterObject)
                  this.setState({chapterData:this.state.chapterData});


              }
            }
            else {
              let chapter = {};
              chapter["name"]=chapterName;
              arrOfTopics.push(chapter);
              this.state.chapterData[index][chap]=arrOfTopics;
              this.setState({chapterData:this.state.chapterData});

             }


        };
        handleRemove(index){


            this.state.chapterData.splice(index, 1);
            let newChapterData = [];
            for( let x in this.state.chapterData)
            {
              if(this.state.chapterData[x].hasOwnProperty('name'))
              {
                  newChapterData.push(this.state.chapterData[x])
                continue;
              }
              else{
                let chapter = {};
                Object.keys(this.state.chapterData[x]).map((input, index)=>{
                let chap = "Chapter"
                chapter[chap]= this.state.chapterData[x][input];
                });
                newChapterData.push(chapter)
              }
             }
            this.setState({chapterData:newChapterData})

       }
    handleAddTopic(topicName,topicIndex,chapterIndex){
          let chapterType = chapterIndex
          let chapterInd = "Chapter"
          let topicInd = "Topic"
          let arrOfSubTopics = []
          console.log(topicName)
          console.log(topicIndex)
          console.log(chapterIndex)
          if((topicName === '')){
            console.log(this.state.chapterData  )
            console.log(this.state.chapterData[chapterIndex][chapterInd])
            console.log(this.state.chapterData[chapterIndex][chapterInd].length )
           if(this.state.chapterData[chapterIndex][chapterInd].length>topicIndex){
             console.log("inside")
              let topic = {};
                topic["name"]=topicName;
                arrOfSubTopics.push(topic);
                this.state.chapterData[chapterIndex][chapterInd][topicIndex][topicInd]=arrOfSubTopics;
                this.state.chapterType = chapterType
                this.setState({chapterType:this.state.chapterType})
                this.setState({chapterData:this.state.chapterData});
                console.log(this.state.chapterData)
            }
              else{
                console.log('finaly')
                let topic = {}
                topic[topicInd]= topicName;
                this.state.chapterData[chapterIndex][chapterInd].push(topic)
                this.state.chapterType = chapterType
                this.setState({chapterType:this.state.chapterType})
                this.setState({chapterData:this.state.chapterData,chapterType:chapterType});
                console.log(this.state.chapterData)


            }
          }
          else {
            let topic = {};
            topic["name"]=topicName;
            arrOfSubTopics.push(topic);
            this.state.chapterData[chapterIndex][chapterInd][topicIndex][topicInd]=arrOfSubTopics;
            this.setState({chapterData:this.state.chapterData,chapterType:chapterType});

          }

        }
        handleRemoveTopic(topicindex,chapterIndex){


          let chapterInd = "Chapter"
          this.state.chapterData[chapterIndex][chapterInd].splice(topicindex, 1);
          let newChapterData = [];
          for( let x in this.state.chapterData[chapterIndex][chapterInd])
          {
            if(this.state.chapterData[chapterIndex][chapterInd][x].hasOwnProperty('name'))
            {
              newChapterData.push(this.state.chapterData[chapterIndex][chapterInd][x])
              continue;
            }
            else{
              let topic = {};
              Object.keys(this.state.chapterData[chapterIndex][chapterInd][x]).map((input, index)=>{
              let topicInd = "Topic"
              topic[topicInd]= this.state.chapterData[chapterIndex][chapterInd][x][input];
              });
              newChapterData.push(topic)
            }
         }
          this.state.chapterData[chapterIndex][chapterInd]=newChapterData
          this.setState({chapterData:this.state.chapterData})

        }
      handleAddSubTopic(subTopicName,subTopicIndex,topicIndex,chapterIndex){
          let chapterType = "Chapter"
          let chapterInd = "Chapter"
          let topicInd = "Topic"
          let subTopicInd = "Subtopic";
          let topicType = chapterInd+topicInd
          let arrOfSubTopics = []

          if((subTopicName === '')){
            console.log(this.state.chapterData[chapterIndex][chapterInd][topicIndex][topicInd])
            if((typeof this.state.chapterData[chapterIndex][chapterInd][topicIndex][topicInd])==="string"){
              if(this.state.chapterData[chapterIndex][chapterInd][topicIndex][topicInd].trim()==="")
              console.log(this.state.chapterData[chapterIndex][chapterInd][topicIndex][topicInd])

            }
            else{
            for(let x in this.state.chapterData[chapterIndex][chapterInd][topicIndex][topicInd])
            {
              if((typeof this.state.chapterData[chapterIndex][chapterInd][topicIndex][topicInd][x])==="string"){
                if(this.state.chapterData[chapterIndex][chapterInd][topicIndex][topicInd][x].trim()===""){
                  console.log(this.state.chapterData[chapterIndex][chapterInd][topicIndex][topicInd])

              }
           }
            }
          }
             if(this.state.chapterData[chapterIndex][chapterInd][topicIndex][topicInd].length>subTopicIndex){
                let subTopic={}
                subTopic[subTopicInd]=subTopicName
                this.state.chapterData[chapterIndex][chapterInd][topicIndex][topicInd][subTopicIndex]=subTopic
                this.setState({chapterData:this.state.chapterData,topicType:topicType});

              }
              else{

              this.state.chapterData[chapterIndex][chapterInd][topicIndex][topicInd].push(subTopicName)
                this.setState({chapterData:this.state.chapterData,topicType:topicType});


              }
          }
          else {
          let  subTopic={}
            subTopic[subTopicInd]=subTopicName
            this.state.chapterData[chapterIndex][chapterInd][topicIndex][topicInd][subTopicIndex]=subTopic;
            this.setState({chapterData:this.state.chapterData,topicType:topicType});

          }

      }
      handleRemoveSubTopic(subTopicIndex,topicIndex,chapterIndex){


            let chapterInd = "Chapter";
            let topicInd = "Topic";
            this.state.chapterData[chapterIndex][chapterInd][topicIndex][topicInd].splice(subTopicIndex, 1);
            let newChapterData = [];
            for( let x in this.state.chapterData[chapterIndex][chapterInd][topicIndex][topicInd])
            {
              if(this.state.chapterData[chapterIndex][chapterInd][topicIndex][topicInd][x].hasOwnProperty('name'))
              {
                newChapterData.push(this.state.chapterData[chapterIndex][chapterInd][topicIndex][topicInd][x])
                continue;
              }
              else{
                let subTopic = {};
                Object.keys(this.state.chapterData[chapterIndex][chapterInd][topicIndex][topicInd][x]).map((input, index)=>{
                let subTopicInd = "Subtopic"
                subTopic[subTopicInd]= this.state.chapterData[chapterIndex][chapterInd][topicIndex][topicInd][x][input];
                });
                newChapterData.push(subTopic)
              }
  }
            this.state.chapterData[chapterIndex][chapterInd][topicIndex][topicInd]=newChapterData
            this.setState({chapterData:this.state.chapterData})

             }

        saveToMongo()
        {
          this.state.viewBook=false;
          this.setState({viewBook:this.state.viewBook})
          console.log("inside saveTocMongo")
          console.log(this.state.chapterData)
          let toc={}
          toc["chapdata"]=this.state.chapterData
          let book=this.state.chapterData.slice();
                console.log(book)
             var email = Cookie.load('email');
             var authorName = Cookie.load('username')
             console.log(authorName)
             var title = this.state.chapterData[0]["title"];
             var domain = this.state.chapterData[0]["Domain"];
             var path = this.state.path;
             console.log(title);
             console.log(JSON.stringify(book))
            let check = false;
            console.log(check);
            $.ajax({
              url: '/book/saveToc',
              type: 'POST',
              data: {book:JSON.stringify(book),type:'save', author:email, template:path,domain:domain,title:title,username:authorName},
              success: function(success) {
                console.log("success!!");
                console.log(success)
                console.log((JSON.stringify(success)))
               this.setState({outputDocx:success})
                console.log(this.state.outputDocx);
                this.state.viewBook=true;
                this.setState({viewBook:this.state.viewBook})
                console.log(this.state.viewBook)
                // this.setState({output:"output"})
              }.bind(this),
              error: function(error){
                console.log("error");
                console.log(error)
              }
            });
            this.handleOpen();
          }
      getDomains(){
             let arr = [];
             $.ajax({
               url: '/book/getDomains',
               type: 'GET',
               success: function(data) { console.log(data)
                 for (let i in data) {
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

           handleTemplate(e,data)
           {
          this.setState({flag:true})

          if(data.value === '../../BookDocs/input.docx')
          {
          this.setState({tFlag:true})
            console.log("if "+this.state.tFlag)
          }
          else if(data.value === '../../BookDocs/input1.docx')
          {
          this.setState({tFlag:false})
          console.log("else "+this.state.tFlag)
          }
             this.setState({path:data.value});
           }

           componentDidMount()
           {
             var template=[{key:'../../BookDocs/input.docx',
              value:'../../BookDocs/input.docx',text:'Template uno'},
            {key:'../../BookDocs/input1.docx',
             value:'../../BookDocs/input1.docx',text:'Template dos'}];

             this.setState({listOfTemplates:template})
           }

    componentWillMount(){
      this.getDomains();
    }
    render()
    {
    let output = this.state.outputDocx

      const { active } = this.state;
        return(
          <div>
            <Grid  divided='vertically'>
              <Grid.Row columns={2}>
                <Segment>
                <Grid.Column width={5} style={grid1}>
                  <Table color='teal' id='table'>
                  <div style={mainGrid}>
                    <Divider horizontal>
                      <Label id='toc1'>TABLE OF CONTENT</Label>

                   </Divider>
                  </div><br/><br/>


                      <Dropdown  id='dropdown'  placeholder='Select Domain'
                         onChange={this.handleDomainAdd}
                         fluid selection options={this.state.listOfDomains}
                         />
                  <br/>
                 <br/>

                 <Dropdown  id='dropdown'  placeholder='Select Templates'
                    onChange={this.handleTemplate}
                    fluid selection options={this.state.listOfTemplates}
                    />
             <br/>
            <br/>


                    <Input id='title' style={tit}
                       action={{ color: 'teal', labelPosition: 'left', icon: 'file text outline', content: 'Title' }}
                       actionPosition='left'
                       onChange={this.handleTitleAdd}
                       />
                       <br/>
                     <br/>


                 <div>
                    <Chapter chapterData= {this.state.chapterData}
                              handleAdd = {this.handleAdd}
                              handleRemove={this.handleRemove}
                              handleAddTopic={this.handleAddTopic}
                              handleRemoveTopic={this.handleRemoveTopic}
                              handleAddSubTopic={this.handleAddSubTopic}
                              handleAddSubTopic={this.handleAddSubTopic}
                              handleRemoveSubTopic={this.handleRemoveSubTopic}
                              chapterType={this.state.chapterType}
                              topicType={this.state.topicType} />
                  </div><br/><br/>
                  <div>
                    <Button onClick={this.saveToMongo} style={submitform} color='teal' id='subBtn'>Submit</Button>

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
                </Table>
                </Grid.Column>
              </Segment>


               <Grid.Column width={11} style={grid2}>
                  <Table color='teal' id='table2'>
                  <Divider horizontal>
                    <Label id='preview' size='huge'>PREVIEW OF THE BOOK</Label>
                  </Divider><br/>
                  <div>
                  {(this.state.viewBook) ?
                    <div>
           {(this.state.flag) ?
            <div>
            {(this.state.tFlag) ?
           <embed id='pdf'
           src={require('../../../BookDocs/pdf/input.pdf')}
           width='855' height='600' type='application/pdf'/>
              :<embed id='pdf'
              src={require('../../../BookDocs/pdf/input1.pdf')}
               width='855' height='600' type='application/pdf'/> }
               </div>
                   :<embed id='pdf'
                   src={require('../../../BookDocs/pdf/last2.pdf')}
                   width='855' height='600' type='application/pdf'/> }
               </div>
                   :<embed id='pdf'
                   src={require('../../../BookDocs/pdf/'+output)}
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
module.exports = CreateBook;
/* eslint-enable */
