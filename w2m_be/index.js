const express = require('express')
const axios = require('axios')
const mongoose = require('mongoose');
const Router = require('./routes')
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express()
const port = 3001

app.use(cors());

app.use(express.json());
app.use(bodyParser.urlencoded({
    extended: true,
}));
  
// config for mongodb db
const db = require('./config/keys').mongoURI;
  
// setup mongoose connection 
mongoose.
  connect(
    db, 
    { 
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  )
  .then(() => console.log("MongoDB Atlas connected successfully!"))
  .catch(err => console.log(err));  

app.use('/api', Router);

app.get('/', (req, res) => {
    res.send('Hello World!');
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})