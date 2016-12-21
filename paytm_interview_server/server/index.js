// Main starting point of the application
const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();
import api from './routes';
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');

// DB Setup
mongoose.connect('mongodb://localhost:paytm/paytm');

// App Setup
app.use(morgan('combined'));
app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());

app.use('/api', api);

// Server Setup
const port = process.env.PORT || 3000;
const server = http.createServer(app);
server.listen(port);
console.log('Server listening in port 3000');