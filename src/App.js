import React, { Component } from "react";
import "./App.css";
import CreateBeer from "./CreateBeer";
import BeerList from "./BeerList";
import axios from "axios";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      beers: [],
      newBeerCounter: 3,
      newBeerName: ""
    };
  }

  componentDidMount() {
    axios.get("/beers").then(response => {
      this.setState({
        beers: response.data
      });
    });
  }

  setEdit = (e, beerId) => {
    let newBeers = this.state.beers.map(beer => {
      if (beer.id === beerId) {
        return { ...beer, edit: true };
      } else {
        return { ...beer, edit: false };
      }
    });
    this.setState({
      beers: newBeers
    });
  };

  handleDelete = (beerId, e) => {
    e.preventDefault();
    const updatedBeerlist = this.state.beers.filter(beer => beer.id !== beerId);
    this.setState({
      beers: updatedBeerlist
    });
  };

  handleUpdate(beerId, updateBeerName, e) {
    e.preventDefault();
    const updatedBeerlist = this.state.beers.map(beer => {
      if (beer.id === beerId) {
        return { ...beer, name: updateBeerName, edit: false };
      } else {
        return { ...beer, edit: false };
      }
    });
    this.setState({
      beers: updatedBeerlist
    });
  }

  handleSubmit(e, name, brewery) {
    e.preventDefault();
    axios
      .post("/beers", {
        name: name,
        abv: 4.0,
        ibu: 60,
        brewery_id: parseInt(brewery)
      })
      .then(response => {
        this.setState({ beers: response.data });
      });
  }

  render() {
    return (
      <div>
        <h1>Georgie's Beer Favorites</h1>
        <BeerList
          beers={this.state.beers}
          setEdit={this.setEdit.bind(this)}
          handleDelete={this.handleDelete.bind(this)}
          handleUpdate={this.handleUpdate.bind(this)}
        />
        <CreateBeer handleSubmit={this.handleSubmit.bind(this)} />
      </div>
    );
  }
}

export default App;
