const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const path = require('path');

const DATABASE_URL = process.env.DATABASE_URL;
mongoose.connect(DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const app = express();
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', (req, res, next) => {
  res.render('index');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend server initialized at port: ${PORT}`));