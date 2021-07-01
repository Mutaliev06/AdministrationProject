const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
const router = require('./routers/index')

const app = express();
const { port, url } = require('./config/index')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(router)

async function start () {
  try {
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    app.listen(port, () => {
      console.log('Сервер и БД запущены...')
    })
  } catch (e) {
    console.log(e.message)
  }
}

start();