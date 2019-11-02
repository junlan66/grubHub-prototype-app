import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Avatar, List, ListItem } from "material-ui";
import { Grid, Row, Col } from "react-flexbox-grid";
import { AppBar, Drawer, MenuItem } from "material-ui";
var placeholder = document.createElement("li");
placeholder.className = "placeholder";

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
  //added
  dragStart(e) {
    this.dragged = e.currentTarget;
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/html", this.dragged);
  }
  dragEnd(e) {
    this.dragged.style.display = "block";
    this.dragged.parentNode.removeChild(placeholder);

    // update state
    var data = this.state.colors;
    var from = Number(this.dragged.dataset.id);
    var to = Number(this.over.dataset.id);
    if (from < to) to--;
    data.splice(to, 0, data.splice(from, 1)[0]);
    this.setState({ colors: data });
  }
  dragOver(e) {
    e.preventDefault();
    this.dragged.style.display = "none";
    if (e.target.className === "placeholder") return;
    this.over = e.target;
    e.target.parentNode.insertBefore(placeholder, e.target);
  }
  //
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
        <ul onDragOver={this.dragOver.bind(this)}>
          <List>
            Order List
            {this.state.orderItems.map(orderItem => (
              // <Grid fluid key={orderItem._id}>
              <li
                draggable="true"
                onDragEnd={this.dragEnd.bind(this)}
                onDragStart={this.dragStart.bind(this)}
              >
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
                {/* </Grid> */}
              </li>
            ))}
          </List>
        </ul>
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
