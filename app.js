require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const cors = require('cors');
const helmet = require('helmet');

const errorHandler = require('./middlewares/errorHandler');
console.log(errorHandler)
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { DATABASE } = require('./utils/database');

const { PORT = 3000, DB_URL = DATABASE } = process.env;

const app = express();

app.use(cors());

const limiter = require('./utils/rateLimiter');

app.use(helmet());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(requestLogger);

app.use(limiter);

app.use('/', require('./routes/index'));

app.use(errorLogger);

app.use(errors());

app.use(errorHandler);

app.listen(PORT);
