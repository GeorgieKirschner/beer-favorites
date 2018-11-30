import React, { Component } from "react";
import {
  Container,
  Row,
  Col,
  ListGroup,
  ListGroupItem,
  Button,
  Form,
  FormGroup,
  Label,
  Input
} from "reactstrap";
import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      beers: [],
      newBeerName: "",
      newBeerAlc: 0,
      newBeerBrewery: "",
      editBeerId: null,
      editBeerName: "",
      editBeerAlc: 0,
      editBeerBrewery: ""
    };

    this.deleteBeer = this.deleteBeer.bind(this);
    this.editBeer = this.editBeer.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
  }

  componentDidMount() {
    let storedBeers = JSON.parse(
      window.localStorage.getItem("georgiesBeerFavs")
    );

    if (storedBeers && storedBeers.length) {
      this.setState({ beers: storedBeers });
    }
  }

  deleteBeer(beerId) {
    let newBeers = this.state.beers.filter(beer => beer.id !== beerId);

    this.setState({
      beers: newBeers
    });

    localStorage.setItem("georgiesBeerFavs", JSON.stringify(newBeers));
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();

    let newBeer = {
      id: this.state.beers.length,
      name: this.state.newBeerName,
      alcoholContent: this.state.newBeerAlc,
      brewery: this.state.newBeerBrewery
    };

    let newBeers = this.state.beers.slice();
    newBeers.push(newBeer);
    this.setState({
      beers: newBeers
    });

    localStorage.setItem("georgiesBeerFavs", JSON.stringify(newBeers));
  }

  editBeer(beerId) {
    let foundBeer = this.state.beers.find(beer => beer.id === beerId);
    this.setState({
      editBeerId: beerId,
      editBeerName: foundBeer.name,
      editBeerAlc: foundBeer.alcoholContent,
      editBeerBrewery: foundBeer.brewery
    });
  }

  handleEdit(event) {
    event.preventDefault();
    let updatedBeer = {
      id: this.state.editBeerId,
      name: this.state.editBeerName,
      alcoholContent: this.state.editBeerAlc,
      brewery: this.state.editBeerBrewery
    };

    let newBeers = this.state.beers.map(beer => {
      if (beer.id === this.state.editBeerId) {
        return updatedBeer;
      } else {
        return beer;
      }
    });

    this.setState({
      beers: newBeers
    });

    localStorage.setItem("georgiesBeerFavs", JSON.stringify(newBeers));
  }

  render() {
    let beerFavs = this.state.beers.map(beer => {
      return (
        <ListGroupItem key={beer.id}>
          {beer.name}, {beer.alcoholContent}, {beer.brewery}
          <Button
            color="danger"
            className="float-right"
            onClick={this.deleteBeer.bind(this, beer.id)}
          >
            Delete
          </Button>
          <Button
            color="warning"
            className="float-right"
            onClick={this.editBeer.bind(this, beer.id)}
          >
            Edit
          </Button>
        </ListGroupItem>
      );
    });

    return (
      <div className="App">
        <Container>
          <Row>
            <Col>
              <h1>Beer Favorites</h1>
              <ListGroup>{beerFavs}</ListGroup>
            </Col>
          </Row>
          <Row>
            <Col>
              <h3>Create New Beer</h3>
              <Form onSubmit={this.handleSubmit}>
                <FormGroup>
                  <Row>
                    <Col sm="3">
                      <Label for="newBeerName">Name:</Label>
                    </Col>
                    <Col sm="9">
                      <Input
                        type="text"
                        name="newBeerName"
                        id="newBeerName"
                        onChange={this.handleChange}
                      />
                    </Col>
                  </Row>
                </FormGroup>
                <FormGroup>
                  <Row>
                    <Col sm="3">
                      <Label for="newBeerAlc">Alcohol Content:</Label>
                    </Col>
                    <Col sm="9">
                      <Input
                        type="text"
                        name="newBeerAlc"
                        id="newBeerAlc"
                        onChange={this.handleChange}
                      />
                    </Col>
                  </Row>
                </FormGroup>
                <FormGroup>
                  <Row>
                    <Col sm="3">
                      <Label for="newBeerBrewery">Brewery:</Label>
                    </Col>
                    <Col sm="9">
                      <Input
                        type="text"
                        name="newBeerBrewery"
                        id="newBeerBrewery"
                        onChange={this.handleChange}
                      />
                    </Col>
                  </Row>
                </FormGroup>
                <Button type="submit" className="float-right">
                  Create Beer
                </Button>
              </Form>
            </Col>
            <Col>
              <h3>Edit Beer</h3>
              <Form onSubmit={this.handleEdit}>
                <FormGroup>
                  <Row>
                    <Col sm="3">
                      <Label for="editBeerName">Name:</Label>
                    </Col>
                    <Col sm="9">
                      <Input
                        type="text"
                        name="editBeerName"
                        id="editBeerName"
                        value={this.state.editBeerName}
                        onChange={this.handleChange}
                      />
                    </Col>
                  </Row>
                </FormGroup>
                <FormGroup>
                  <Row>
                    <Col sm="3">
                      <Label for="editBeerAlc">Alcohol Content:</Label>
                    </Col>
                    <Col sm="9">
                      <Input
                        type="text"
                        name="editBeerAlc"
                        id="editBeerAlc"
                        value={this.state.editBeerAlc}
                        onChange={this.handleChange}
                      />
                    </Col>
                  </Row>
                </FormGroup>
                <FormGroup>
                  <Row>
                    <Col sm="3">
                      <Label for="editBeerBrewery">Brewery:</Label>
                    </Col>
                    <Col sm="9">
                      <Input
                        type="text"
                        name="editBeerBrewery"
                        id="editBeerBrewery"
                        value={this.state.editBeerBrewery}
                        onChange={this.handleChange}
                      />
                    </Col>
                  </Row>
                </FormGroup>
                <Button type="submit" className="float-right">
                  Update Beer
                </Button>
              </Form>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default App;