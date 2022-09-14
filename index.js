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

// check if a date is valid
const validate_date = (date) =>{
  if(Object.prototype.toString.call(date)==="[object Date]"){
    if(!isNaN(date.getTime())){
      return true
    }
    else{
      return false
    }
  }
  else{
    return false
  }
}

// convert date to unix timestamp (january 1, 1970)
app.get("/api/:date", (req, res)=>{
  var date_string = req.params.date;
  var utc_date;
  
  // Determine whether the variable is a date or timestamp
  const char1 ='-';
  
  if(date_string.includes(char1)){
    validate_date(date_string);
    if(validate_date){
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
  }
  else{
    // get the timestamp in milliseconds by multiplying by 1000
    utc_date = new Date(parseInt(date_string));
    console.log(utc_date);
    res.json({
      utc: utc_date.toUTCString()
    })
  }
  
})



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
