import React from 'react';
import {
   Label,
   Button,
   Input
} from 'semantic-ui-react';
/* eslint-disable */
let removesubtopicstyle={
marginLeft:'3px',
};
let inputsubtopicstyle=
{
marginLeft:'75px',
width:'180px',
};
export default class Topic extends React.Component {
   constructor(props) {
       super(props);
       this.state = {
            emptyInput :false
           };
        this.RemoveNewSubTopic = this.RemoveNewSubTopic.bind(this);
        this.getSubTopicData = this.getSubTopicData.bind(this);
    }
    RemoveNewSubTopic(e,data){
        this.props.handleRemoveSubTopic(data.id,this.props.topicIndex,this.props.chapterIndex)
    }
    getSubTopicData(e,data){
      this.setState({emptyInput:false});
      this.props.handleAddSubTopic(data.value,data.id,this.props.topicIndex,this.props.chapterIndex)
     }
render()
    {
      let chapterIndex = this.props.chapterIndex;
      let chapterInd = "Chapter";
      let topicIndex = this.props.topicIndex;
      let topicInd = "Topic";
      let inputs = ""
      if(this.props.subTopicData[chapterIndex][chapterInd][topicIndex]===undefined)
      {
        inputs =null
      }
      else{
      inputs = Object.keys(this.props.subTopicData[chapterIndex][chapterInd][topicIndex][topicInd]).map((input, index)=>{
        let subTopic = "Subtopic";
        if(this.props.subTopicData[chapterIndex][chapterInd][topicIndex][topicInd][input].hasOwnProperty('name'))
        {
          return null;
        }
        else{
          let inp = "";
          if(this.props.subTopicData[chapterIndex][chapterInd][topicIndex][topicInd][input][subTopic]!==undefined){
            inp= this.props.subTopicData[chapterIndex][chapterInd][topicIndex][topicInd][input][subTopic]
          }
         return (
            <div key = {index}>
              <Label id='label3' circular size='large'>Subtopic</Label>
            <Input value={inp} size='tiny'
              id={index} onChange={this.getSubTopicData} placeholder={subTopic} style={inputsubtopicstyle} required/>
            <Button id={index} style={removesubtopicstyle} icon='remove circle' color='blue' onClick={this.RemoveNewSubTopic}  size='small'></Button>
              <br/>
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
