// require packages, dependencies and libraries
const fs = require('fs');
const path = require('path');
const logger = require('morgan');
const express = require('express');
const dotenv = require('dotenv');
const createError = require('http-errors');
const cookieParser = require('cookie-parser');
const swaggerUi = require('swagger-ui-express');

let indexRouter = require('./routes/index');

let app = express();

// configuration environment variable
dotenv.config();
process.env.MAIN_PATH = path.resolve(__dirname);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/v1', indexRouter);

// Read Swagger JSON file
const swaggerFilePath = path.join(__dirname, './documentation/api.json');
const swaggerDocument = JSON.parse(fs.readFileSync(swaggerFilePath, 'utf8'));

// Serve Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
