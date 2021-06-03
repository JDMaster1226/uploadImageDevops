const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
// intializations
const app = express();
const port = process.env.PORT || 5000;

const routers = require('./routers');

app.use(cors());
app.use('/', routers);

// starting the server
require('./server')(app, port);