const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const app = express();

const Report = require('./results');
console.log(Report);


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//app.use('/public', express.static(__dirname + '/public/build'));

//app.use(express.static(path.join(__dirname, './public/build')));
app.use(express.static(path.join(__dirname, 'public/build')))

app.post('/api/report', (req, res) => {
  const inputUrl = req.body.inputUrl;
  // Return them as json
  Report.retrieveReport(inputUrl).then((report) =>{
    console.log('4');
    console.log(report);
    res.send(report);
  }).catch((err) => {
    console.log(err);
  });

});


app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/public/build/index.html'));
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send('error');
});

const port = process.env.PORT || 4000;
app.listen(port);
