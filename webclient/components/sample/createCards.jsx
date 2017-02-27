import React from 'react';
import {Container, Grid, Checkbox, Button, Image} from 'semantic-ui-react';
import {hashHistory} from 'react-router';
import $ from 'jquery';
class CreateCards extends React.Component
{
    constructor()
    {
        super();
        this.state = {
            follow: []
        };
        this.setSelected = this.setSelected.bind(this);
    }
    changeFollow(e, result) {
        /*eslint-disable */
        let context = this;
        /*eslint-enable */
        if (result.checked) {
            let temp = true;
            this.state.follow.map(function(item) {
                if (result.label === item) {
                    temp = false;
                }
            });
            if (temp) {
                this.state.follow.push(result.label)/* eslint-disable*/;
            }
        } else if (result.label !== undefined) {
            /* eslint-enable*/
            let arr = [];
            this.state.follow.map(function(item) {
                if (result.label !== item) {
                    arr.push(item);
                }
                context.setState({follow: arr});
            });
        }
    }
    setSelected()
    {
        let temp = true;
        let array = [];
        this.state.follow.map(function(item) {
            if (this.refs.card.id === item) {
                temp = false;
            }
        });
        if (temp) {
            this.state.follow.push(this.refs.card.id);
        } else {
            let i = this.state.follow.indexOf(this.refs.card.id);
            if (i !== -1) {
                array.splice(i, 1);
            }
        }
        //   if(this.state.follow !== )
        //   this.state.follow.push(result.label);
        // else
        //   this.refs.card.id
        this.state.follow.push(this.refs.card.id);
    }
    submitCatagory()
    {
        let jObject = {};
        jObject = JSON.stringify(this.state.follow);
        $.ajax({
            url: 'http://localhost:8080/users/addCatagory',
            type: 'post',
            data: {
                catagory: jObject,
                email: this.props.email
            },
            success: function() {
                // console.log('Successfully got JSON Catagory' + JSON.stringify(data));
                $.ajax({
                    url: 'http://localhost:8080/users/updateIsNew/' + this.props.email,
                    type: 'put',
                    data: {
                        isNew: 'N'
                    },
                    success: function() {
                        // console.log('Successfully updated isNew ');
                        hashHistory.push('/home');
                    },
                    error: function() {
                        // console.log('error occurred on AJAX for update');
                        // console.log(err);
                    }
                });
            }.bind(this),
            error: function() {
                // console.log('error occurred on AJAX');
                // console.log(err);
            }
        });
    }
    render()
    {
        let button = <Button onClick={this.submitCatagory.bind(this)}>GO</Button>;
        /* eslint-disable */
        let context = this;
        /* eslint-enable */
        let data = this.props.categories.map(function(item) {
            return (
                // eslint-disable
                <Grid.Column onClick={context.changeFollow.bind(context)}>
                  {/* eslint-enable */}
                    <Checkbox label={item} onChange={context.changeFollow.bind(context)}/>
                    <div id={item} ref="card" onClick={context.setSelected}>
                        <Image
                           src="https://www.syncano.io/blog/content/images/2016/02/reactjs.jpg"/>
                    </div>
                </Grid.Column>
            );
        });
        return (
            <Container>
                <Grid columns="1">
                    {data}
                </Grid>
                {button}
            </Container>
        );
    }
}
CreateCards.propTypes = {
    email: React.PropTypes.string.isRequired,
    categories: React.PropTypes.array.isRequired
};
export default CreateCards;
