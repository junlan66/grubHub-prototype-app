import React from "react";
import { Avatar, List, ListItem } from "material-ui";
import { AppBar, Drawer, MenuItem } from "material-ui";
import { Grid, Row, Col } from "react-flexbox-grid";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import axios from "axios";

class SpicyMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      foodItems: [],
      lunchItems: [],
      results: [],
      lunchItemsOg: [],
      foodItemsOg: [],
      currentPage: 1,
      todosPerPage: 3
    };
    this.Remove = this.Remove.bind(this);
    this.RemoveLunch = this.RemoveLunch.bind(this);
    this.onChange = this.onChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    // sent a GET request
    axios
      .get(
        "http://localhost:5000/api/restaurant/dataQuery/breakfast?name=menu_breakfast"
      )
      .then(response => {
        this.setState({
          foodItems: this.state.foodItems.concat(response.data),
          foodItemsOg: this.state.foodItemsOg.concat(response.data)
        });
      });

    axios
      .get(
        "http://localhost:5000/api/restaurant/dataQuery/lunch?name=menu_lunch"
      )
      .then(response => {
        this.setState({
          lunchItems: this.state.lunchItems.concat(response.data),
          lunchItemsOg: this.state.lunchItemsOg.concat(response.data)
        });
        console.log("LUNCH HH: " + this.state.lunchItems);
      });
  }

  Remove(foodItemDelete) {
    var arrayCopy = this.state.foodItems.filter(
      foodItem => foodItem.id !== foodItemDelete.id
    );
    this.setState({ foodItems: arrayCopy });
    // remove from original
    arrayCopy = this.state.foodItemsOg.filter(
      foodItem => foodItem.id !== foodItemDelete.id
    );
    this.setState({ foodItemsOg: arrayCopy });
    axios
      .post("http://localhost:5000/api/restaurant/deleteMenu", {
        id: foodItemDelete.id,
        menutype: "breakfast"
      })
      .then(response => {
        console.log(response);
      });

    console.log(arrayCopy);
    console.log(foodItemDelete.id);
  }

  RemoveLunch(foodItemDelete) {
    var arrayCopy = this.state.lunchItems.filter(
      lunchItem => lunchItem.id !== foodItemDelete.id
    );
    this.setState({ lunchItems: arrayCopy });

    // remove from original
    arrayCopy = this.state.lunchItemsOg.filter(
      lunchItem => lunchItem.id !== foodItemDelete.id
    );

    this.setState({ lunchItemsOg: arrayCopy });
    axios
      .post("http://localhost:5000/api/restaurant/deleteMenu", {
        body: {
          id: foodItemDelete.id,
          menutype: "lunch"
        }
      })
      .then(response => {});
    console.log(arrayCopy);
    console.log(foodItemDelete.id);
  }
  onChange(e) {
    let currentList = [];
    let currentListFood = [];
    // Variable to hold the filtered list before putting into state
    let newList = [];
    let newListFood = [];

    // If the search bar isn't empty
    if (e.target.value !== "") {
      // Assign the original list to currentList
      currentList = this.state.lunchItems;
      currentListFood = this.state.foodItems;
      // Use .filter() to determine which items should be displayed
      // based on the search terms
      newList = currentList.filter(lunchItem =>
        lunchItem.name.includes(e.target.value)
      );
      newListFood = currentListFood.filter(foodItem =>
        foodItem.name.includes(e.target.value)
      );
    } else {
      console.log("EMPTY " + this.state.lunchItemsOg);
      // If the search bar is empty, set newList to original task list
      newList = this.state.lunchItemsOg;
      newListFood = this.state.foodItemsOg;
    }
    this.setState({
      lunchItems: newList,
      foodItems: newListFood
    });
  }
  //added
  handleClick(event) {
    this.setState({
      currentPage: Number(event.target.id)
    });
  }
  //
  toggleDrawer = () => this.setState({ open: !this.state.open });
  render() {
    //added
    const { search } = this.state;
    const { lunchItems, foodItems, currentPage, todosPerPage } = this.state;

    // Logic for displaying todos
    const indexOfLastTodo = currentPage * todosPerPage;
    const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
    const currentTodos = lunchItems.slice(indexOfFirstTodo, indexOfLastTodo);
    const currentTodosBreakfast = foodItems.slice(
      indexOfFirstTodo,
      indexOfLastTodo
    );

    // Logic for displaying page numbers
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(lunchItems.length / todosPerPage); i++) {
      pageNumbers.push(i);
    }

    const renderPageNumbers = pageNumbers.map(number => {
      return (
        <li key={number} id={number} onClick={this.handleClick}>
          {number}
        </li>
      );
    });
    //
    return (
      <div className="app-container">
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
            primaryText="Profile"
            containerElement={<Link to="/" />}
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
            primaryText="Order"
            containerElement={<Link to="/orders" />}
            onClick={() => {
              this.toggleDrawer();
            }}
          />
        </Drawer>
        <div className="search-container">
          <label>Search Item:</label>
          <input
            type="text"
            name="search"
            value={search}
            onChange={e => this.onChange(e)}
          />
        </div>
        <List>
          Breakfast
          {currentTodosBreakfast.map(foodItem => (
            <Grid fluid key={foodItem.id}>
              <Row center="lg" style={RowItemStyle}>
                <a
                  href="#"
                  value={foodItem}
                  onClick={() => this.Remove(foodItem)}
                >
                  X
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
          Snack
          {currentTodos.map(lunchItem => (
            <Grid fluid key={lunchItem.id}>
              <Row center="lg" style={RowItemStyle}>
                <a
                  href="#"
                  value={lunchItem}
                  onClick={() => this.RemoveLunch(lunchItem)}
                >
                  X
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
        </List>
        <ul id="page-numbers">{renderPageNumbers}</ul>
      </div>
    );
  }
}

const RowItemStyle = {
  alignItems: "center"
};

export default SpicyMenu;
