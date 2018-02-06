import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
class BeerDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      details: {} // details holds all values for a beer (id, name, brewery, alcoholContent)
    }
  }

  componentWillMount() {

    // Get beer by Id
    this.state.details =  this.props.beers.find(beer => {
      return beer.id === parseInt(this.props.match.params.id)
    })
  }

  render() {
    return (
      <div>
        <h3>Beer Details</h3>
        <ul>
          <li>Name: { this.state.details.name }</li>
          <li>Brewery: { this.state.details.brewery }</li>
          <li>Alochol Content: { this.state.details.alcoholContent }</li>
        </ul>
        <Link to='/'><button>Back</button></Link>  {/* Adds link back to base url "/" */}
        <Link to={ '/beers/update/' + this.state.details.id }><button>Edit</button></Link>  {/* Adds link to beer update form */}
      </div>
    );
  }
}

export default BeerDetails;