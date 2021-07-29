const express = require('express');
const app = express();
const morgan = require('morgan');
const path = require('path');
const PORT = process.env.PORT || 5000;

//Logging Middleware
app.use(morgan('dev'));

//Webscrape Api middleware
app.use('/webscrape', require('./api/webscrape'));

//Static-serving middleware
app.use(express.static(path.join(__dirname, '..', 'public')));

//Sending HTML in all cases
app.use('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

//Output logs upon start up
app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
