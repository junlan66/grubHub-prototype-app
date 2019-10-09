import React from "react";
import { Avatar, List, ListItem } from "material-ui";
import { Grid, Row, Col } from "react-flexbox-grid";
import { withRouter } from "react-router";
import axios from "axios";

class DetailPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      foodItems: [],
      lunchItems: [],
      cartBrItems: []
    };

    this.Cart = this.Cart.bind(this);
    // sent a GET request
    axios
      .get(
        "http://localhost:4000/api/buyer/login/breakfast?name=menu_breakfast"
      )
      .then(response => {
        this.setState({
          foodItems: this.state.foodItems.concat(response.data)
        });
      });

    axios
      .get("http://localhost:4000/api/buyer/login/lunch?name=menu_lunch")
      .then(response => {
        this.setState({
          lunchItems: this.state.lunchItems.concat(response.data)
        });
      });
  }

  Cart(foodItem) {
    //foodItem.preventDefault();
    console.log("Add to Cart");
    console.log(foodItem.price + " " + foodItem.name);
    this.setState({ cartBrItems: this.state.cartBrItems.concat(foodItem) });
    // var listContents = [];

    // listContents.push(foodItem.id);
    // localStorage.setItem(
    //   "cartList",
    //   JSON.stringify([listContents, "breakfast", "1"])
    // );
    // //setValue(JSON.stringify(listContents));
    // console.log("print listcontents " + listContents);

    axios
      .post("http://localhost:4000/api/buyer/login/cart", {
        id: foodItem.id,
        name: foodItem.name,
        menutype: "breakfast",
        quantity: "1"
      })
      .then(response => {
        console.log(response);
      });
  }

  render() {
    return (
      <div>
        <List>
          Breakfast
          {this.state.foodItems.map(foodItem => (
            // <ListBreak key={foodItem.id} {...foodItem} />
            <Grid fluid key={foodItem.id}>
              <Row center="lg" style={RowItemStyle}>
                <a
                  href="#"
                  value={foodItem}
                  onClick={() => this.Cart(foodItem)}
                >
                  +
                </a>
                <Col xs={6} sm={6} lg={4}>
                  {foodItem.name}
                </Col>
                <Col xs={3} sm={3} lg={2}>
                  {foodItem.price}
                </Col>
              </Row>
            </Grid>
          ))}
          Lunch
          {this.state.lunchItems.map(lunchItem => (
            // <SpicyMenuItemWithRouter key={lunchItem.id} {...lunchItem} />
            <Grid fluid key={lunchItem.id}>
              <Row center="lg" style={RowItemStyle}>
                <a
                  href="#"
                  value={lunchItem}
                  onClick={() => this.Cart(lunchItem)}
                >
                  +
                </a>
                <Col xs={6} sm={6} lg={4}>
                  {lunchItem.name}
                </Col>
                <Col xs={3} sm={3} lg={2}>
                  {lunchItem.price}
                </Col>
              </Row>
            </Grid>
          ))}
          My Cart
          {this.state.cartBrItems.map(cartBrItem => (
            <Grid fluid key={cartBrItem.id}>
              <Row center="lg" style={RowItemStyle}>
                <Col xs={6} sm={6} lg={4}>
                  {cartBrItem.name}
                </Col>
                <Col xs={3} sm={3} lg={2}>
                  {cartBrItem.price}
                </Col>
                <Col xs={3} sm={3} lg={2}>
                  1
                </Col>
              </Row>
            </Grid>
          ))}
        </List>
        <button onClick={e => this.handleClick(e)}>Submit Order</button>
      </div>
    );
  }
}

const RowItemStyle = {
  alignItems: "center"
};

export default DetailPage;
