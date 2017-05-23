import React from 'react';
import {
   Label,
   Button,
   Input
} from 'semantic-ui-react';
import SubTopic from './subTopic';
let addtopicstyle={
marginLeft:'61px'
};
let removetopicstyle={
marginLeft:'2px'
};
let inputtopicstyle={

};
/* eslint-disable */
export default class Topic extends React.Component {
   constructor(props) {
       super(props);
       this.state = {
            emptyInput :false,
            topicInd : ""
           };
        this.RemoveNewTopic = this.RemoveNewTopic.bind(this);
        this.getTopicData = this.getTopicData.bind(this);
        this.addSubTopic = this.addSubTopic.bind(this);
    }
    RemoveNewTopic(e,data){
       this.props.handleRemoveTopic(data.id,this.props.chapIndex);
    }
    getTopicData(e,data){
      this.setState({emptyInput:false});
      this.props.handleAddTopic(data.value,data.id,this.props.chapIndex)
    }
    addSubTopic(e,data){
      let index = "Topic";
      let chapter = "Chapter"
      this.setState({emptyInput:false,topicInd:data.id});
      this.props.handleAddSubTopic('',this.props.topicData[this.props.chapIndex][chapter][data.id][index].length,data.id,this.props.chapIndex);
    }
   render()
    {
      let chapterIndex = this.props.chapIndex;
      let chapterInd = "Chapter";
      let inputs = "";
      if(this.props.topicData[chapterIndex][chapterInd]===undefined)
      {
          inputs = null
      }
      else{
        inputs = Object.keys(this.props.topicData[chapterIndex][chapterInd]).map((input, index)=>{
         if(this.props.topicData[chapterIndex][chapterInd][input].hasOwnProperty('name'))
         {
           return null;
         }
         else{
           let topic = "Topic";
           let topicT = chapterInd+topic
           let inp = "";
           if(this.props.topicData[chapterIndex][chapterInd][input][topic][0]!==undefined){
             inp= this.props.topicData[chapterIndex][chapterInd][input][topic][0]["name"]
           }
         return (
             <div>
               <div key = {index}>
                    <Label id='label2' circular size='large'>Topic</Label>
                   <Button id={index} style={addtopicstyle} icon='add circle' color='blue' onClick={this.addSubTopic} size='small'></Button>
                     <Input value={inp} size='tiny'
                       id={index} onChange={this.getTopicData} placeholder={topic} style={inputtopicstyle} required/>
                     <Button id={index} style={removetopicstyle} icon='remove circle' color='blue' onClick={this.RemoveNewTopic} size='small'></Button>
                    <br/>
                </div>
               <div>
                {this.props.topicType===topicT?<SubTopic subTopicData={this.props.topicData} handleAddSubTopic={this.props.handleAddSubTopic} handleRemoveSubTopic={this.props.handleRemoveSubTopic} chapterIndex = {chapterIndex} topicIndex = {this.state.topicInd}  />:null}
              </div>
            </div>
           );
         }
       });
      }
        return(
          <div>
            {inputs}
           </div>
            );
    }
}
/* eslint-enable */
