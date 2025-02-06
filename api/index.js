const express = require('express');
const path = require('path');
const app = express();
require('dotenv').config()

const port = process.env.PORT || 8080;

app.use(express.static(path.join(__dirname, 'dist/portfolio')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/portfolio/index.html'));
});

app.listen(port, () => {
  console.log(`Server is running.`);
  console.log(port);
});