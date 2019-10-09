import React from "react";
import { Avatar, List, ListItem } from "material-ui";
import { Grid, Row, Col } from "react-flexbox-grid";
import { withRouter } from "react-router";
import axios from "axios";

class SpicyMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      foodItems: [],
      lunchItems: [],
      results: [],
      lunchItemsOg: [],
      foodItemsOg: []
    };
    this.Remove = this.Remove.bind(this);
    this.RemoveLunch = this.RemoveLunch.bind(this);
    this.onChange = this.onChange.bind(this);
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
    // Array.prototype.filter returns new array
    // so we aren't mutating state here
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
    // Array.prototype.filter returns new array
    // so we aren't mutating state here
    // remove from temp
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
      .then(response => {
        // this.setState({
        //   userInfo: this.state.userInfo.concat(response.data)
        // });
      });
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

  render() {
    const { search } = this.state;
    return (
      <div className="app-container">
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
          {this.state.foodItems.map(foodItem => (
            // <ListBreak key={foodItem.id} {...foodItem} />
            <Grid fluid key={foodItem.id}>
              <Row center="lg" style={RowItemStyle}>
                <a
                  href="#"
                  value={foodItem}
                  onClick={() => this.Remove(foodItem)}
                >
                  X
                </a>
                {/* <th value={column} onClick={() => this.handleSort(column)}>{column}</th> */}
                {/* <Col xs={3} sm={3} lg={2}>
              <Avatar src={this.props.image} />
            </Col> */}

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
                  onClick={() => this.RemoveLunch(lunchItem)}
                >
                  X
                </a>
                {/* <th value={column} onClick={() => this.handleSort(column)}>{column}</th> */}
                {/* <Col xs={3} sm={3} lg={2}>
              <Avatar src={this.props.image} />
            </Col> */}

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
      </div>
    );
  }
}

const RowItemStyle = {
  alignItems: "center"
};

// search code starts here

export default SpicyMenu;
