import React, { Component } from "react";
import "./App.css";

class CreateBeer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newBeerName: ""
    };
  }

  handleChange(e) {
    this.setState({
      newBeerName: e.target.value
    });
  }
  render() {
    return (
      <div>
        <form
          onSubmit={e => this.props.handleSubmit(e, this.state.newBeerName)}
        >
          <fieldset>
            <label>Name of Beer:</label>
            <input
              type="text"
              value={this.state.newBeerName}
              onChange={e => this.handleChange(e)}
            />
          </fieldset>
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default CreateBeer;
