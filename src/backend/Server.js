const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000; 

// import database connection
require('./db/config'); 
// import models
require('./models/User');
require('./models/Product');

// import API files
const registerAPI = require('./api/registerAPI');
const productAPi = require('./api/productAPI');

app.use(cors());
app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded()); // to support URL-encoded bodies
app.use('', registerAPI);
app.use('/product', productAPi);

// This displays message that the server running and listening to specified port
app.listen(port, () => console.log(`Listening on port ${port}`));