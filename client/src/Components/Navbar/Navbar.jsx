import React, { Component } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { NavLink } from "react-router-dom";
import './navbar.css'

class Navbar extends Component {
  state = {
    title: "Typer",
    tabs: [
      {
        text: "Home",
        route: "/",
        isExact: true
      },
      {
        text: "Game",
        route: "/game",
        isExact: false
      },
      {
        text: "Spotify log in",
        route: "/spotify",
        isExact: false
      }
    ]
  };
  render() {
    return (
      <div>
        <AppBar position="static">
          <Toolbar>
            <Typography />
            {this.state.tabs.map((item, i) => (
              <NavLink
                exact={item.isExact}
                style={{ textDecoration: "none" }}
                activeClassName="active"
                key={item.route}
                to={item.route}
              >
                <Button color="default">{item.text}</Button>
              </NavLink>
            ))}
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export default Navbar;
