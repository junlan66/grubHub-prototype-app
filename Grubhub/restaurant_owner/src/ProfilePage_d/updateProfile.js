import React from "react";
import { Avatar, List, ListItem } from "material-ui";
import { Grid, Row, Col } from "react-flexbox-grid";
import { withRouter } from "react-router";
import axios from "axios";
class UpdateProfile extends React.Component {
  componentDidMount() {
    this.props.getUsers();
  }
  constructor(props) {
    super(props);
    this.state = {
      userInfo: []
    };
    const { user } = this.props;
    console.log(this.props);
    console.log("USER");
    console.log(user);
    axios
      .get("http://localhost:5000/api/restaurant/dataQuery/userInfo", {
        params: {
          userId: user.id
        }
      })
      .then(response => {
        this.setState({
          userInfo: this.state.userInfo.concat(response.data)
        });
      });
  }
  render() {
    return (
      <List>
        {this.state.userInfo.map(info => (
          <ProfileWithRouter key={info.id} {...info} />
        ))}
      </List>
    );
  }
}
const RowItemStyle = {
  alignItems: "center"
};

class profiles extends React.Component {
  constructor(props) {
    super(props);
    console.log("print props: " + props.price);
  }
  render() {
    return (
      <div>
        <p>User Profile</p>

        <Grid fluid>
          {/* <Col xs={3} sm={3} lg={2}>
                  <Avatar src={this.props.image} />
                </Col> */}
          User name: {this.props.name}
          Restaurant name: {this.props.restaurant_name}
          User email: {this.props.email}
          Restaurant Phone number: {this.props.zipcode}
        </Grid>
      </div>
    );
  }
}
const ProfileWithRouter = withRouter(profiles);

export default UpdateProfile;
