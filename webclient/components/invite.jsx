import React from 'react';
import {Input} from 'semantic-ui-react';
import {Button} from 'semantic-ui-react';
let style = {
    height: 0
};
class invite extends React.Component {
    constructor() {
        super();
        this.state = {
            mail: '',
            status: '',
            button: 'Invite',
            value: ''
        };
        this.invite = this.invite.bind(this);
    }
    change(e) {
        this.setState({value: e.target.value});
    }
    invite() {
        $.ajax({
<<<<<<< HEAD
            url: 'http://localhost:8080/list/invite',
=======
            url: 'http://localhost:8080/restaurant/invite',
>>>>>>> 5a3debcb4284fbb6250b6e6b20cef7d95c656e6a
            type: 'POST',
            data: {
                mail: this.state.value
            },
            success: function() {
                this.setState({status: 'Invited', button: 'Invite More?', value: ''});
              }.bind(this)
        });
    }
    componentDidMount() {
        style = {
            height: $(window).height()
        };
    }
    render() {
        return (
            <div style={style}>
                <h1>
                    Invite
                </h1>
                <Input placeholder='Email..' onChange={this.change.bind(this)}
                  value={this.state.value} autoFocus/>
                <Button color='white' onClick={this.invite}>{this.state.button}</Button>
                {this.state.status}

            </div>
        );
    }
}
module.exports = invite;
