const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const router = require("./routers/index");
const morgan = require("morgan");

const app = express();
const { port, url } = require("./config/index");
const path = require('path');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.use(express.static(path.resolve(__dirname, "client", "build")));

app.use(router);

app.get('*', (req, res) => {
  res.send(path.resolve(__dirname, "client", "build", "index.html"))
})

async function start() {
  try {
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    app.listen(port, () => {
      console.log("Сервер и БД запущены...");
    });
  } catch (e) {
    console.log(e.message);
  }
}

start();
