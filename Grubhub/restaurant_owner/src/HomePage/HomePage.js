import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Avatar, List, ListItem } from "material-ui";
import { Grid, Row, Col } from "react-flexbox-grid";

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cartItems: []
    };

    // this.Cart = this.Cart.bind(this);
    axios
      .get("http://localhost:5000/api/restaurant/dataQuery/orders")
      .then(response => {
        this.setState({
          cartItems: this.state.cartItems.concat(response.data)
        });
      });
  }
  cancelClick(e) {}
  render() {
    return (
      <div>
        <Link to="../profile" className="btn btn-link">
          Edit Profile
        </Link>
        <h4>Restaurant Orders</h4>
        <List>
          Buyer
          {this.state.cartItems.map(cartItem => (
            // <ListBreak key={foodItem.id} {...foodItem} />
            <Grid fluid key={cartItem.id}>
              <Row center="lg" style={RowItemStyle}>
                <Col xs={6} sm={6} lg={4}>
                  {cartItem.name}
                </Col>
                <Col xs={3} sm={3} lg={2}>
                  {cartItem.price}
                </Col>
              </Row>
            </Grid>
          ))}
        </List>
        <button onClick={e => this.cancelClick(e)}>Cancel</button>
        <button onClick={e => this.handleClick(e)}>Preparing</button>
        <button onClick={e => this.handleClick(e)}>Ready</button>
        <button onClick={e => this.handleClick(e)}>Delivered</button>
      </div>
    );
  }
}

const RowItemStyle = {
  alignItems: "center"
};
export default HomePage;
