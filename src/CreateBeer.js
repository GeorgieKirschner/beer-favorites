import React, { Component } from "react";
import "./App.css";
import axios from "axios";

class CreateBeer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      breweries: [],
      name: "",
      brewery: 1
    };
  }

  componentDidMount() {
    axios.get("/breweries").then(response => {
      this.setState({
        breweries: response.data
      });
    });
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  render() {
    const breweries = this.state.breweries.map(brewery => {
      return (
        <option value={brewery.id} key={brewery.id}>
          {brewery.name}
        </option>
      );
    });
    return (
      <div>
        <form
          onSubmit={e =>
            this.props.handleSubmit(e, this.state.name, this.state.brewery)
          }
        >
          <fieldset>
            <label>Name of Beer:</label>
            <input
              type="text"
              name="name"
              value={this.state.name}
              onChange={e => this.handleChange(e)}
            />
          </fieldset>
          <fieldset>
            <label>Brewery:</label>
            <select name="brewery" onChange={e => this.handleChange(e)}>
              {breweries}
            </select>
          </fieldset>
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default CreateBeer;
