//#swathi dimmer for book form loading
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
   Dropdown,
   Card
} from 'semantic-ui-react';
let {hashHistory} = require('react-router');
import Cookie from 'react-cookie';


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
      // let tocArray=[];

      // this.props.toc.toc.forEach((chapter,chapterIndex,chapterArr)=>{
      //   if(chapter.hasOwnProperty('name')){
      //     chapterArr[chapterIndex] =<Card
      // header={"Chapter:"+chapter.name}/>
      //   }
      //   else{
      //      chapterArr[chapterIndex]["Chapter"].forEach((topic,topicIndex,topicArr)=>{
      //        if(topic.hasOwnProperty('name')){
      //         topicArr[topicIndex]=<Card
      //      header={"Topic:"+topic.name}/>
      //        }
      //        else{
      //          topicArr[topicIndex]["Topic"].forEach((subTopic,subTopicIndex,subTopicArr)=>{
      //            if(subTopic.hasOwnProperty('name')){
      //              subTopicArr[subTopicIndex]=<Card
      //          header={"SubTopic:"+subTopic.name}/>
      //            }
      //             else{
      //               subTopicArr[subTopicIndex]=<Card
      //           header={"SubTopic:"+subTopic.Subtopic}/>
      //          }
      //          })
      //          topicArr[topicIndex]=<Card>
      //                                 <Card.Content>
      //                                 {topicArr[topicIndex]["Topic"]}
      //                                 </Card.Content>
      //                               </Card>
      //        }
      //      })
      //      chapterArr[chapterIndex]=<Card>
      //                             <Card.Content>
      //                             {chapterArr[chapterIndex]["Chapter"]}
      //                             </Card.Content>
      //                           </Card>
      //    }
      //  });
      //  console.log(this.props.toc.toc)
      //
      // //  let Tcard=tocArray.map(function(data){
      //    return data
      //  })
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
