const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const path = require('path');
var passport = require('passport')
const auth = require('./routes/user')
const appartements=require('./routes/appartement')
const admin=require('./routes/admin')
const owner=require('./routes/owner')
const syndic=require('./routes/syndic')
//connecting to database
mongoose.connect('mongodb://localhost:27017/charbabou', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('Connected successfully to MongoDB !'))
  .catch(() => console.log('Connection failed to MongoDB !'));

app.use(bodyParser.json());

// CORS Middleware
app.use(cors());
app.use(express.static(path.join(__dirname, '/')));
app.use(passport.initialize());
// app.use(passport.session());
require('./config/passport')(passport);
//app.use(passport.session());
require('./config/passport')(passport)
app.use('/api/auth',auth)
app.use('/api/appartement',appartements)
app.use('/api/admin',admin)
app.use('/api/owner',owner)
app.use('/api/syndic',syndic)

module.exports = app;