import React from "react";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  navLink: {
    textDecoration: "none",
  },
  active: {
    fontSize: "30px",
    color: "white",
  },
  footer: {
    marginTop: "200px",
    color: "#fff",
    backgroundColor: "#3f51b5"
  },
  footerDiv: {
    margin: "auto",
    width: "1000px",
    minHeight: "30px",
    textAlign: 'center'
  },
  h3: {
    padding: "20px"
  }
});

function Footer(props) {
  const classes = useStyles();

  return (
    <div className={classes.footer}>
      <div className={classes.footerDiv}>
        <h3 className={classes.h3}>
          © 2014 - 2021 Муниципальное образование "Городской округ город Магас"
          Республики Ингушетия
        </h3>
      </div>
    </div>
  );
}

export default Footer;
