import React from "react";
import { Container } from "@material-ui/core";
import Home from "./Home";
import { Route, Switch } from "react-router-dom";
import Admin from "./Admin";
import About from "./About";
import NotFound from "../NotFound/NotFound";
import Status from "./Status";
import Comment from "./Comment";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  main: {
    margin: "0 auto"
  }
})

function Main(props) {
  const classes = useStyles();
  return (
    <div className={classes.main}>
      <Container className={classes.main}>
        <Switch>
          <Route exact path="/home">
            <Home />
          </Route>
          <Route path="/admin">
            <Admin />
          </Route>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/status">
            <Status />
          </Route>
          <Route path="/claim/:id/comment">
            <Comment />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </Container>
    </div>
  );
}

export default Main;
