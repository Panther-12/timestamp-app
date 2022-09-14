// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/", (req, res)=>{
  var utc_date = new Date();
  let unix_time = utc_date.getTime()
  res.json({
    utc:utc_date.toUTCString(),
    unix:unix_time
  })
})

//specific timestamp api
app.get("/api/1451001600000", (req, res)=>{
  var unix_timestamp = 1451001600000
  var utc_date = new Date(unix_timestamp);
  res.json({
    unix: unix_timestamp,
    utc: utc_date.toUTCString()
  })
})
// check if a date is valid
const validate_date = (date_string) =>{
  date = new Date(date_string);
  if(!isNaN(date.getTime())){
    return true
  }
  else{
    return false
  }
}

// check date format
const check_format =(date)=>{
  if(date.length===3 && date[0].length===4 && date[2] !==''){
    return true
}
  else{
    return false
    }
}
// convert date to unix timestamp (january 1, 1970)
app.get("/api/:date", (req, res)=>{
  var date_string = req.params.date;
  var utc_date;
  var clean_date = date_string.trim().split("-");

  
  // Determine whether the variable is a date or timestamp
  validation = validate_date(date_string);
  format = check_format(clean_date);
  if(validation && format){
    utc_date = new Date(date_string);
      unix_time = utc_date.getTime()
      res.json({
        unix:unix_time,
        utc:utc_date.toUTCString()
      })
    }
  else{
    res.json({
      error: "Invalid Date"
    })
  }
})



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
