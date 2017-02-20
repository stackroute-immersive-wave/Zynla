import React from 'react';
// import ReactDom from 'react-dom';
import { Input } from 'semantic-ui-react';
import { Button, Grid } from 'semantic-ui-react';

class Child extends React.Component
{
	constructor()
	{
		super();
		this.state = { city: '', cuisine: ''};
	}
	updateCity(evt) {
        this.setState({city: evt.target.value});
    }
    updateCuisine(evt) {
        this.setState({cuisine: evt.target.value});
    }
	callSearch()
	{
		this.props.search(this.state.city, this.state.cuisine);
	}
	render()
	{
		return(
			<Grid centered>
            <Input onChange={this.updateCity.bind(this)} value={this.state.city}
            placeholder ='enter the city name'/>
            <Input onChange={this.updateCuisine.bind(this)} value={this.state.cuisine}
             placeholder ='enter the cuisine name'/>
            < Button primary onClick ={this.callSearch.bind(this)}>search</Button>
           </Grid>
			);
	}
}
Child.propTypes = {
    search: React.PropTypes.func.isRequired
    };
export default Child;

// ReactDom.render(
// 	<MainComponent/>,document.getElementById('mountapp')
// 	);
