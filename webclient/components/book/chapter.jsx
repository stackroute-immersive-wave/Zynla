import React from 'react';
import {
   Grid,
   Divider,
   Header,
   Container,
   Icon,
   Form,
   Label,
   Dimmer,
   Loader,
   Button,
   Modal,
   Input,
   TextArea
} from 'semantic-ui-react';
import Cookie from 'react-cookie';
import Topic from './topic';
let addtoc={
  marginLeft:'90px',
};
let addchapterstyle={
marginLeft:'45px',
};
let removechapterstyle={
marginLeft:'2px',
};
let inputstyle={
};
export default class Chapter extends React.Component {
   constructor(props) {
       super(props);
       this.state = {
            emptyInput : false,
            TopicComponent : null,
            chapIndex: "",
           };
           this.addNewChapter = this.addNewChapter.bind(this);
           this.getInputData  = this.getInputData.bind(this);
           this.removeChapter = this.removeChapter.bind(this);
           this.addTopic = this.addTopic.bind(this);
       }
       getInputData(e,data){
         if(data.value.trim()===""){
          this.setState({emptyInput:true});
           this.props.handleAdd(data.value,data.id)
         }
         else{
           this.setState({emptyInput:false});
           this.props.handleAdd(data.value,data.id)
         }
       }
       removeChapter(e,data){
          this.props.handleRemove(data.id)
       }
       addNewChapter(){
        this.props.handleAdd('',this.props.chapterData.length);
       }
       addTopic(e,data){
         e.preventDefault();
        let index = "Chapter";
        let chapter = index;
        this.setState({emptyInput:false,chapIndex:data.id});
        console.log(this.props.chapterData[data.id])
        console.log(this.props.chapterData[data.id][chapter])
        console.log(this.props.chapterData[data.id][chapter].length)
        console.log(data.id)

        this.props.handleAddTopic('',this.props.chapterData[data.id][index].length,data.id);
         }
       render()
    {
        let inputs = Object.keys(this.props.chapterData).map((input, index)=>{
        if(this.props.chapterData[input].hasOwnProperty('name'))
        {
          return null;
        }
        else{
        let chapter = "Chapter";
        let inp = ""
        let tempChap = this.props.chapterType
        if(this.props.chapterData[input][chapter][0]!==undefined){
          inp= this.props.chapterData[input][chapter][0]["name"]
        }
        return (
          <div key = {index}>
            {/*<Button id={index} onClick={this.addTopic} style={addchapterstyle}  icon='plus' inverted color='grey' size='mini'>
            </Button>*/}
                <Label id='label1' circular size='large'>Chapter</Label>
                <Button id={index} style={addchapterstyle} icon='add circle' color='blue' onClick={this.addTopic}  size='small'>
                </Button>
                  <Input value={inp} size='tiny'
                    id={index} onChange={this.getInputData} placeholder={chapter} style={inputstyle} required/>
                  <Button id={index} style={removechapterstyle} icon='remove circle' color='blue' onClick={this.removeChapter}  size='small'>
                </Button>
                    <br/>
            {/*<Button id={index} onClick={this.removeChapter} style={removechapterstyle}  icon='remove' inverted color='grey' size='mini'>
            </Button>*/}
            <div>
              {tempChap===index?<Topic topicData={this.props.chapterData} handleAddTopic={this.props.handleAddTopic} handleRemoveTopic={this.props.handleRemoveTopic} handleAddSubTopic={this.props.handleAddSubTopic} handleRemoveSubTopic={this.props.handleRemoveSubTopic} chapIndex={this.props.chapterType} topicType={this.props.topicType} />:null}
            </div><br/><br/>
        </div>
        );
      }
    });
        return(
          <div>
            <Form>
              {inputs}
            </Form><br/>
          <Button id='btn' color='teal' content='Add Chapter' icon='sidebar' labelPosition='left' onClick={this.addNewChapter}/>
            </div>
        );
    }
}
