import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
// import { Avatar, List, ListItem } from "material-ui";
import { Grid, Row, Col } from "react-flexbox-grid";
import { AppBar, Drawer, MenuItem } from "material-ui";

var placeholder = document.createElement("li");
placeholder.className = "placeholder";

class List extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      orderItems: []
    };
  }
  componentDidMount() {
    axios
      .get("http://localhost:5000/api/restaurant/order/getOrder")
      .then(response => {
        console.log(response.data);
        // console.log("data" + response.data.toString());
        this.setState({
          orderItems: this.state.orderItems.concat(response.data)
        });
        console.log("printji");
        console.log(this.state.orderItems);
      });
  }
  dragStart(e) {
    this.dragged = e.currentTarget;
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/html", this.dragged);
  }
  dragEnd(e) {
    this.dragged.style.display = "block";
    this.dragged.parentNode.removeChild(placeholder);
    // update state
    var data = this.state.orderItems;
    var from = Number(this.dragged.dataset.id);
    var to = Number(this.over.dataset.id);
    if (from < to) to--;
    data.splice(to, 0, data.splice(from, 1)[0]);
    this.setState({ orderItems: data });
  }
  dragOver(e) {
    e.preventDefault();
    this.dragged.style.display = "none";
    if (e.target.className === "placeholder") return;
    this.over = e.target;
    e.target.parentNode.insertBefore(placeholder, e.target);
  }
  deliveredClick(orderItem) {
    console.log("Delivered");
    axios
      .post("http://localhost:5000/api/restaurant/order/submitPastOrder", {
        orderItem: orderItem
      })
      .then(response => {
        console.log(response);
      });

    axios
      .get("http://localhost:5000/api/restaurant/messages/deleteOrder", {
        params: {
          orderId: orderItem._id
        }
      })
      .then(response => {});
  }

  render() {
    return (
      <ul onDragOver={this.dragOver.bind(this)}>
        {this.state.orderItems.map((orderItem, i) => (
          <li
            data-id={i}
            key={i}
            draggable="true"
            onDragEnd={this.dragEnd.bind(this)}
            onDragStart={this.dragStart.bind(this)}
          >
            <button onClick={e => this.deliveredClick(orderItem)}>
              Delivered
            </button>
            <Link
              to={{
                pathname: "/messagePage",
                data: orderItem
              }}
            >
              Chat
            </Link>
            {" Order ID: " +
              orderItem._id +
              " From buyer: " +
              orderItem.userName +
              " Items: " +
              orderItem.cartList[0].name}
          </li>
        ))}
      </ul>
    );
  }
}

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      orderItems: []
    };
  }

  render() {
    return (
      <div>
        <Link to="../profile" className="btn btn-link">
          Edit Restaurant Profile
        </Link>
        <h4>My Orders</h4>
        <List></List>
      </div>
    );
  }

  // toggleDrawer = () => this.setState({ open: !this.state.open });
  // render() {
  //   return (
  //     <div>
  //       <AppBar
  //         title="My Restaurant"
  //         iconClassNameRight="muidocs-icon-navigation-expand-more"
  //         onLeftIconButtonClick={this.toggleDrawer}
  //       />
  //       <Drawer
  //         docked={false}
  //         width={300}
  //         onRequestChange={this.toggleDrawer}
  //         open={this.state.open}
  //       >
  //         <AppBar
  //           title="Flames Restaurant"
  //           onLeftIconButtonClick={this.toggleDrawer}
  //         />

  //         <MenuItem
  //           primaryText="Menu"
  //           containerElement={<Link to="/menu" />}
  //           onClick={() => {
  //             this.toggleDrawer();
  //           }}
  //         />
  //         <MenuItem
  //           primaryText="Add Menu"
  //           containerElement={<Link to="/addMenu" />}
  //           onClick={() => {
  //             this.toggleDrawer();
  //           }}
  //         />
  //         <MenuItem
  //           primaryText="Profile"
  //           containerElement={<Link to="/profile" />}
  //           onClick={() => {
  //             this.toggleDrawer();
  //           }}
  //         />
  //       </Drawer>
  //       <div className="container">{this.props.children}</div>

  //       <Link to="../profile" className="btn btn-link">
  //         Edit Profile
  //       </Link>
  //       <h4>Restaurant Orders</h4>

  //       <List>
  //         Order List
  //         {this.state.orderItems.map(orderItem => (
  //           <Grid fluid key={orderItem._id}>
  //             <Row center="lg" style={RowItemStyle}>
  //               <Link
  //                 to={{
  //                   pathname: "/messagePage",
  //                   data: orderItem
  //                 }}
  //               >
  //                 Chat
  //               </Link>
  //               <Col xs={6} sm={6} lg={4}>
  //                 {orderItem.userName}
  //               </Col>
  //               <Col xs={3} sm={3} lg={2}>
  //                 {orderItem.cartList.map(cartItem => (
  //                   <Row center="lg" style={RowItemStyle}>
  //                     {cartItem.name}
  //                   </Row>
  //                 ))}
  //               </Col>
  //             </Row>
  //           </Grid>
  //         ))}
  //       </List>

  //       <button onClick={e => this.cancelClick(e)}>Cancel</button>
  //       <button onClick={e => this.handleClick(e)}>Preparing</button>
  //       <button onClick={e => this.handleClick(e)}>Ready</button>
  //       <button onClick={e => this.handleClick(e)}>Delivered</button>
  //     </div>
  //   );
  // }
}

const RowItemStyle = {
  alignItems: "center"
};
export default HomePage;
