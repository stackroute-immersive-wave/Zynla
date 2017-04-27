import React from 'react';
import CardsComment from './commentCardStructure.jsx';
class CommentPage extends React.Component {
    constructor () {
        super();
 
    }
    
    render(){
    	let arr = this.props.objArray.comment;
        console.log(arr)
        let id = this.props.objArray.id;
        let cards = arr.map(function(item) {
            console.log(item.createdBy)
                return (
            <div>
                <CardsComment createdBy={item.createdBy} 
                content={item.content} createdOn={item.createdOn} 
                id={item.id} name={item.name}/>
            </div>  
            );
    });
        return(
            <div>
            {cards}
        </div>
        );
}
}
CommentPage.propTypes = {
    objArray: React.PropTypes.object.isRequired,
};
module.exports = CommentPage;
