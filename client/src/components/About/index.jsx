import React from "react";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  about: {
    backgroundColor: "white",
    display: "flex",
    justifyContent: "space-between",
  },
  logo: {
    width: "800px",
  },
}));

function About(props) {
  const classes = useStyles();
  return (
    <div className={classes.aboutDiv}>
      <h3>Контактная информация:</h3>
      <div className={classes.about}>
        <div>
          <h4>Адрес:</h4>

          <p> г. Магас, пр. И.Зязикова, 2</p>
          <h4>Телефон:</h4>

          <p> (8734) 55-12-33</p>
          <h4>Факс:</h4>

          <p> (8734) 55-12-33</p>

          <h4>Электронная почта Городского Совета</h4>

          <p>gorsovet-magas@mail.ru</p>
        </div>
        <div>
          <img
            className={classes.logo}
            src="https://s0.rbk.ru/v6_top_pics/media/img/3/46/755944962144463.jpg"
            alt="Лого"
          />
        </div>
      </div>
    </div>
  );
}

export default About;
