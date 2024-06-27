require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require("body-parser");

// Basic Configuration
const port = process.env.PORT || 3000;
app.use(cors());
app.use('/',bodyParser.urlencoded({extended:false}));
app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});
// Your first API endpoint

function isValidURL(string) {
  const regex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
  return regex.test(string);
}
const urlStore = new Map();
let currentId = 1;

app.post('/api/shorturl',function(req,res){
  if(isValidURL(req.body.url)){
    if (urlStore.has(req.body.url)) {
      res.json({original_url :req.body.url ,short_url: urlStore.get(url) })
    }
    else{
      const uniqueNumber = currentId++;
      urlStore.set(req.body.url, uniqueNumber);
      res.json({original_url :req.body.url ,short_url: uniqueNumber })
    }
    
  }
   else{
    res.json({ error: 'invalid url' });
   }
});

app.get('/api/shorturl/:number', (req, res) => {
    const uniqueNumber = parseInt(req.params.number, 10);
    const url = [...urlStore].find(([key, value]) => value === uniqueNumber)?.[0];
    res.redirect(url);
});

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
