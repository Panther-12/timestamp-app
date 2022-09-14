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

// convert timestamp to UTC time
//app.get("/api/:utc", (req, res)=>{
//  utc_date = new Date(req.params.utc);
//  res.json({
//    utc: utc_date.toUTCString()
//  })
//})

// convert date to unix timestamp (january 1, 1970)
app.get("/api/:date", (req, res)=>{
  var date_string = req.params.date;
  // Determine whether the variable is a date or timestamp
  const char1, char2 = '-', '/';
  if(date_string.includes(char) || date_string.includes(char)){
    
  }
  else{
    var utc_date = new Date(req.params.date);
    res.json({
      utc: utc_date.toUTCString()
    })
  }
  
  // Append the Z to get the recommended UTC Time
  if(!date_string ){
    var utc_date = Date.now("Z");
    console.log(utc_date);
  }
  else if(date_string === new Date(date_string).toString()){
    var utc_date = new Date(date_string+"Z");
  }
  else{
    res.json({
      error: "Invalid date"
    })
  }
  var unix_time = utc_date.getUnixTime();
  res.json({
    utc: utc_date,
    unix: unix_time
  })
})



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
