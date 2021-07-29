import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { AppBar, Avatar, makeStyles, Toolbar } from "@material-ui/core";
import {
  GrStatusUnknown,
  RiAdminLine,
  RiHome3Line,
  RiMapPinLine
} from 'react-icons/all';

const useStyles = makeStyles(theme => ({
  header: {
    marginBottom: "100px",
  },
  toolBar: {
    display: "flex",
    justifyContent: "space-around",
  },
  headerNav: {
    width: "500px",
    display: "flex",
    justifyContent: "space-between",
    fontSize: "25px",
    textDecoration: "none",
  },
  navLink: {
    textDecoration: "none",
  },
  active: {
    fontSize: "30px",
    color: "white",
  },
  avatar: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  }
}));

function Header(props) {
  const classes = useStyles();
  const { pathname } = useLocation();

  const isActive = (pn) => {
    if (pn === pathname) {
      return classes.active;
    }
  };

  return (
    <div className={classes.header}>
      <AppBar>
        <Toolbar className={classes.toolBar}>
          <Avatar className={classes.avatar}
            src="https://upload.wikimedia.org/wikipedia/commons/b/bd/Flag_of_Magas_%28Ingushetia%29.png"
            alt="Logo"
          />
          <h1>Администрация г.Магас</h1>
          <nav className={classes.headerNav}>
            <NavLink className={isActive("/home")} style={{ color: "#C0C0C0", textDecoration: "none"}} to="/home">
              <RiHome3Line/>
            </NavLink>
            <NavLink
              className={isActive("/admin")}
              to="/admin"
              activeClassName="active"
              style={{ color: "#C0C0C0", textDecoration: "none"}}
            >
              <RiAdminLine/>
            </NavLink>
            {pathname === "/admin" || pathname === "/status" ? (
              <NavLink
                className={isActive("/status")}
                to="/status"
                activeClassName="active"
                style={{ color: "#C0C0C0", textDecoration: "none"}}
              >
                <GrStatusUnknown/>
              </NavLink>
            ) : null}
            <NavLink
              className={isActive("/about")}
              to="/about"
              activeClassName="active"
              style={{ color: "#C0C0C0", textDecoration: "none"}}
            >
              <RiMapPinLine/>
            </NavLink>
          </nav>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Header;
