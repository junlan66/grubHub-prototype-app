import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Avatar, List, ListItem } from "material-ui";
import { Grid, Row, Col } from "react-flexbox-grid";
import { AppBar, Drawer, MenuItem } from "material-ui";

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      orderItems: []
    };
    axios
      .get("http://localhost:5000/api/restaurant/order/getOrder")
      .then(response => {
        console.log(response.data);
        // console.log("data" + response.data.toString());
        this.setState({
          orderItems: this.state.orderItems.concat(response.data)
        });
      });
  }
  cancelClick(e) {
    e.preventDefault();
    console.log("canceled");
    axios
      .post("http://localhost:5000/api/restaurant/dataQuery/cancelOrder")
      .then(response => {});
  }
  toggleDrawer = () => this.setState({ open: !this.state.open });
  render() {
    return (
      <div>
        <AppBar
          title="My Restaurant"
          iconClassNameRight="muidocs-icon-navigation-expand-more"
          onLeftIconButtonClick={this.toggleDrawer}
        />
        <Drawer
          docked={false}
          width={300}
          onRequestChange={this.toggleDrawer}
          open={this.state.open}
        >
          <AppBar
            title="Flames Restaurant"
            onLeftIconButtonClick={this.toggleDrawer}
          />

          <MenuItem
            primaryText="Menu"
            containerElement={<Link to="/menu" />}
            onClick={() => {
              this.toggleDrawer();
            }}
          />
          <MenuItem
            primaryText="Add Menu"
            containerElement={<Link to="/addMenu" />}
            onClick={() => {
              this.toggleDrawer();
            }}
          />
          <MenuItem
            primaryText="Profile"
            containerElement={<Link to="/profile" />}
            onClick={() => {
              this.toggleDrawer();
            }}
          />
        </Drawer>
        <div className="container">{this.props.children}</div>

        <Link to="../profile" className="btn btn-link">
          Edit Profile
        </Link>
        <h4>Restaurant Orders</h4>
        <List>
          Order List
          {this.state.orderItems.map(orderItem => (
            <Grid fluid key={orderItem._id}>
              <Row center="lg" style={RowItemStyle}>
                <Link
                  to={{
                    pathname: "/messagePage",
                    data: orderItem
                  }}
                >
                  Chat
                </Link>
                <Col xs={6} sm={6} lg={4}>
                  {orderItem.userName}
                </Col>
                <Col xs={3} sm={3} lg={2}>
                  {orderItem.cartList.map(cartItem => (
                    <Row center="lg" style={RowItemStyle}>
                      {cartItem.name}
                    </Row>
                  ))}
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
